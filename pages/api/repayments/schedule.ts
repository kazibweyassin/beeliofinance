import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { loanId, status } = req.query;

    // Build where clause
    const where: any = {
      borrowerId: session.user.id,
    };

    if (loanId && typeof loanId === 'string') {
      where.loanId = loanId;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const repayments = await prisma.repayment.findMany({
      where,
      include: {
        loan: {
          select: {
            id: true,
            amount: true,
            interestRate: true,
            duration: true,
            purpose: true,
            status: true,
          }
        }
      },
      orderBy: { dueDate: 'asc' },
    });

    // Calculate summary statistics
    const totalRepayments = repayments.length;
    const paidRepayments = repayments.filter(r => r.status === 'PAID').length;
    const pendingRepayments = repayments.filter(r => r.status === 'PENDING').length;
    const overdueRepayments = repayments.filter(r => r.status === 'OVERDUE').length;
    const totalAmount = repayments.reduce((sum, r) => sum + r.amount, 0);
    const paidAmount = repayments.filter(r => r.status === 'PAID').reduce((sum, r) => sum + r.amount, 0);
    const pendingAmount = repayments.filter(r => r.status === 'PENDING').reduce((sum, r) => sum + r.amount, 0);

    res.status(200).json({
      success: true,
      repayments: repayments.map(repayment => ({
        id: repayment.id,
        amount: repayment.amount,
        dueDate: repayment.dueDate,
        paidDate: repayment.paidDate,
        status: repayment.status,
        lateFee: repayment.lateFee,
        loan: repayment.loan,
      })),
      summary: {
        totalRepayments,
        paidRepayments,
        pendingRepayments,
        overdueRepayments,
        totalAmount,
        paidAmount,
        pendingAmount,
        completionRate: totalRepayments > 0 ? (paidRepayments / totalRepayments) * 100 : 0,
      }
    });

  } catch (error) {
    console.error('Error fetching repayment schedule:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
