import { PrismaClient } from '@prisma/client';
import { calculateRiskScore, RiskFactors } from './risk-scoring';

const prisma = new PrismaClient();

export interface LenderPreferences {
  userId: string;
  riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH';
  minInterestRate: number;
  maxLoanAmount: number;
  minLoanAmount: number;
  preferredDuration: number[];
  preferredCountries: string[];
  investmentAmount: number;
}

export interface LoanMatch {
  loanId: string;
  borrowerId: string;
  amount: number;
  interestRate: number;
  duration: number;
  purpose: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number;
  matchScore: number; // 0-100, higher is better match
  borrowerProfile: {
    name: string;
    country: string;
    creditScore: number;
    monthlyIncome: number;
    employmentStatus: string;
  };
  fundingProgress: number;
  timeRemaining: number; // days
}

export async function findLoanMatches(lenderId: string, limit: number = 10): Promise<LoanMatch[]> {
  // Get lender preferences
  const lender = await prisma.user.findUnique({
    where: { id: lenderId },
    select: {
      riskTolerance: true,
      investmentAmount: true,
      country: true,
    }
  });

  if (!lender || !lender.riskTolerance) {
    return [];
  }

  // Get available loans with enhanced filtering
  const loans = await prisma.loan.findMany({
    where: {
      isApproved: true,
      status: 'PENDING',
      // Exclude loans where lender has already invested
      NOT: {
        investments: {
          some: {
            investorId: lenderId,
          }
        }
      }
    },
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
        }
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 100, // Get more loans to filter from
  });

  // Calculate match scores for each loan
  const matches: LoanMatch[] = [];

  for (const loan of loans) {
    const riskFactors: RiskFactors = {
      creditScore: loan.borrower.creditScore || 500,
      monthlyIncome: loan.borrower.monthlyIncome || 0,
      employmentStatus: loan.borrower.employmentStatus || 'unemployed',
      loanAmount: loan.amount,
      loanDuration: loan.duration,
      country: loan.borrower.country || 'UG',
      existingLoans: 0, // Simplified for MVP
      repaymentHistory: 100, // Simplified for MVP
    };

    const riskAssessment = calculateRiskScore(riskFactors);
    
    // Calculate funding progress
    const totalInvested = loan.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const fundingProgress = (totalInvested / loan.amount) * 100;

    // Skip if loan is fully funded
    if (fundingProgress >= 100) continue;

    // Calculate match score with enhanced algorithm
    let matchScore = 0;

    // Risk tolerance match (35% weight)
    const riskToleranceScore = calculateRiskToleranceScore(lender.riskTolerance, riskAssessment.riskLevel);
    matchScore += riskToleranceScore * 0.35;

    // Interest rate match (25% weight)
    const interestRateScore = calculateInterestRateScore(riskAssessment.interestRate);
    matchScore += interestRateScore * 0.25;

    // Loan amount match (20% weight)
    const loanAmountScore = calculateLoanAmountScore(loan.amount, lender.investmentAmount || 100000);
    matchScore += loanAmountScore * 0.20;

    // Duration match (10% weight)
    const durationScore = calculateDurationScore(loan.duration);
    matchScore += durationScore * 0.10;

    // Country preference (5% weight)
    const countryScore = calculateCountryScore(
      loan.borrower.country || 'UG', 
      lender.country || 'UG'
    );
    matchScore += countryScore * 0.05;

    // Funding urgency bonus (5% weight)
    const urgencyScore = calculateUrgencyScore(fundingProgress, loan.createdAt);
    matchScore += urgencyScore * 0.05;

    // Only include loans with decent match scores
    if (matchScore >= 25) {
      matches.push({
        loanId: loan.id,
        borrowerId: loan.borrowerId,
        amount: loan.amount,
        interestRate: riskAssessment.interestRate,
        duration: loan.duration,
        purpose: loan.purpose,
        riskLevel: riskAssessment.riskLevel,
        riskScore: riskAssessment.riskScore,
        matchScore: Math.round(matchScore),
        borrowerProfile: {
          name: loan.borrower.name || 'Anonymous',
          country: loan.borrower.country || 'UG',
          creditScore: loan.borrower.creditScore || 500,
          monthlyIncome: loan.borrower.monthlyIncome || 0,
          employmentStatus: loan.borrower.employmentStatus || 'unemployed',
        },
        fundingProgress: Math.round(fundingProgress),
        timeRemaining: Math.max(0, 30 - Math.floor((Date.now() - loan.createdAt.getTime()) / (1000 * 60 * 60 * 24))),
      });
    }
  }

  // Sort by match score and return top matches
  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

function calculateRiskToleranceScore(lenderTolerance: string, loanRiskLevel: string): number {
  const toleranceMap: { [key: string]: number } = {
    'LOW': 1,
    'MEDIUM': 2,
    'HIGH': 3,
  };

  const lenderScore = toleranceMap[lenderTolerance] || 2;
  const loanScore = toleranceMap[loanRiskLevel] || 2;

  // Perfect match gets 100, adjacent gets 70, opposite gets 30
  if (lenderScore === loanScore) return 100;
  if (Math.abs(lenderScore - loanScore) === 1) return 70;
  return 30;
}

function calculateInterestRateScore(interestRate: number): number {
  // Higher interest rates get higher scores (up to a point)
  if (interestRate >= 20) return 100;
  if (interestRate >= 15) return 80;
  if (interestRate >= 12) return 60;
  if (interestRate >= 10) return 40;
  return 20;
}

function calculateLoanAmountScore(loanAmount: number, lenderAmount: number): number {
  // Prefer loans where lender can fund a significant portion
  const ratio = Math.min(loanAmount, lenderAmount) / Math.max(loanAmount, lenderAmount);
  return Math.round(ratio * 100);
}

function calculateDurationScore(duration: number): number {
  // Prefer medium-term loans (6-18 months)
  if (duration >= 6 && duration <= 18) return 100;
  if (duration >= 3 && duration <= 24) return 80;
  if (duration >= 1 && duration <= 36) return 60;
  return 40;
}

function calculateCountryScore(borrowerCountry: string, lenderCountry: string): number {
  // Same country gets higher score
  if (borrowerCountry === lenderCountry) return 100;
  
  // Same region gets medium score
  const regions: { [key: string]: string[] } = {
    'EAST_AFRICA': ['UG', 'KE', 'TZ'],
    'WEST_AFRICA': ['NG', 'GH', 'SN'],
  };

  for (const region of Object.values(regions)) {
    if (region.includes(borrowerCountry) && region.includes(lenderCountry)) {
      return 70;
    }
  }

  return 50; // Different regions
}

function calculateUrgencyScore(fundingProgress: number, createdAt: Date): number {
  const daysSinceCreated = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  
  // Higher urgency for loans that are:
  // 1. Close to being fully funded (80%+)
  // 2. Recently created (within 7 days)
  // 3. Have been waiting for a while (14+ days)
  
  let urgencyScore = 0;
  
  // Funding progress urgency
  if (fundingProgress >= 80) {
    urgencyScore += 50; // High urgency - almost funded
  } else if (fundingProgress >= 50) {
    urgencyScore += 30; // Medium urgency
  } else if (fundingProgress >= 20) {
    urgencyScore += 15; // Low urgency
  }
  
  // Time-based urgency
  if (daysSinceCreated <= 3) {
    urgencyScore += 30; // New loans get priority
  } else if (daysSinceCreated >= 14) {
    urgencyScore += 25; // Old loans need attention
  } else if (daysSinceCreated >= 7) {
    urgencyScore += 15; // Medium age
  }
  
  return Math.min(urgencyScore, 100);
}

export async function getDiversificationRecommendations(lenderId: string): Promise<{
  currentPortfolio: any[];
  recommendations: string[];
  riskDistribution: { [key: string]: number };
}> {
  // Get current investments
  const investments = await prisma.investment.findMany({
    where: { investorId: lenderId },
    include: {
      loan: {
        include: {
          borrower: {
            select: {
              country: true,
              creditScore: true,
            }
          }
        }
      }
    }
  });

  // Calculate current portfolio metrics
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const riskDistribution: { [key: string]: number } = {};
  const countryDistribution: { [key: string]: number } = {};

  for (const investment of investments) {
    const riskLevel = (investment.loan.borrower.creditScore || 0) >= 700 ? 'LOW' : 
                     (investment.loan.borrower.creditScore || 0) >= 600 ? 'MEDIUM' : 'HIGH';
    
    riskDistribution[riskLevel] = (riskDistribution[riskLevel] || 0) + investment.amount;
    countryDistribution[investment.loan.borrower.country || 'UG'] = 
      (countryDistribution[investment.loan.borrower.country || 'UG'] || 0) + investment.amount;
  }

  // Generate recommendations
  const recommendations: string[] = [];

  if (riskDistribution['HIGH'] && riskDistribution['HIGH'] / totalInvested > 0.5) {
    recommendations.push('Consider diversifying into lower-risk loans to balance your portfolio');
  }

  if (riskDistribution['LOW'] && riskDistribution['LOW'] / totalInvested > 0.8) {
    recommendations.push('You might consider some medium-risk loans for higher returns');
  }

  const countryCount = Object.keys(countryDistribution).length;
  if (countryCount < 2) {
    recommendations.push('Consider investing across different countries to reduce geographic risk');
  }

  if (investments.length < 5) {
    recommendations.push('Diversify across more loans to reduce concentration risk');
  }

  return {
    currentPortfolio: investments.map(inv => ({
      loanId: inv.loanId,
      amount: inv.amount,
      riskLevel: (inv.loan.borrower.creditScore || 0) >= 700 ? 'LOW' : 
                (inv.loan.borrower.creditScore || 0) >= 600 ? 'MEDIUM' : 'HIGH',
      country: inv.loan.borrower.country || 'UG',
    })),
    recommendations,
    riskDistribution,
  };
}
