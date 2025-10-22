import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn, getSession } from 'next-auth/react';
import { ThemeProvider } from '../components/ThemeProvider';
import AuthProvider from '../components/SessionProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import Icon from '../components/Icon';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signupSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  phone: yup.string().required('Phone number is required'),
  country: yup.string().required('Country is required'),
  role: yup.string().oneOf(['BORROWER', 'LENDER']).required('Please select your role'),
  // Borrower fields
  monthlyIncome: yup.number().when('role', {
    is: 'BORROWER',
    then: (schema) => schema.required('Monthly income is required for borrowers'),
    otherwise: (schema) => schema.optional()
  }),
  employmentStatus: yup.string().when('role', {
    is: 'BORROWER',
    then: (schema) => schema.required('Employment status is required for borrowers'),
    otherwise: (schema) => schema.optional()
  }),
  creditScore: yup.number().when('role', {
    is: 'BORROWER',
    then: (schema) => schema.min(300).max(850).required('Credit score is required for borrowers'),
    otherwise: (schema) => schema.optional()
  }),
  // Lender fields
  investmentAmount: yup.number().when('role', {
    is: 'LENDER',
    then: (schema) => schema.min(100).required('Investment amount is required for lenders'),
    otherwise: (schema) => schema.optional()
  }),
  riskTolerance: yup.string().when('role', {
    is: 'LENDER',
    then: (schema) => schema.required('Risk tolerance is required for lenders'),
    otherwise: (schema) => schema.optional()
  }),
  investmentGoals: yup.string().when('role', {
    is: 'LENDER',
    then: (schema) => schema.required('Investment goals are required for lenders'),
    otherwise: (schema) => schema.optional()
  }),
});

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const loginForm = useForm({
    resolver: yupResolver(loginSchema)
  });

  const signupForm = useForm({
    resolver: yupResolver(signupSchema)
  });

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const onLoginSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      const { confirmPassword, ...signupData } = data;
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (result.success) {
        // Auto-login after successful registration
        const loginResult = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (loginResult?.error) {
          setError('Account created but login failed. Please try logging in.');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(result.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'Login' : 'Sign Up'} - Beelio</title>
        <meta name="description" content="Access your Beelio account or create a new one" />
      </Head>

      <div className="min-h-screen bg-indigo-900 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="max-w-md w-full space-y-8 relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/logo.png" 
                alt="Beelio Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-white">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-white/80">
              {isLogin ? "Sign in to your account to continue" : "Join thousands of Africans building wealth through P2P lending"}
            </p>
          </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div 
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex">
                  <Icon name="alertCircle" size={20} className="text-red-500 mr-2" />
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Auth Form */}
          <motion.div 
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Toggle Buttons */}
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg transition-colors duration-200 ${
                  isLogin
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg transition-colors duration-200 ${
                  !isLogin
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {isLogin && (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    {...loginForm.register('email')}
                    type="email"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                      loginForm.formState.errors.email
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }`}
                    placeholder="Enter your email"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...loginForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                        loginForm.formState.errors.password
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} />
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            )}

            {/* Signup Form */}
            {!isLogin && (
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      {...signupForm.register('firstName')}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                        signupForm.formState.errors.firstName
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      }`}
                      placeholder="First name"
                    />
                    {signupForm.formState.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      {...signupForm.register('lastName')}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                        signupForm.formState.errors.lastName
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      }`}
                      placeholder="Last name"
                    />
                    {signupForm.formState.errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    {...signupForm.register('email')}
                    type="email"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                      signupForm.formState.errors.email
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }`}
                    placeholder="Enter your email"
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...signupForm.register('phone')}
                    type="tel"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                      signupForm.formState.errors.phone
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }`}
                    placeholder="+254 123 456 789"
                  />
                  {signupForm.formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {signupForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <select
                    {...signupForm.register('country')}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                      signupForm.formState.errors.country
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }`}
                  >
                    <option value="">Select your country</option>
                    <option value="kenya">Kenya</option>
                    <option value="uganda">Uganda</option>
                    <option value="nigeria">Nigeria</option>
                  </select>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    I want to
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      signupForm.watch('role') === 'BORROWER'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                    }`}>
                      <input
                        {...signupForm.register('role')}
                        type="radio"
                        value="BORROWER"
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <Icon name="dollar" size={20} className="text-primary-600" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Borrow Money</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Get loans for your needs</div>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      signupForm.watch('role') === 'LENDER'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                    }`}>
                      <input
                        {...signupForm.register('role')}
                        type="radio"
                        value="LENDER"
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <Icon name="trending" size={20} className="text-primary-600" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Invest Money</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Earn returns on investments</div>
                        </div>
                      </div>
                    </label>
                  </div>
                  {signupForm.formState.errors.role && (
                    <p className="text-red-500 text-sm mt-1">
                      {signupForm.formState.errors.role.message}
                    </p>
                  )}
                </div>

                {/* Role-specific fields */}
                {signupForm.watch('role') === 'BORROWER' && (
                  <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Borrower Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Monthly Income (USD)
                      </label>
                      <input
                        {...signupForm.register('monthlyIncome')}
                        type="number"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                          signupForm.formState.errors.monthlyIncome
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                        placeholder="e.g., 500"
                      />
                      {signupForm.formState.errors.monthlyIncome && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupForm.formState.errors.monthlyIncome.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Employment Status
                      </label>
                      <select
                        {...signupForm.register('employmentStatus')}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                          signupForm.formState.errors.employmentStatus
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                      >
                        <option value="">Select employment status</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="student">Student</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                      {signupForm.formState.errors.employmentStatus && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupForm.formState.errors.employmentStatus.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Credit Score (300-850)
                      </label>
                      <input
                        {...signupForm.register('creditScore')}
                        type="number"
                        min="300"
                        max="850"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                          signupForm.formState.errors.creditScore
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                        placeholder="e.g., 650"
                      />
                      {signupForm.formState.errors.creditScore && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupForm.formState.errors.creditScore.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {signupForm.watch('role') === 'LENDER' && (
                  <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Investor Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Investment Amount (USD)
                      </label>
                      <input
                        {...signupForm.register('investmentAmount')}
                        type="number"
                        min="100"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                          signupForm.formState.errors.investmentAmount
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                        placeholder="e.g., 1000"
                      />
                      {signupForm.formState.errors.investmentAmount && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupForm.formState.errors.investmentAmount.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Risk Tolerance
                      </label>
                      <select
                        {...signupForm.register('riskTolerance')}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                          signupForm.formState.errors.riskTolerance
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                      >
                        <option value="">Select risk tolerance</option>
                        <option value="conservative">Conservative (Low risk, stable returns)</option>
                        <option value="moderate">Moderate (Balanced risk and returns)</option>
                        <option value="aggressive">Aggressive (High risk, high returns)</option>
                      </select>
                      {signupForm.formState.errors.riskTolerance && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupForm.formState.errors.riskTolerance.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Investment Goals
                      </label>
                      <textarea
                        {...signupForm.register('investmentGoals')}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                          signupForm.formState.errors.investmentGoals
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                        placeholder="Describe your investment goals..."
                      />
                      {signupForm.formState.errors.investmentGoals && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupForm.formState.errors.investmentGoals.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...signupForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                        signupForm.formState.errors.password
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} />
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    {...signupForm.register('confirmPassword')}
                    type="password"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                      signupForm.formState.errors.confirmPassword
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {signupForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Icon name="google" size={20} className="mr-2" />
                  Google
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Icon name="facebook" size={20} className="mr-2" />
                  Facebook
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

const AuthPage = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <AuthForm />
        </ErrorBoundary>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AuthPage;
