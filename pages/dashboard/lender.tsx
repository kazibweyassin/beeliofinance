import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SessionProvider } from 'next-auth/react';
import StatCard from '../../components/dashboard/StatCard';
import LoanCard from '../../components/dashboard/LoanCard';
import InvestmentCard from '../../components/dashboard/InvestmentCard';
import PaymentModal from '../../components/dashboard/PaymentModal';
import TransactionHistory from '../../components/dashboard/TransactionHistory';
import { formatCurrency } from '../../lib/helpers';

interface LenderDashboardProps {}

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  duration: number;
  purpose: string;
  status: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number;
  fundedAmount: number;
  fundingProgress: number;
  isFullyFunded: boolean;
  investorCount: number;
  borrower: {
    name: string;
    country: string;
    creditScore: number;
    monthlyIncome: number;
    employmentStatus: string;
  };
  createdAt: string;
}

interface Investment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  expectedReturn: number;
  actualReturn: number;
  returnRate: number;
  loan: {
    id: string;
    amount: number;
    interestRate: number;
    duration: number;
    purpose: string;
    status: string;
    borrower: {
      name: string;
      country: string;
      creditScore: number;
    };
    repayments: Array<{
      amount: number;
      paidDate: string;
    }>;
  };
}

interface Stats {
  totalInvestments: number;
  activeInvestments: number;
  totalInvested: number;
  totalReturns: number;
  averageReturn: number;
  portfolioValue: number;
}

const LenderDashboard: React.FC<LenderDashboardProps> = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'marketplace' | 'investments' | 'transactions'>('overview');
  const [loans, setLoans] = useState<Loan[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalInvestments: 0,
    activeInvestments: 0,
    totalInvested: 0,
    totalReturns: 0,
    averageReturn: 0,
    portfolioValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState(0);

  // Filters
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    minAmount: '',
    maxAmount: '',
    duration: 'all',
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
      const [loansRes, investmentsRes, transactionsRes] = await Promise.all([
        axios.get('/api/loans/list'),
        axios.get('/api/investments/list'),
        axios.get('/api/notifications/list'),
      ]);

      setLoans(loansRes.data.loans || []);
      setInvestments(investmentsRes.data.investments || []);
      setTransactions(transactionsRes.data.notifications || []);

      // Calculate stats
      const totalInvestments = investmentsRes.data.investments?.length || 0;
      const activeInvestments = investmentsRes.data.investments?.filter((inv: Investment) => inv.status === 'ACTIVE').length || 0;
      const totalInvested = investmentsRes.data.investments?.reduce((sum: number, inv: Investment) => sum + inv.amount, 0) || 0;
      const totalReturns = investmentsRes.data.investments?.reduce((sum: number, inv: Investment) => sum + inv.actualReturn, 0) || 0;
      const averageReturn = totalInvestments > 0 ? (totalReturns / totalInvested) * 100 : 0;
      const portfolioValue = totalInvested + totalReturns;

      setStats({
        totalInvestments,
        activeInvestments,
        totalInvested,
        totalReturns,
        averageReturn,
        portfolioValue,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
      setSelectedLoan(loan);
      setInvestmentAmount(Math.min(loan.amount - loan.fundedAmount, 100000)); // Default to max available or 100k
      setShowInvestmentModal(true);
    }
  };

  const handleInvestmentSubmit = async (paymentData: any) => {
    if (!selectedLoan) return;
    
    try {
      await axios.post('/api/investments/create', {
        loanId: selectedLoan.id,
        amount: investmentAmount,
      });
      setShowInvestmentModal(false);
      setSelectedLoan(null);
      fetchDashboardData();
    } catch (error) {
      console.error('Error creating investment:', error);
    }
  };

  const filteredLoans = loans.filter(loan => {
    if (filters.riskLevel !== 'all' && loan.riskLevel !== filters.riskLevel) return false;
    if (filters.minAmount && loan.amount < Number(filters.minAmount)) return false;
    if (filters.maxAmount && loan.amount > Number(filters.maxAmount)) return false;
    if (filters.duration !== 'all') {
      const duration = Number(filters.duration);
      if (loan.duration < duration || loan.duration > duration + 5) return false;
    }
    return true;
  });

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
            Discover investment opportunities and manage your portfolio
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Browse Loans
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
            title="Total Investments"
            value={stats.totalInvestments}
            icon="trending-up"
            color="blue"
          />
          <StatCard
            title="Active Investments"
            value={stats.activeInvestments}
            icon="activity"
            color="green"
          />
          <StatCard
            title="Total Invested"
            value={formatCurrency(stats.totalInvested)}
            icon="dollar-sign"
            color="purple"
          />
          <StatCard
            title="Average Return"
            value={`${stats.averageReturn.toFixed(1)}%`}
            icon="percent"
            color="yellow"
          />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: 'home' },
                { id: 'marketplace', label: 'Marketplace', icon: 'search' },
                { id: 'investments', label: 'My Investments', icon: 'trending-up' },
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
              {/* Portfolio Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Portfolio Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(stats.portfolioValue)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(stats.totalReturns)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Returns</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.averageReturn.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average Return</p>
                  </div>
                </div>
              </div>

              {/* Recent Investments */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Investments
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {investments.slice(0, 4).map((investment) => (
                    <InvestmentCard
                      key={investment.id}
                      investment={investment}
                      onViewDetails={(id) => console.log('View investment:', id)}
                      onViewLoan={(id) => console.log('View loan:', id)}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Loans */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Featured Loan Opportunities
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {loans.filter(loan => !loan.isFullyFunded).slice(0, 4).map((loan) => (
                    <LoanCard
                      key={loan.id}
                      loan={loan}
                      userRole="LENDER"
                      onViewDetails={(id) => console.log('View details:', id)}
                      onInvest={handleInvest}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Filter Loans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Risk Level
                    </label>
                    <select
                      value={filters.riskLevel}
                      onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Risk Levels</option>
                      <option value="LOW">Low Risk</option>
                      <option value="MEDIUM">Medium Risk</option>
                      <option value="HIGH">High Risk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Min amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Max amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration
                    </label>
                    <select
                      value={filters.duration}
                      onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Durations</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Available Loans */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Available Loans ({filteredLoans.length})
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredLoans.map((loan) => (
                    <LoanCard
                      key={loan.id}
                      loan={loan}
                      userRole="LENDER"
                      onViewDetails={(id) => console.log('View details:', id)}
                      onInvest={handleInvest}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'investments' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                My Investments ({investments.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {investments.map((investment) => (
                  <InvestmentCard
                    key={investment.id}
                    investment={investment}
                    onViewDetails={(id) => console.log('View investment:', id)}
                    onViewLoan={(id) => console.log('View loan:', id)}
                  />
                ))}
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

        {/* Investment Modal */}
        {showInvestmentModal && selectedLoan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Invest in Loan
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {selectedLoan.purpose}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {formatCurrency(selectedLoan.amount)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Interest:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedLoan.interestRate}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedLoan.duration} months
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Risk:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedLoan.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Investment Amount (UGX)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      min="1000"
                      max={selectedLoan.amount - selectedLoan.fundedAmount}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Maximum: {formatCurrency(selectedLoan.amount - selectedLoan.fundedAmount)}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Expected Returns
                    </h4>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p>Monthly return: {formatCurrency(investmentAmount * (selectedLoan.interestRate / 100 / 12))}</p>
                      <p>Total return: {formatCurrency(investmentAmount * (selectedLoan.interestRate / 100))}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setShowInvestmentModal(false);
                        setSelectedLoan(null);
                      }}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowInvestmentModal(false)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Invest {formatCurrency(investmentAmount)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function LenderDashboardWrapper() {
  return (
    <SessionProvider>
      <LenderDashboard />
    </SessionProvider>
  );
}
