import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RiskFactors {
  creditScore: number;
  monthlyIncome: number;
  employmentStatus: string;
  loanAmount: number;
  loanDuration: number;
  country: string;
  existingLoans: number;
  repaymentHistory: number; // Percentage of on-time payments
}

export interface RiskAssessment {
  riskScore: number; // 0-100, lower is better
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  interestRate: number;
  maxLoanAmount: number;
  recommendedDuration: number;
  factors: {
    creditScore: number;
    incomeRatio: number;
    employment: number;
    loanSize: number;
    duration: number;
    history: number;
  };
}

export function calculateRiskScore(factors: RiskFactors): RiskAssessment {
  const weights = {
    creditScore: 0.25,
    incomeRatio: 0.20,
    employment: 0.15,
    loanSize: 0.15,
    duration: 0.15,
    history: 0.10,
  };

  // Credit Score Factor (0-100)
  const creditScoreFactor = Math.max(0, Math.min(100, factors.creditScore));

  // Income Ratio Factor (0-100)
  const monthlyPayment = factors.loanAmount * 0.02; // Assume 2% monthly payment
  const incomeRatio = (monthlyPayment / factors.monthlyIncome) * 100;
  const incomeRatioFactor = Math.max(0, 100 - incomeRatio);

  // Employment Factor (0-100)
  const employmentFactors: { [key: string]: number } = {
    'employed': 100,
    'self-employed': 80,
    'freelancer': 70,
    'student': 30,
    'unemployed': 0,
  };
  const employmentFactor = employmentFactors[factors.employmentStatus] || 50;

  // Loan Size Factor (0-100)
  const loanSizeFactor = Math.max(0, 100 - (factors.loanAmount / 1000000) * 50); // Penalty for large loans

  // Duration Factor (0-100)
  const durationFactor = Math.max(0, 100 - (factors.loanDuration - 1) * 5); // Penalty for longer terms

  // Repayment History Factor (0-100)
  const historyFactor = factors.repaymentHistory;

  // Calculate weighted risk score
  const riskScore = 
    (creditScoreFactor * weights.creditScore) +
    (incomeRatioFactor * weights.incomeRatio) +
    (employmentFactor * weights.employment) +
    (loanSizeFactor * weights.loanSize) +
    (durationFactor * weights.duration) +
    (historyFactor * weights.history);

  // Determine risk level
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  if (riskScore >= 80) {
    riskLevel = 'LOW';
  } else if (riskScore >= 60) {
    riskLevel = 'MEDIUM';
  } else {
    riskLevel = 'HIGH';
  }

  // Calculate interest rate based on risk
  const baseRate = 12; // Base interest rate
  const riskAdjustment = (100 - riskScore) / 10; // Higher risk = higher rate
  const interestRate = Math.min(30, baseRate + riskAdjustment); // Cap at 30%

  // Calculate maximum recommended loan amount
  const maxLoanAmount = factors.monthlyIncome * 6; // 6 months of income max

  // Calculate recommended duration
  const recommendedDuration = Math.min(24, Math.max(3, Math.ceil(factors.loanAmount / (factors.monthlyIncome * 0.3))));

  return {
    riskScore: Math.round(riskScore),
    riskLevel,
    interestRate: Math.round(interestRate * 100) / 100,
    maxLoanAmount: Math.round(maxLoanAmount),
    recommendedDuration,
    factors: {
      creditScore: Math.round(creditScoreFactor),
      incomeRatio: Math.round(incomeRatioFactor),
      employment: Math.round(employmentFactor),
      loanSize: Math.round(loanSizeFactor),
      duration: Math.round(durationFactor),
      history: Math.round(historyFactor),
    }
  };
}

export async function getUserRiskProfile(userId: string): Promise<RiskFactors> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      creditScore: true,
      monthlyIncome: true,
      employmentStatus: true,
      country: true,
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Get user's loan history
  const loans = await prisma.loan.findMany({
    where: { borrowerId: userId },
    include: {
      repayments: true,
    }
  });

  const existingLoans = loans.filter(loan => loan.status === 'ACTIVE').length;
  
  // Calculate repayment history
  const totalRepayments = loans.reduce((sum, loan) => sum + loan.repayments.length, 0);
  const onTimeRepayments = loans.reduce((sum, loan) => 
    sum + loan.repayments.filter(rep => rep.status === 'PAID' && rep.paidDate <= rep.dueDate).length, 0
  );
  const repaymentHistory = totalRepayments > 0 ? (onTimeRepayments / totalRepayments) * 100 : 100;

  return {
    creditScore: user.creditScore || 500,
    monthlyIncome: user.monthlyIncome || 0,
    employmentStatus: user.employmentStatus || 'unemployed',
    loanAmount: 0, // Will be set when calculating for specific loan
    loanDuration: 0, // Will be set when calculating for specific loan
    country: user.country || 'UG',
    existingLoans,
    repaymentHistory,
  };
}

export function getRiskLevelColor(riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (riskLevel) {
    case 'LOW':
      return 'text-green-600 bg-green-100';
    case 'MEDIUM':
      return 'text-yellow-600 bg-yellow-100';
    case 'HIGH':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getRiskLevelDescription(riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (riskLevel) {
    case 'LOW':
      return 'Low risk borrower with excellent credit profile';
    case 'MEDIUM':
      return 'Medium risk borrower with acceptable credit profile';
    case 'HIGH':
      return 'High risk borrower requiring careful consideration';
    default:
      return 'Risk assessment pending';
  }
}
