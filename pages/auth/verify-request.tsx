import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../../components/ThemeProvider';
import Icon from '../../components/Icon';

export default function VerifyRequest() {
  return (
    <ThemeProvider>
      <Head>
        <title>Check Your Email - Beelio</title>
        <meta name="description" content="Check your email for a sign in link" />
      </Head>

      <div className="min-h-screen bg-indigo-900 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              <Icon name="Mail" size={32} className="text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Check Your Email
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've sent you a magic link to sign in. Click the link in your email to continue.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Tip:</strong> The link will expire in 24 hours. If you don't see the email, check your spam folder.
            </p>
          </div>

          <Link
            href="/auth"
            className="inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
          >
            ← Back to Sign In
          </Link>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}
