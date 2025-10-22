import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { formatCurrency, formatDate, getLoanStatusColor, getRiskLevelColor } from '../../lib/helpers';

interface LoanCardProps {
  loan: {
    id: string;
    amount: number;
    interestRate: number;
    duration: number;
    purpose: string;
    status: string;
    riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
    riskScore?: number;
    fundedAmount?: number;
    fundingProgress?: number;
    isFullyFunded?: boolean;
    investorCount?: number;
    borrower?: {
      name: string;
      country: string;
      creditScore: number;
      monthlyIncome: number;
      employmentStatus: string;
    };
    createdAt: string;
  };
  userRole: 'BORROWER' | 'LENDER';
  onViewDetails?: (loanId: string) => void;
  onInvest?: (loanId: string) => void;
  onMakeRepayment?: (loanId: string) => void;
}

const LoanCard: React.FC<LoanCardProps> = ({
  loan,
  userRole,
  onViewDetails,
  onInvest,
  onMakeRepayment,
}) => {
  const isBorrower = userRole === 'BORROWER';
  const isLender = userRole === 'LENDER';

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {loan.purpose}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isBorrower ? 'Your Loan Request' : `by ${loan.borrower?.name || 'Anonymous'}`}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLoanStatusColor(loan.status)}`}>
              {loan.status}
            </span>
            {loan.riskLevel && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(loan.riskLevel)}`}>
                {loan.riskLevel} RISK
              </span>
            )}
          </div>
        </div>

        {/* Loan Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(loan.amount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {loan.interestRate}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {loan.duration} months
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatDate(loan.createdAt)}
            </p>
          </div>
        </div>

        {/* Borrower Profile (for lenders) */}
        {isLender && loan.borrower && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Borrower Profile
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Country:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{loan.borrower.country}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Credit Score:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{loan.borrower.creditScore}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Monthly Income:</span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatCurrency(loan.borrower.monthlyIncome)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Employment:</span>
                <span className="ml-2 text-gray-900 dark:text-white capitalize">
                  {loan.borrower.employmentStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Funding Progress (for lenders) */}
        {isLender && loan.fundingProgress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Funding Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {loan.fundingProgress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(loan.fundingProgress, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{formatCurrency(loan.fundedAmount || 0)} funded</span>
              <span>{loan.investorCount || 0} investors</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(loan.id)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              View Details
            </button>
          )}
          
          {isLender && onInvest && !loan.isFullyFunded && loan.status === 'PENDING' && (
            <button
              onClick={() => onInvest(loan.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Invest Now
            </button>
          )}
          
          {isBorrower && onMakeRepayment && loan.status === 'ACTIVE' && (
            <button
              onClick={() => onMakeRepayment(loan.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Make Repayment
            </button>
          )}
        </div>

        {/* Status Indicators */}
        {loan.status === 'PENDING' && isBorrower && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center">
              <Icon name="clock" className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
              <span className="text-sm text-yellow-800 dark:text-yellow-200">
                Your loan is pending approval and funding
              </span>
            </div>
          </div>
        )}

        {loan.isFullyFunded && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <Icon name="check-circle" className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm text-green-800 dark:text-green-200">
                {isBorrower ? 'Loan fully funded and active!' : 'This loan is fully funded'}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LoanCard;
