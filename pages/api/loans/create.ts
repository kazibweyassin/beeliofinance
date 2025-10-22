import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createLoanSchema = z.object({
  amount: z.number().min(1000).max(10000000), // 1K to 10M
  duration: z.number().min(1).max(60), // 1 to 60 months
  purpose: z.string().min(10).max(500),
  description: z.string().optional(),
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
    const validatedData = createLoanSchema.parse(req.body);
    
    // Check if user is a borrower
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, creditScore: true }
    });

    if (!user || user.role !== 'BORROWER') {
      return res.status(403).json({ message: 'Only borrowers can request loans' });
    }

    // Calculate interest rate based on credit score and risk
    const baseRate = 12; // Base interest rate
    const creditScore = user.creditScore || 500;
    const riskAdjustment = Math.max(0, (750 - creditScore) / 10);
    const interestRate = baseRate + riskAdjustment;

    // Create loan request
    const loan = await prisma.loan.create({
      data: {
        borrowerId: session.user.id,
        amount: validatedData.amount,
        duration: validatedData.duration,
        purpose: validatedData.purpose,
        description: validatedData.description,
        interestRate: interestRate,
        riskScore: creditScore,
        status: 'PENDING',
      },
      include: {
        borrower: {
          select: {
            name: true,
            email: true,
            country: true,
          }
        }
      }
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: 'LOAN_REQUEST',
        amount: validatedData.amount,
        status: 'PENDING',
        description: `Loan request for ${validatedData.purpose}`,
        loanId: loan.id,
      }
    });

    // Create notification for admin
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'GENERAL',
        title: 'Loan Request Submitted',
        message: `Your loan request of ${validatedData.amount} UGX has been submitted for review.`,
      }
    });

    res.status(201).json({
      success: true,
      loan: {
        id: loan.id,
        amount: loan.amount,
        duration: loan.duration,
        interestRate: loan.interestRate,
        purpose: loan.purpose,
        status: loan.status,
        createdAt: loan.createdAt,
      }
    });

  } catch (error) {
    console.error('Error creating loan:', error);
    
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
