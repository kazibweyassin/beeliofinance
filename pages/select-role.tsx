import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../components/ThemeProvider';
import Icon from '../components/Icon';

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState<'BORROWER' | 'LENDER' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, update } = useSession();

  const handleRoleSelect = async () => {
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await response.json();

      if (data.success) {
        // Update session with new role
        await update();
        
        // Redirect based on role
        if (selectedRole === 'BORROWER') {
          router.push('/dashboard/borrower');
        } else {
          router.push('/dashboard/lender');
        }
      } else {
        setError(data.error || 'Failed to update role');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <Head>
        <title>Select Your Role - Beelio</title>
        <meta name="description" content="Choose your role on Beelio" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Beelio! 👋
            </h1>
            <p className="text-xl text-white/80">
              How would you like to use our platform?
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex">
                <Icon name="alertCircle" size={20} className="text-red-500 mr-2" />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Borrower Card */}
            <motion.div
              className={`bg-white dark:bg-gray-800 rounded-xl p-8 cursor-pointer transition-all duration-300 ${
                selectedRole === 'BORROWER'
                  ? 'ring-4 ring-indigo-500 shadow-2xl scale-105'
                  : 'hover:shadow-xl hover:scale-102'
              }`}
              onClick={() => setSelectedRole('BORROWER')}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <Icon name="User" size={28} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                {selectedRole === 'BORROWER' && (
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                I need a loan
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access quick loans from trusted lenders with competitive rates and flexible terms.
              </p>

              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fast approval (24-48 hours)</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Flexible repayment options</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Build your credit score</span>
                </div>
              </div>
            </motion.div>

            {/* Lender Card */}
            <motion.div
              className={`bg-white dark:bg-gray-800 rounded-xl p-8 cursor-pointer transition-all duration-300 ${
                selectedRole === 'LENDER'
                  ? 'ring-4 ring-green-500 shadow-2xl scale-105'
                  : 'hover:shadow-xl hover:scale-102'
              }`}
              onClick={() => setSelectedRole('LENDER')}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={28} className="text-green-600 dark:text-green-400" />
                </div>
                {selectedRole === 'LENDER' && (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                I want to invest
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Earn returns by funding loans and helping others achieve their financial goals.
              </p>

              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Attractive interest returns</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Diversify your portfolio</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Support your community</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleRoleSelect}
            disabled={!selectedRole || isLoading}
            className="w-full bg-white text-indigo-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            {isLoading ? 'Setting up your account...' : 'Continue'}
          </button>

          <p className="text-center text-white/60 text-sm mt-6">
            Don't worry, you can change this later in your account settings
          </p>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}
