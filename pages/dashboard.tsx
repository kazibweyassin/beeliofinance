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
    
    // Check if user has a role, if not redirect to role selection
    if (session && !session.user?.role) {
      router.push('/select-role');
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

  // Shouldn't reach here, but just in case
  return null;
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