import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const makeRepaymentSchema = z.object({
  repaymentId: z.string().min(1),
  amount: z.number().min(100),
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
    const validatedData = makeRepaymentSchema.parse(req.body);

    // Get repayment details
    const repayment = await prisma.repayment.findFirst({
      where: {
        id: validatedData.repaymentId,
        borrowerId: session.user.id,
        status: 'PENDING',
      },
      include: {
        loan: {
          select: {
            id: true,
            amount: true,
            interestRate: true,
            purpose: true,
          }
        }
      }
    });

    if (!repayment) {
      return res.status(404).json({ message: 'Repayment not found or already paid' });
    }

    // Check if payment amount matches (allow for small differences due to rounding)
    const amountDifference = Math.abs(validatedData.amount - repayment.amount);
    if (amountDifference > 1) {
      return res.status(400).json({ 
        message: `Payment amount must be ${repayment.amount}. You provided ${validatedData.amount}` 
      });
    }

    // Check if repayment is overdue
    const isOverdue = new Date() > repayment.dueDate;
    const lateFee = isOverdue ? repayment.amount * 0.05 : 0; // 5% late fee

    // Update repayment status
    const updatedRepayment = await prisma.repayment.update({
      where: { id: repayment.id },
      data: {
        status: 'PAID',
        paidDate: new Date(),
        lateFee: lateFee,
      }
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: 'REPAYMENT',
        amount: validatedData.amount + lateFee,
        status: 'COMPLETED',
        reference: validatedData.reference,
        description: `Repayment for loan: ${repayment.loan.purpose}`,
        loanId: repayment.loanId,
        repaymentId: repayment.id,
        metadata: {
          paymentMethod: validatedData.paymentMethod,
          lateFee: lateFee,
          isOverdue: isOverdue,
        }
      }
    });

    // Check if all repayments are completed
    const remainingRepayments = await prisma.repayment.count({
      where: {
        loanId: repayment.loanId,
        status: 'PENDING',
      }
    });

    // If all repayments are completed, update loan status
    if (remainingRepayments === 0) {
      await prisma.loan.update({
        where: { id: repayment.loanId },
        data: { status: 'COMPLETED' }
      });

      // Notify borrower
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: 'GENERAL',
          title: 'Loan Completed',
          message: `Congratulations! You have successfully completed all repayments for your loan of ${repayment.loan.amount} UGX.`,
        }
      });
    }

    // Create payment confirmation notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'PAYMENT_RECEIVED',
        title: 'Repayment Successful',
        message: `Your repayment of ${validatedData.amount} UGX has been processed successfully.${lateFee > 0 ? ` Late fee of ${lateFee} UGX was applied.` : ''}`,
      }
    });

    res.status(200).json({
      success: true,
      repayment: {
        id: updatedRepayment.id,
        amount: updatedRepayment.amount,
        paidDate: updatedRepayment.paidDate,
        status: updatedRepayment.status,
        lateFee: updatedRepayment.lateFee,
        loanCompleted: remainingRepayments === 0,
      }
    });

  } catch (error) {
    console.error('Error processing repayment:', error);
    
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
