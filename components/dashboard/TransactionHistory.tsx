import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { formatCurrency, formatDate, getRepaymentStatusColor } from '../../lib/helpers';

interface TransactionHistoryProps {
  transactions: Array<{
    id: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    description: string;
    createdAt: string;
    reference?: string;
    metadata?: any;
  }>;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  loading = false,
  onLoadMore,
  hasMore = false,
}) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'LOAN_REQUEST':
        return 'file-text';
      case 'INVESTMENT':
        return 'trending-up';
      case 'REPAYMENT':
        return 'credit-card';
      case 'REFUND':
        return 'rotate-ccw';
      case 'FEE':
        return 'dollar-sign';
      default:
        return 'activity';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'LOAN_REQUEST':
        return 'text-blue-600 bg-blue-100';
      case 'INVESTMENT':
        return 'text-green-600 bg-green-100';
      case 'REPAYMENT':
        return 'text-purple-600 bg-purple-100';
      case 'REFUND':
        return 'text-yellow-600 bg-yellow-100';
      case 'FEE':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-100';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'FAILED':
        return 'text-red-600 bg-red-100';
      case 'CANCELLED':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getAmountColor = (type: string, status: string) => {
    if (status === 'FAILED' || status === 'CANCELLED') {
      return 'text-gray-500';
    }
    
    switch (type) {
      case 'INVESTMENT':
        return 'text-red-600'; // Money going out
      case 'REPAYMENT':
        return 'text-red-600'; // Money going out
      case 'REFUND':
        return 'text-green-600'; // Money coming in
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transaction History
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="activity" className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {transactions.length} transactions
            </span>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="receipt" className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No transactions yet
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Your transaction history will appear here once you start using the platform.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                  <Icon name={getTransactionIcon(transaction.type)} className="w-5 h-5" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {transaction.description}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatDate(transaction.createdAt)}</span>
                      {transaction.reference && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{transaction.reference}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${getAmountColor(transaction.type, transaction.status)}`}>
                        {transaction.type === 'INVESTMENT' || transaction.type === 'REPAYMENT' ? '-' : '+'}
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Load More Button */}
            {hasMore && onLoadMore && (
              <div className="text-center pt-4">
                <button
                  onClick={onLoadMore}
                  disabled={loading}
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <Icon name="loader" className="w-4 h-4 mr-2 animate-spin inline" />
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
