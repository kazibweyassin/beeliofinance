import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLoans: 0,
    totalInvestments: 0,
    pendingKYC: 0,
    pendingLoans: 0,
    totalLoanAmount: 0,
    activeLoans: 0,
  });
  const [pendingLoans, setPendingLoans] = useState([]);
  const [pendingKYC, setPendingKYC] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth');
      return;
    }

    // Check if user is admin
    if (session.user?.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    fetchStats();
    fetchPendingLoans();
    fetchPendingKYC();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPendingLoans = async () => {
    try {
      const response = await fetch('/api/admin/pending-loans');
      const data = await response.json();
      setPendingLoans(data);
    } catch (error) {
      console.error('Error fetching pending loans:', error);
    }
  };

  const fetchPendingKYC = async () => {
    try {
      const response = await fetch('/api/admin/pending-kyc');
      const data = await response.json();
      setPendingKYC(data);
    } catch (error) {
      console.error('Error fetching pending KYC:', error);
    }
  };

  const handleApproveLoan = async (loanId: string, approved: boolean) => {
    try {
      const response = await fetch('/api/admin/approve-loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loanId,
          approved,
        }),
      });

      if (response.ok) {
        fetchPendingLoans();
        fetchStats();
      }
    } catch (error) {
      console.error('Error approving loan:', error);
    }
  };

  const handleVerifyKYC = async (documentId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch('/api/admin/verify-kyc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId,
          status,
        }),
      });

      if (response.ok) {
        fetchPendingKYC();
        fetchStats();
      }
    } catch (error) {
      console.error('Error verifying KYC:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Beelio</title>
        <meta name="description" content="Admin dashboard for managing Beelio platform" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage platform operations and user activities
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {session.user?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <Icon name="user" className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: 'chart' },
                { id: 'loans', label: 'Pending Loans', icon: 'dollar' },
                { id: 'kyc', label: 'KYC Verification', icon: 'shield' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon name={tab.icon} className="w-5 h-5 inline mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Users', value: stats.totalUsers, icon: 'users', color: 'blue' },
                  { label: 'Total Loans', value: stats.totalLoans, icon: 'dollar', color: 'green' },
                  { label: 'Total Investments', value: stats.totalInvestments, icon: 'trending', color: 'purple' },
                  { label: 'Pending KYC', value: stats.pendingKYC, icon: 'shield', color: 'orange' },
                  { label: 'Pending Loans', value: stats.pendingLoans, icon: 'clock', color: 'red' },
                  { label: 'Total Loan Amount', value: `UGX ${stats.totalLoanAmount?.toLocaleString()}`, icon: 'chart', color: 'indigo' },
                  { label: 'Active Loans', value: stats.activeLoans, icon: 'check', color: 'green' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                        <Icon name={stat.icon} className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Pending Loan Approvals
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {pendingLoans.map((loan: any) => (
                  <div key={loan.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {loan.borrower.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {loan.borrower.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              UGX {loan.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {loan.duration} months • {loan.interestRate}% APR
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {loan.purpose}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveLoan(loan.id, true)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproveLoan(loan.id, false)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Pending KYC Verification
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {pendingKYC.map((doc: any) => (
                  <div key={doc.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {doc.user.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {doc.user.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {doc.type.replace(/_/g, ' ')}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(doc.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleVerifyKYC(doc.id, 'APPROVED')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleVerifyKYC(doc.id, 'REJECTED')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
