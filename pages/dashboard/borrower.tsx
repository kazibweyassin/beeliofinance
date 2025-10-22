import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SessionProvider } from 'next-auth/react';
import StatCard from '../../components/dashboard/StatCard';
import LoanCard from '../../components/dashboard/LoanCard';
import PaymentModal from '../../components/dashboard/PaymentModal';
import TransactionHistory from '../../components/dashboard/TransactionHistory';
import { formatCurrency, calculateMonthlyPayment } from '../../lib/helpers';

interface BorrowerDashboardProps {}

interface LoanRequest {
  amount: number;
  duration: number;
  purpose: string;
  description?: string;
}

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  duration: number;
  purpose: string;
  status: string;
  fundedAmount: number;
  fundingProgress: number;
  isFullyFunded: boolean;
  createdAt: string;
}

interface Repayment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: string;
  lateFee: number;
}

interface Stats {
  totalLoans: number;
  activeLoans: number;
  totalBorrowed: number;
  totalRepaid: number;
  nextPayment: number;
  nextPaymentDate: string;
}

const BorrowerDashboard: React.FC<BorrowerDashboardProps> = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'repayments' | 'transactions'>('overview');
  const [loans, setLoans] = useState<Loan[]>([]);
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalLoans: 0,
    activeLoans: 0,
    totalBorrowed: 0,
    totalRepaid: 0,
    nextPayment: 0,
    nextPaymentDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [showLoanRequest, setShowLoanRequest] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  // Loan request form
  const [loanRequest, setLoanRequest] = useState<LoanRequest>({
    amount: 0,
    duration: 12,
    purpose: '',
    description: '',
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth');
      return;
    }
    fetchDashboardData();
  }, [session, status]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [loansRes, repaymentsRes, transactionsRes] = await Promise.all([
        axios.get('/api/loans/list'),
        axios.get('/api/repayments/schedule'),
        axios.get('/api/notifications/list'),
      ]);

      setLoans(loansRes.data.loans || []);
      setRepayments(repaymentsRes.data.repayments || []);
      setTransactions(transactionsRes.data.notifications || []);

      // Calculate stats
      const totalLoans = loansRes.data.loans?.length || 0;
      const activeLoans = loansRes.data.loans?.filter((loan: Loan) => loan.status === 'ACTIVE').length || 0;
      const totalBorrowed = loansRes.data.loans?.reduce((sum: number, loan: Loan) => sum + loan.amount, 0) || 0;
      const totalRepaid = repaymentsRes.data.repayments?.filter((rep: Repayment) => rep.status === 'PAID').reduce((sum: number, rep: Repayment) => sum + rep.amount, 0) || 0;
      
      const nextRepayment = repaymentsRes.data.repayments?.find((rep: Repayment) => rep.status === 'PENDING');
      const nextPayment = nextRepayment?.amount || 0;
      const nextPaymentDate = nextRepayment?.dueDate || '';

      setStats({
        totalLoans,
        activeLoans,
        totalBorrowed,
        totalRepaid,
        nextPayment,
        nextPaymentDate,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/loans/create', loanRequest);
      setShowLoanRequest(false);
      setLoanRequest({ amount: 0, duration: 12, purpose: '', description: '' });
      fetchDashboardData();
    } catch (error) {
      console.error('Error creating loan request:', error);
    }
  };

  const handleMakeRepayment = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
      setSelectedLoan(loan);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    try {
      // Find the next repayment for this loan
      const nextRepayment = repayments.find(rep => rep.status === 'PENDING');
      if (nextRepayment) {
        await axios.post('/api/repayments/make', {
          repaymentId: nextRepayment.id,
          amount: paymentData.amount,
          paymentMethod: paymentData.paymentMethod,
          reference: paymentData.reference,
        });
        setShowPaymentModal(false);
        setSelectedLoan(null);
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error making repayment:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your loans and track your borrowing activity
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLoanRequest(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Request New Loan
            </button>
            <button
              onClick={() => router.push('/kyc/verify')}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Complete KYC
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Loans"
            value={stats.totalLoans}
            icon="file-text"
            color="blue"
          />
          <StatCard
            title="Active Loans"
            value={stats.activeLoans}
            icon="activity"
            color="green"
          />
          <StatCard
            title="Total Borrowed"
            value={formatCurrency(stats.totalBorrowed)}
            icon="dollar-sign"
            color="purple"
          />
          <StatCard
            title="Next Payment"
            value={formatCurrency(stats.nextPayment)}
            subtitle={stats.nextPaymentDate ? `Due ${new Date(stats.nextPaymentDate).toLocaleDateString()}` : 'No pending payments'}
            icon="credit-card"
            color="yellow"
          />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: 'home' },
                { id: 'loans', label: 'My Loans', icon: 'file-text' },
                { id: 'repayments', label: 'Repayments', icon: 'credit-card' },
                { id: 'transactions', label: 'Transactions', icon: 'activity' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{tab.label}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Recent Loans */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Loans
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {loans.slice(0, 4).map((loan) => (
                    <LoanCard
                      key={loan.id}
                      loan={loan}
                      userRole="BORROWER"
                      onViewDetails={(id) => console.log('View details:', id)}
                      onMakeRepayment={handleMakeRepayment}
                    />
                  ))}
                </div>
              </div>

              {/* Upcoming Repayments */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Upcoming Repayments
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-6">
                    {repayments.filter(rep => rep.status === 'PENDING').length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No upcoming repayments</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {repayments.filter(rep => rep.status === 'PENDING').slice(0, 3).map((repayment) => (
                          <div key={repayment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {formatCurrency(repayment.amount)}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Due {new Date(repayment.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <button
                              onClick={() => handleMakeRepayment(repayment.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                              Pay Now
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                All Loans
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loans.map((loan) => (
                  <LoanCard
                    key={loan.id}
                    loan={loan}
                    userRole="BORROWER"
                    onViewDetails={(id) => console.log('View details:', id)}
                    onMakeRepayment={handleMakeRepayment}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'repayments' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Repayment Schedule
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  {repayments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No repayments scheduled</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {repayments.map((repayment) => (
                        <div key={repayment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              repayment.status === 'PAID' ? 'bg-green-500' :
                              repayment.status === 'OVERDUE' ? 'bg-red-500' :
                              'bg-yellow-500'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {formatCurrency(repayment.amount)}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Due {new Date(repayment.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              repayment.status === 'PAID' ? 'bg-green-100 text-green-800' :
                              repayment.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {repayment.status}
                            </span>
                            {repayment.status === 'PENDING' && (
                              <button
                                onClick={() => handleMakeRepayment(repayment.id)}
                                className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                              >
                                Pay
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transaction History
              </h2>
              <TransactionHistory
                transactions={transactions}
                loading={loading}
              />
            </div>
          )}
        </motion.div>

        {/* Loan Request Modal */}
        {showLoanRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Request New Loan
                </h2>
                <form onSubmit={handleLoanRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Loan Amount (UGX)
                    </label>
                    <input
                      type="number"
                      value={loanRequest.amount}
                      onChange={(e) => setLoanRequest({ ...loanRequest, amount: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter loan amount"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (months)
                    </label>
                    <select
                      value={loanRequest.duration}
                      onChange={(e) => setLoanRequest({ ...loanRequest, duration: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value={6}>6 months</option>
                      <option value={12}>12 months</option>
                      <option value={18}>18 months</option>
                      <option value={24}>24 months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Purpose
                    </label>
                    <input
                      type="text"
                      value={loanRequest.purpose}
                      onChange={(e) => setLoanRequest({ ...loanRequest, purpose: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="What will you use this loan for?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description (optional)
                    </label>
                    <textarea
                      value={loanRequest.description}
                      onChange={(e) => setLoanRequest({ ...loanRequest, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      rows={3}
                      placeholder="Provide additional details about your loan request"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowLoanRequest(false)}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedLoan && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedLoan(null);
            }}
            onSubmit={handlePaymentSubmit}
            title="Make Repayment"
            amount={stats.nextPayment}
            currency="UGX"
            purpose={`Repayment for loan: ${selectedLoan.purpose}`}
          />
        )}
      </div>
    </div>
  );
};

export default function BorrowerDashboardWrapper() {
  return (
    <SessionProvider>
      <BorrowerDashboard />
    </SessionProvider>
  );
}
