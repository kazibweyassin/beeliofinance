import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { calculateRiskScore, getUserRiskProfile } from '../../../lib/risk-scoring';
import { notifyLoanApproved, notifyInvestmentReceived } from '../../../lib/notifications';

const prisma = new PrismaClient();

const loanApprovalSchema = z.object({
  loanId: z.string().min(1),
  approved: z.boolean(),
  reason: z.string().optional(),
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

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true }
    });

    if (!user?.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Validate request body
    const validatedData = loanApprovalSchema.parse(req.body);

    // Get loan details
    const loan = await prisma.loan.findUnique({
      where: { id: validatedData.loanId },
      include: {
        borrower: {
          select: {
            id: true,
            name: true,
            email: true,
            creditScore: true,
            monthlyIncome: true,
            employmentStatus: true,
            country: true,
          }
        }
      }
    });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (loan.isApproved !== null) {
      return res.status(400).json({ message: 'Loan has already been processed' });
    }

    // Update loan status
    const updatedLoan = await prisma.loan.update({
      where: { id: validatedData.loanId },
      data: {
        isApproved: validatedData.approved,
        approvedAt: validatedData.approved ? new Date() : null,
        approvedBy: session.user.id,
      }
    });

    // Create notification for borrower
    await prisma.notification.create({
      data: {
        userId: loan.borrowerId,
        type: validatedData.approved ? 'LOAN_APPROVED' : 'LOAN_REJECTED',
        title: validatedData.approved ? 'Loan Approved!' : 'Loan Rejected',
        message: validatedData.approved 
          ? `Congratulations! Your loan request of ${loan.amount} UGX has been approved and is now available for funding.`
          : `Your loan request was rejected. ${validatedData.reason || 'Please contact support for more information.'}`,
        data: {
          loanId: loan.id,
          amount: loan.amount,
          reason: validatedData.reason,
        }
      }
    });

    // Send email notification
    if (validatedData.approved) {
      await notifyLoanApproved(loan.id);
    }

    // If approved, create repayment schedule
    if (validatedData.approved) {
      const monthlyPayment = loan.amount * (loan.interestRate / 100 / 12) * 
                           Math.pow(1 + (loan.interestRate / 100 / 12), loan.duration) / 
                           (Math.pow(1 + (loan.interestRate / 100 / 12), loan.duration) - 1);

      const repayments = [];
      for (let i = 0; i < loan.duration; i++) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + i + 1);
        
        repayments.push({
          loanId: loan.id,
          borrowerId: loan.borrowerId,
          amount: monthlyPayment,
          dueDate: dueDate,
          status: 'PENDING',
        });
      }

      await prisma.repayment.createMany({
        data: repayments
      });
    }

    res.status(200).json({
      success: true,
      loan: {
        id: updatedLoan.id,
        isApproved: updatedLoan.isApproved,
        approvedAt: updatedLoan.approvedAt,
        status: updatedLoan.status,
      }
    });

  } catch (error) {
    console.error('Error processing loan approval:', error);
    
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
