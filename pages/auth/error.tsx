import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../../components/ThemeProvider';
import Icon from '../../components/Icon';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = () => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link has expired or has already been used.';
      case 'OAuthSignin':
        return 'Error trying to sign in with OAuth provider.';
      case 'OAuthCallback':
        return 'Error in OAuth callback handler.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account.';
      case 'EmailCreateAccount':
        return 'Could not create email account.';
      case 'Callback':
        return 'Error in callback handler.';
      case 'OAuthAccountNotLinked':
        return 'This email is already associated with another account. Please sign in using your original method.';
      case 'EmailSignin':
        return 'The email could not be sent.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  return (
    <ThemeProvider>
      <Head>
        <title>Authentication Error - Beelio</title>
        <meta name="description" content="An error occurred during authentication" />
      </Head>

      <div className="min-h-screen bg-indigo-900 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <Icon name="alertCircle" size={32} className="text-red-600 dark:text-red-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Error
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {getErrorMessage()}
          </p>

          <div className="space-y-3">
            <Link
              href="/auth"
              className="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="block w-full text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}
