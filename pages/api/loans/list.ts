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
    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    // Get user's role to determine which loans to show
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role === 'BORROWER') {
      // Borrowers see their own loans
      where.borrowerId = session.user.id;
    } else if (user?.role === 'LENDER') {
      // Lenders see approved loans available for investment
      where.isApproved = true;
      where.status = 'PENDING'; // Only show loans that need funding
    }

    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where,
        include: {
          borrower: {
            select: {
              name: true,
              country: true,
              creditScore: true,
              monthlyIncome: true,
              employmentStatus: true,
            }
          },
          investments: {
            select: {
              amount: true,
              investorId: true,
            }
          },
          _count: {
            select: {
              investments: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.loan.count({ where })
    ]);

    // Calculate funding progress for each loan
    const loansWithProgress = loans.map(loan => {
      const totalInvested = loan.investments.reduce((sum, inv) => sum + inv.amount, 0);
      const fundingProgress = (totalInvested / loan.amount) * 100;
      
      return {
        ...loan,
        fundedAmount: totalInvested,
        fundingProgress: Math.min(fundingProgress, 100),
        isFullyFunded: totalInvested >= loan.amount,
        investorCount: loan._count.investments,
      };
    });

    res.status(200).json({
      success: true,
      loans: loansWithProgress,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      }
    });

  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
