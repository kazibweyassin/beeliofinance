import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthProvider from '../components/SessionProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import BorrowerDashboard from './dashboard/borrower';
import LenderDashboard from './dashboard/lender';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  if (session?.user?.role === 'BORROWER') {
    return <BorrowerDashboard />;
  } else if (session?.user?.role === 'LENDER') {
    return <LenderDashboard />;
  }

  // Default dashboard for users without a role
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Beelio!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Hello, {session?.user?.name}! Please complete your profile setup.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Complete Your Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                To get started, please complete your profile and choose your role on the platform.
              </p>
              <button
                onClick={() => router.push('/auth')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardWithProviders: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default DashboardWithProviders;