import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createInvestmentSchema = z.object({
  loanId: z.string().min(1),
  amount: z.number().min(1000).max(10000000), // 1K to 10M
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate request body
    const validatedData = createInvestmentSchema.parse(req.body);
    
    // Check if user is a lender
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (!user || user.role !== 'LENDER') {
      return res.status(403).json({ message: 'Only lenders can make investments' });
    }

    // Get loan details
    const loan = await prisma.loan.findUnique({
      where: { id: validatedData.loanId },
      include: {
        investments: true,
        borrower: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (!loan.isApproved) {
      return res.status(400).json({ message: 'Loan is not approved for investment' });
    }

    if (loan.status !== 'PENDING') {
      return res.status(400).json({ message: 'Loan is no longer accepting investments' });
    }

    // Check if loan is already fully funded
    const totalInvested = loan.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const remainingAmount = loan.amount - totalInvested;

    if (remainingAmount <= 0) {
      return res.status(400).json({ message: 'Loan is already fully funded' });
    }

    // Check if investment amount exceeds remaining amount
    if (validatedData.amount > remainingAmount) {
      return res.status(400).json({ 
        message: `Investment amount exceeds remaining loan amount. Maximum: ${remainingAmount}` 
      });
    }

    // Check if user has already invested in this loan
    const existingInvestment = await prisma.investment.findFirst({
      where: {
        investorId: session.user.id,
        loanId: validatedData.loanId,
      }
    });

    if (existingInvestment) {
      return res.status(400).json({ message: 'You have already invested in this loan' });
    }

    // Create investment
    const investment = await prisma.investment.create({
      data: {
        investorId: session.user.id,
        loanId: validatedData.loanId,
        amount: validatedData.amount,
        status: 'ACTIVE',
      },
      include: {
        loan: {
          select: {
            amount: true,
            interestRate: true,
            duration: true,
            purpose: true,
          }
        }
      }
    });

    // Update loan funded amount
    const newFundedAmount = totalInvested + validatedData.amount;
    const isFullyFunded = newFundedAmount >= loan.amount;

    await prisma.loan.update({
      where: { id: validatedData.loanId },
      data: {
        fundedAmount: newFundedAmount,
        status: isFullyFunded ? 'ACTIVE' : 'PENDING',
      }
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: 'INVESTMENT',
        amount: validatedData.amount,
        status: 'COMPLETED',
        description: `Investment in loan for ${loan.purpose}`,
        loanId: validatedData.loanId,
        investmentId: investment.id,
      }
    });

    // Create notifications
    await Promise.all([
      // Notify investor
      prisma.notification.create({
        data: {
          userId: session.user.id,
          type: 'INVESTMENT_RECEIVED',
          title: 'Investment Successful',
          message: `Your investment of ${validatedData.amount} UGX in the loan for ${loan.purpose} has been processed.`,
        }
      }),
      // Notify borrower
      prisma.notification.create({
        data: {
          userId: loan.borrowerId,
          type: 'INVESTMENT_RECEIVED',
          title: 'New Investment Received',
          message: `Your loan has received a new investment of ${validatedData.amount} UGX.`,
        }
      })
    ]);

    // If loan is fully funded, create repayment schedule
    if (isFullyFunded) {
      const monthlyPayment = loan.amount * (loan.interestRate / 100 / 12) * 
                           Math.pow(1 + (loan.interestRate / 100 / 12), loan.duration) / 
                           (Math.pow(1 + (loan.interestRate / 100 / 12), loan.duration) - 1);

      const repayments = [];
      for (let i = 0; i < loan.duration; i++) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + i + 1);
        
        repayments.push({
          loanId: validatedData.loanId,
          borrowerId: loan.borrowerId,
          amount: monthlyPayment,
          dueDate: dueDate,
          status: 'PENDING' as const,
        });
      }

      await prisma.repayment.createMany({
        data: repayments
      });

      // Notify borrower that loan is fully funded
      await prisma.notification.create({
        data: {
          userId: loan.borrowerId,
          type: 'LOAN_APPROVED',
          title: 'Loan Fully Funded',
          message: `Congratulations! Your loan of ${loan.amount} UGX has been fully funded and is now active.`,
        }
      });
    }

    res.status(201).json({
      success: true,
      investment: {
        id: investment.id,
        amount: investment.amount,
        status: investment.status,
        createdAt: investment.createdAt,
        loan: investment.loan,
      },
      loanFullyFunded: isFullyFunded,
    });

  } catch (error) {
    console.error('Error creating investment:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
