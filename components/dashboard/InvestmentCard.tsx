import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { formatCurrency, formatDate, getInvestmentStatusColor } from '../../lib/helpers';

interface InvestmentCardProps {
  investment: {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
    expectedReturn?: number;
    actualReturn?: number;
    returnRate?: number;
    loan: {
      id: string;
      amount: number;
      interestRate: number;
      duration: number;
      purpose: string;
      status: string;
      borrower: {
        name: string;
        country: string;
        creditScore: number;
      };
      repayments: Array<{
        amount: number;
        paidDate: string;
      }>;
    };
  };
  onViewDetails?: (investmentId: string) => void;
  onViewLoan?: (loanId: string) => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  investment,
  onViewDetails,
  onViewLoan,
}) => {
  const totalRepayments = investment.loan.repayments.reduce((sum, rep) => sum + rep.amount, 0);
  const repaymentProgress = (totalRepayments / investment.loan.amount) * 100;

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
              {investment.loan.purpose}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Investment in loan by {investment.loan.borrower.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInvestmentStatusColor(investment.status)}`}>
              {investment.status}
            </span>
          </div>
        </div>

        {/* Investment Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Investment Amount</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(investment.amount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {investment.loan.interestRate}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Expected Return</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(investment.expectedReturn || 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Actual Return</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(investment.actualReturn || 0)}
            </p>
          </div>
        </div>

        {/* Return Rate */}
        {investment.returnRate !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Return Rate</span>
              <span className={`text-sm font-medium ${
                investment.returnRate >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate.toFixed(2)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  investment.returnRate >= 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(Math.abs(investment.returnRate), 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Loan Details */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Loan Details
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Loan Amount:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formatCurrency(investment.loan.amount)}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Duration:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {investment.loan.duration} months
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Borrower:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {investment.loan.borrower.name}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Credit Score:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {investment.loan.borrower.creditScore}
              </span>
            </div>
          </div>
        </div>

        {/* Repayment Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Repayment Progress</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {repaymentProgress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(repaymentProgress, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{formatCurrency(totalRepayments)} repaid</span>
            <span>{investment.loan.repayments.length} payments</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(investment.id)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              View Investment
            </button>
          )}
          
          {onViewLoan && (
            <button
              onClick={() => onViewLoan(investment.loan.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              View Loan
            </button>
          )}
        </div>

        {/* Status Indicators */}
        {investment.status === 'ACTIVE' && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <Icon name="trending-up" className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm text-green-800 dark:text-green-200">
                Investment is active and earning returns
              </span>
            </div>
          </div>
        )}

        {investment.status === 'COMPLETED' && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center">
              <Icon name="check-circle" className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm text-blue-800 dark:text-blue-200">
                Investment completed successfully
              </span>
            </div>
          </div>
        )}

        {investment.status === 'DEFAULTED' && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <Icon name="alert-circle" className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
              <span className="text-sm text-red-800 dark:text-red-200">
                Loan has defaulted - contact support
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InvestmentCard;
