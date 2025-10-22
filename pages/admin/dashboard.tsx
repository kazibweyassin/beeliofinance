import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';
import ErrorBoundary from '../../components/ErrorBoundary';

interface AdminStats {
  totalUsers: number;
  totalLoans: number;
  totalInvestments: number;
  pendingKYCs: number;
  pendingLoans: number;
  totalVolume: number;
  activeLoans: number;
  completedLoans: number;
}

interface PendingLoan {
  id: string;
  amount: number;
  purpose: string;
  duration: number;
  borrower: {
    name: string;
    email: string;
    country: string;
    creditScore: number;
    monthlyIncome: number;
    employmentStatus: string;
  };
  createdAt: string;
  riskScore: number;
}

interface PendingKYC {
  id: string;
  userId: string;
  type: string;
  fileName: string;
  status: string;
  uploadedAt: string;
  user: {
    name: string;
    email: string;
    country: string;
  };
}

const AdminDashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingLoans, setPendingLoans] = useState<PendingLoan[]>([]);
  const [pendingKYCs, setPendingKYCs] = useState<PendingKYC[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'kyc' | 'users'>('overview');

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

    fetchAdminData();
  }, [session, status, router]);

  const fetchAdminData = async () => {
    try {
      const [statsRes, loansRes, kycRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/pending-loans'),
        fetch('/api/admin/pending-kyc'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (loansRes.ok) {
        const loansData = await loansRes.json();
        setPendingLoans(loansData.loans);
      }

      if (kycRes.ok) {
        const kycData = await kycRes.json();
        setPendingKYCs(kycData.documents);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanApproval = async (loanId: string, approved: boolean, reason?: string) => {
    try {
      const response = await fetch('/api/admin/approve-loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loanId, approved, reason }),
      });

      if (response.ok) {
        await fetchAdminData(); // Refresh data
      }
    } catch (error) {
      console.error('Error approving loan:', error);
    }
  };

  const handleKYCApproval = async (kycId: string, approved: boolean, reason?: string) => {
    try {
      const response = await fetch('/api/admin/verify-kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kycId, approved, reason }),
      });

      if (response.ok) {
        await fetchAdminData(); // Refresh data
      }
    } catch (error) {
      console.error('Error verifying KYC:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage loans, KYC verification, and platform operations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {session.user?.name || 'Admin'}
                </p>
              </div>
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <Icon name="shield" className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: 'bar-chart' },
              { id: 'loans', label: 'Pending Loans', icon: 'file-text' },
              { id: 'kyc', label: 'KYC Verification', icon: 'user-check' },
              { id: 'users', label: 'User Management', icon: 'users' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewTab stats={stats} />
        )}
        
        {activeTab === 'loans' && (
          <PendingLoansTab 
            loans={pendingLoans} 
            onLoanApproval={handleLoanApproval}
          />
        )}
        
        {activeTab === 'kyc' && (
          <PendingKYCTab 
            documents={pendingKYCs} 
            onKYCApproval={handleKYCApproval}
          />
        )}
        
        {activeTab === 'users' && (
          <UserManagementTab />
        )}
      </div>
    </div>
  );
};

const OverviewTab: React.FC<{ stats: AdminStats | null }> = ({ stats }) => {
  if (!stats) {
    return <div className="text-center py-8">Loading statistics...</div>;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: 'users',
      color: 'blue',
      change: '+12%',
    },
    {
      title: 'Total Loans',
      value: stats.totalLoans.toLocaleString(),
      icon: 'file-text',
      color: 'green',
      change: '+8%',
    },
    {
      title: 'Total Volume',
      value: `${stats.totalVolume.toLocaleString()} UGX`,
      icon: 'dollar-sign',
      color: 'purple',
      change: '+15%',
    },
    {
      title: 'Pending KYC',
      value: stats.pendingKYCs.toLocaleString(),
      icon: 'user-check',
      color: 'orange',
      change: '-5%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
            <Icon name="file-text" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-900 dark:text-blue-100 font-medium">Review Pending Loans</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
            <Icon name="user-check" className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-900 dark:text-green-100 font-medium">Verify KYC Documents</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
            <Icon name="bar-chart" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-900 dark:text-purple-100 font-medium">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PendingLoansTab: React.FC<{ 
  loans: PendingLoan[]; 
  onLoanApproval: (loanId: string, approved: boolean, reason?: string) => void;
}> = ({ loans, onLoanApproval }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Pending Loan Approvals ({loans.length})
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Borrower
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Loan Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {loan.borrower.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {loan.borrower.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {loan.borrower.country} • {loan.borrower.employmentStatus}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {loan.amount.toLocaleString()} UGX
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {loan.purpose}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {loan.duration} months
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        loan.riskScore >= 80 ? 'bg-green-500' :
                        loan.riskScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {loan.riskScore}/100
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onLoanApproval(loan.id, true)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onLoanApproval(loan.id, false, 'Risk assessment failed')}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PendingKYCTab: React.FC<{ 
  documents: PendingKYC[]; 
  onKYCApproval: (kycId: string, approved: boolean, reason?: string) => void;
}> = ({ documents, onKYCApproval }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Pending KYC Verification ({documents.length})
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.user.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.user.country}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {doc.type.replace(/_/g, ' ')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.fileName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onKYCApproval(doc.id, true)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onKYCApproval(doc.id, false, 'Document quality insufficient')}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UserManagementTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          User Management
        </h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Export Users
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-gray-600 dark:text-gray-400">
          User management features coming soon. This will include user search, 
          account management, and activity monitoring.
        </p>
      </div>
    </div>
  );
};

const AdminDashboardWithProviders: React.FC = () => {
  return (
    <ErrorBoundary>
      <AdminDashboard />
    </ErrorBoundary>
  );
};

export default AdminDashboardWithProviders;
