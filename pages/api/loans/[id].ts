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

    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Loan ID is required' });
    }

    const loan = await prisma.loan.findUnique({
      where: { id },
      include: {
        borrower: {
          select: {
            name: true,
            email: true,
            country: true,
            creditScore: true,
            monthlyIncome: true,
            employmentStatus: true,
            createdAt: true,
          }
        },
        investments: {
          include: {
            investor: {
              select: {
                name: true,
                country: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        repayments: {
          orderBy: { dueDate: 'asc' }
        },
        _count: {
          select: {
            investments: true,
          }
        }
      }
    });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Check if user has permission to view this loan
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, isAdmin: true }
    });

    const canView = user?.isAdmin || 
                   loan.borrowerId === session.user.id || 
                   loan.investments.some(inv => inv.investorId === session.user.id);

    if (!canView) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Calculate funding progress
    const totalInvested = loan.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const fundingProgress = (totalInvested / loan.amount) * 100;

    // Calculate repayment schedule if loan is active
    let repaymentSchedule = [];
    if (loan.status === 'ACTIVE') {
      const monthlyPayment = loan.amount * (loan.interestRate / 100 / 12) * 
                           Math.pow(1 + (loan.interestRate / 100 / 12), loan.duration) / 
                           (Math.pow(1 + (loan.interestRate / 100 / 12), loan.duration) - 1);
      
      for (let i = 0; i < loan.duration; i++) {
        const dueDate = new Date(loan.approvedAt || loan.createdAt);
        dueDate.setMonth(dueDate.getMonth() + i + 1);
        
        repaymentSchedule.push({
          month: i + 1,
          amount: monthlyPayment,
          dueDate: dueDate,
          status: loan.repayments[i]?.status || 'PENDING',
          paidDate: loan.repayments[i]?.paidDate,
        });
      }
    }

    res.status(200).json({
      success: true,
      loan: {
        ...loan,
        fundedAmount: totalInvested,
        fundingProgress: Math.min(fundingProgress, 100),
        isFullyFunded: totalInvested >= loan.amount,
        investorCount: loan._count.investments,
        repaymentSchedule,
      }
    });

  } catch (error) {
    console.error('Error fetching loan details:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
