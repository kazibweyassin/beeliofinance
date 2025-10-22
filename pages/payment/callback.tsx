import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';

const PaymentCallback: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const { payment } = router.query;
    
    if (payment === 'success') {
      setStatus('success');
      setMessage('Payment completed successfully!');
    } else if (payment === 'failed') {
      setStatus('failed');
      setMessage('Payment could not be processed. Please try again.');
    } else if (payment === 'error') {
      setStatus('error');
      setMessage('An error occurred during payment processing.');
    } else {
      // Default loading state
      setTimeout(() => {
        setStatus('success');
        setMessage('Payment completed successfully!');
      }, 2000);
    }
  }, [router.query]);

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return 'check-circle';
      case 'failed':
        return 'x-circle';
      case 'error':
        return 'alert-circle';
      default:
        return 'loader';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'error':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'failed':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'error':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <motion.div
        className="max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`${getBackgroundColor()} rounded-xl p-8 text-center border-2 ${
          status === 'success' ? 'border-green-200 dark:border-green-800' :
          status === 'failed' ? 'border-red-200 dark:border-red-800' :
          status === 'error' ? 'border-yellow-200 dark:border-yellow-800' :
          'border-blue-200 dark:border-blue-800'
        }`}>
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Icon
              name={getStatusIcon()}
              className={`w-16 h-16 mx-auto ${getStatusColor()} ${
                status === 'loading' ? 'animate-spin' : ''
              }`}
            />
          </motion.div>

          <motion.h1
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {status === 'success' && 'Payment Successful!'}
            {status === 'failed' && 'Payment Failed'}
            {status === 'error' && 'Payment Error'}
            {status === 'loading' && 'Processing Payment...'}
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {message}
          </motion.p>

          {status === 'success' && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  What's Next?
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Your payment has been processed</li>
                  <li>• You'll receive a confirmation email</li>
                  <li>• Your account will be updated shortly</li>
                </ul>
              </div>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Possible Reasons
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Insufficient funds</li>
                  <li>• Network connection issues</li>
                  <li>• Invalid payment details</li>
                  <li>• Payment method not supported</li>
                </ul>
              </div>
            </motion.div>
          )}

          <motion.div
            className="mt-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              Go to Dashboard
            </button>
            
            {(status === 'failed' || status === 'error') && (
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            )}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@beelio.com" className="text-blue-600 hover:text-blue-700">
              support@beelio.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentCallback;
