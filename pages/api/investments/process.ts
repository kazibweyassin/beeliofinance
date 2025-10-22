import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { notifyInvestmentReceived } from '../../../lib/notifications';

const prisma = new PrismaClient();

const processInvestmentSchema = z.object({
  investmentId: z.string().min(1),
  amount: z.number().min(1000),
  paymentMethod: z.enum(['MPESA', 'AIRTEL_MONEY', 'BANK_TRANSFER']),
  reference: z.string().optional(),
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
    const validatedData = processInvestmentSchema.parse(req.body);

    // Get investment details
    const investment = await prisma.investment.findUnique({
      where: { id: validatedData.investmentId },
      include: {
        loan: {
          include: {
            borrower: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        },
        investor: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    if (investment.status !== 'ACTIVE') {
      return res.status(400).json({ message: 'Investment is not active' });
    }

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        userId: investment.investorId,
        type: 'INVESTMENT',
        amount: validatedData.amount,
        status: 'COMPLETED',
        reference: validatedData.reference,
        description: `Investment in loan: ${investment.loan.purpose}`,
        loanId: investment.loanId,
        investmentId: investment.id,
        metadata: {
          paymentMethod: validatedData.paymentMethod,
          processedAt: new Date().toISOString(),
        }
      }
    });

    // Update loan funded amount
    const updatedLoan = await prisma.loan.update({
      where: { id: investment.loanId },
      data: {
        fundedAmount: {
          increment: validatedData.amount,
        }
      }
    });

    // Check if loan is fully funded
    const isFullyFunded = updatedLoan.fundedAmount >= updatedLoan.amount;

    if (isFullyFunded) {
      // Update loan status to active
      await prisma.loan.update({
        where: { id: investment.loanId },
        data: { status: 'ACTIVE' }
      });

      // Notify borrower that loan is fully funded
      await prisma.notification.create({
        data: {
          userId: investment.loan.borrowerId,
          type: 'LOAN_APPROVED',
          title: 'Loan Fully Funded!',
          message: `🎉 Congratulations! Your loan of ${updatedLoan.amount} UGX has been fully funded and is now active.`,
        }
      });

      // Send email notification
      await notifyInvestmentReceived(investment.loanId, validatedData.amount);
    } else {
      // Notify borrower about new investment
      await prisma.notification.create({
        data: {
          userId: investment.loan.borrowerId,
          type: 'INVESTMENT_RECEIVED',
          title: 'New Investment Received',
          message: `Your loan has received a new investment of ${validatedData.amount.toLocaleString()} UGX.`,
        }
      });
    }

    // Notify investor
    await prisma.notification.create({
      data: {
        userId: investment.investorId,
        type: 'INVESTMENT_RECEIVED',
        title: 'Investment Successful',
        message: `Your investment of ${validatedData.amount.toLocaleString()} UGX in the loan for ${investment.loan.purpose} has been processed.`,
      }
    });

    res.status(200).json({
      success: true,
      investment: {
        id: investment.id,
        amount: validatedData.amount,
        status: 'COMPLETED',
        transactionId: transaction.id,
        loanFullyFunded: isFullyFunded,
      }
    });

  } catch (error) {
    console.error('Error processing investment:', error);
    
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
