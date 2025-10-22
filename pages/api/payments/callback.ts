import { NextApiRequest, NextApiResponse } from 'next';
import { flutterwaveService } from '../../../lib/payments/flutterwave';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { tx_ref, status, transaction_id } = req.query;

    if (!tx_ref || typeof tx_ref !== 'string') {
      return res.status(400).json({ message: 'Transaction reference is required' });
    }

    // Verify payment with Flutterwave
    const verificationResponse = await flutterwaveService.verifyPayment(tx_ref);

    if (verificationResponse.status === 'success' && verificationResponse.data.status === 'successful') {
      // Update transaction status in database
      const transaction = await prisma.transaction.findFirst({
        where: { reference: tx_ref },
        include: { user: true }
      });

      if (transaction) {
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'COMPLETED',
            metadata: {
              ...transaction.metadata as any,
              verifiedAt: new Date().toISOString(),
              flutterwaveRef: verificationResponse.data.flw_ref,
              paymentMethod: verificationResponse.data.payment_type,
            }
          }
        });

        // Create success notification
        await prisma.notification.create({
          data: {
            userId: transaction.userId,
            type: 'PAYMENT_RECEIVED',
            title: 'Payment Successful',
            message: `Your payment of ${transaction.amount} ${transaction.currency} has been processed successfully.`,
          }
        });
      }
    } else {
      // Payment failed
      const transaction = await prisma.transaction.findFirst({
        where: { reference: tx_ref }
      });

      if (transaction) {
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
            userId: transaction.userId,
            type: 'GENERAL',
            title: 'Payment Failed',
            message: `Your payment of ${transaction.amount} ${transaction.currency} could not be processed. Please try again.`,
          }
        });
      }
    }

    // Redirect to appropriate page based on payment status
    const redirectUrl = verificationResponse.data.status === 'successful' 
      ? `${process.env.NEXTAUTH_URL}/dashboard?payment=success`
      : `${process.env.NEXTAUTH_URL}/dashboard?payment=failed`;

    res.redirect(redirectUrl);

  } catch (error) {
    console.error('Error processing payment callback:', error);
    
    // Redirect to error page
    res.redirect(`${process.env.NEXTAUTH_URL}/dashboard?payment=error`);
  } finally {
    await prisma.$disconnect();
  }
}
