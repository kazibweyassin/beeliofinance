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

    const { status, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {
      investorId: session.user.id,
    };
    
    if (status && status !== 'all') {
      where.status = status;
    }

    const [investments, total] = await Promise.all([
      prisma.investment.findMany({
        where,
        include: {
          loan: {
            include: {
              borrower: {
                select: {
                  name: true,
                  country: true,
                  creditScore: true,
                }
              },
              repayments: {
                where: { status: 'PAID' },
                select: { amount: true, paidDate: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.investment.count({ where })
    ]);

    // Calculate returns for each investment
    const investmentsWithReturns = investments.map(investment => {
      const totalRepayments = investment.loan.repayments.reduce((sum, rep) => sum + rep.amount, 0);
      const expectedReturn = investment.amount * (1 + investment.loan.interestRate / 100);
      const actualReturn = totalRepayments * (investment.amount / investment.loan.amount);
      const returnRate = ((actualReturn - investment.amount) / investment.amount) * 100;

      return {
        ...investment,
        expectedReturn,
        actualReturn,
        returnRate,
        totalRepayments,
      };
    });

    res.status(200).json({
      success: true,
      investments: investmentsWithReturns,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      }
    });

  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
