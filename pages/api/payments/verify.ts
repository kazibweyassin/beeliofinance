import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const verifyPaymentSchema = z.object({
  txRef: z.string().min(1),
  transactionId: z.string().min(1),
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
    const validatedData = verifyPaymentSchema.parse(req.body);

    // Get transaction from database
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: validatedData.transactionId,
        userId: session.user.id,
        reference: validatedData.txRef,
      }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // In sandbox mode, simulate payment verification
    // In production, you would call Flutterwave verification API here
    const isPaymentSuccessful = Math.random() > 0.1; // 90% success rate for demo

    if (isPaymentSuccessful) {
      // Update transaction status
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'COMPLETED',
          metadata: {
            ...transaction.metadata as any,
            verifiedAt: new Date().toISOString(),
            paymentMethod: 'flutterwave',
          }
        }
      });

      // Create success notification
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: 'PAYMENT_RECEIVED',
          title: 'Payment Successful',
          message: `Your payment of ${transaction.amount} ${transaction.currency} has been processed successfully.`,
        }
      });

      res.status(200).json({
        success: true,
        payment: {
          transactionId: transaction.id,
          status: 'completed',
          amount: transaction.amount,
          currency: transaction.currency,
          verifiedAt: new Date().toISOString(),
        }
      });
    } else {
      // Update transaction status to failed
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'FAILED',
          metadata: {
            ...transaction.metadata as any,
            failedAt: new Date().toISOString(),
            failureReason: 'Payment verification failed',
          }
        }
      });

      // Create failure notification
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: 'GENERAL',
          title: 'Payment Failed',
          message: `Your payment of ${transaction.amount} ${transaction.currency} could not be processed. Please try again.`,
        }
      });

      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        payment: {
          transactionId: transaction.id,
          status: 'failed',
        }
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    
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
