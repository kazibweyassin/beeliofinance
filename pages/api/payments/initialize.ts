import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import axios from 'axios';

const prisma = new PrismaClient();

const initializePaymentSchema = z.object({
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
    const validatedData = initializePaymentSchema.parse(req.body);

    // Generate unique transaction reference
    const txRef = validatedData.reference || `beelio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create transaction record
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

    // Flutterwave payment initialization (sandbox mode)
    const flutterwaveData = {
      tx_ref: txRef,
      amount: validatedData.amount,
      currency: validatedData.currency,
      redirect_url: `${process.env.NEXTAUTH_URL}/payment/callback`,
      customer: {
        email: validatedData.email,
        phonenumber: validatedData.phone,
        name: session.user.name || 'User',
      },
      customizations: {
        title: 'Beelio Payment',
        description: validatedData.purpose,
        logo: `${process.env.NEXTAUTH_URL}/logo.png`,
      },
      meta: {
        transactionId: transaction.id,
        userId: session.user.id,
      }
    };

    // In sandbox mode, we'll simulate the payment response
    // In production, you would call Flutterwave API here
    const paymentResponse = {
      status: 'success',
      message: 'Payment initialized successfully',
      data: {
        link: `https://checkout.flutterwave.com/v3/hosted/pay/${txRef}`, // Simulated link
        tx_ref: txRef,
        status: 'pending',
      }
    };

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
  } finally {
    await prisma.$disconnect();
  }
}
