import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { z } from 'zod';
import { flutterwaveService } from '../../../lib/payments/flutterwave';

const paymentRequestSchema = z.object({
  amount: z.number().min(100).max(10000000),
  currency: z.enum(['UGX', 'KES', 'NGN']),
  email: z.string().email(),
  phone: z.string().min(10),
  purpose: z.string().min(1),
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
    const validatedData = paymentRequestSchema.parse(req.body);

    // Generate unique transaction reference
    const txRef = validatedData.reference || `beelio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create transaction record in database
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: 'INVESTMENT', // Default type, can be overridden
        amount: validatedData.amount,
        currency: validatedData.currency,
        status: 'PENDING',
        reference: txRef,
        description: validatedData.purpose,
        metadata: {
          email: validatedData.email,
          phone: validatedData.phone,
          purpose: validatedData.purpose,
        }
      }
    });

    // Initialize payment with Flutterwave
    const paymentData = {
      txRef,
      amount: validatedData.amount,
      currency: validatedData.currency,
      email: validatedData.email,
      phone: validatedData.phone,
      name: session.user.name || 'User',
      purpose: validatedData.purpose,
      redirectUrl: `${process.env.NEXTAUTH_URL}/payment/callback`,
      metadata: {
        transactionId: transaction.id,
        userId: session.user.id,
      }
    };

    const paymentResponse = await flutterwaveService.initializePayment(paymentData);

    await prisma.$disconnect();

    res.status(200).json({
      success: true,
      payment: {
        transactionId: transaction.id,
        txRef: txRef,
        amount: validatedData.amount,
        currency: validatedData.currency,
        checkoutUrl: paymentResponse.data.link,
        status: 'pending',
      }
    });

  } catch (error) {
    console.error('Error initializing payment:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}
