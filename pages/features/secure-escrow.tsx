import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';
import ThemeProvider from '../../components/ThemeProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

const SecureEscrowPage = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Head>
          <title>Secure Escrow System - Beelio</title>
          <meta name="description" content="Learn how Beelio's secure escrow system protects all transactions and ensures safe fund management." />
        </Head>

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container-max py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Beelio</span>
                </Link>
                <Link href="/" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700">
            <div className="container-max">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Icon name="shield" size={40} className="text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Secure Escrow System
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  All transactions are protected through our secure escrow system, ensuring funds are safely held 
                  until loan terms are met and both parties are satisfied.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Security Features */}
          <section className="py-16">
            <div className="container-max">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Bank-Level Security
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Your funds are protected with the same security standards used by major financial institutions.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "256-bit SSL Encryption",
                    description: "All data transmission is encrypted with industry-standard SSL technology.",
                    icon: "lock"
                  },
                  {
                    title: "Multi-Factor Authentication",
                    description: "Additional security layers protect your account from unauthorized access.",
                    icon: "key"
                  },
                  {
                    title: "Fraud Detection",
                    description: "Advanced AI monitors all transactions for suspicious activity patterns.",
                    icon: "eye"
                  },
                  {
                    title: "Regulatory Compliance",
                    description: "We comply with all African financial regulations and security standards.",
                    icon: "check-circle"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={feature.icon} size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How Escrow Works */}
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container-max">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  How Escrow Protects You
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our escrow system acts as a neutral third party, holding funds safely until all conditions are met.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Fund Deposit",
                    description: "Lender deposits funds into our secure escrow account. Funds are immediately protected and cannot be accessed by anyone.",
                    icon: "dollar-sign"
                  },
                  {
                    step: "02", 
                    title: "Loan Disbursement",
                    description: "Once borrower meets all requirements, funds are released directly to their account. All transactions are tracked and recorded.",
                    icon: "send"
                  },
                  {
                    step: "03",
                    title: "Repayment Protection",
                    description: "Borrower repayments are collected and held securely until the full loan amount is repaid to the lender.",
                    icon: "shield-check"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon name={item.icon} size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-2">{item.step}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="py-16">
            <div className="container-max">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Trusted by Thousands
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our security measures have protected billions in local currency transactions across Kenya, Uganda, and Nigeria.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "₦2.5B+", label: "Protected Transactions (Nigeria)" },
                  { number: "UGX 6.2T+", label: "Protected Transactions (Uganda)" },
                  { number: "KSh 32B+", label: "Protected Transactions (Kenya)" },
                  { number: "99.9%", label: "Success Rate" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.number}</div>
                    <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-primary-600 dark:bg-primary-700">
            <div className="container-max text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Your Security is Our Priority
                </h2>
                <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who trust Beelio with their financial transactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/auth" 
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started Securely
                  </Link>
                  <Link 
                    href="/auth" 
                    className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors"
                  >
                    Learn More About Security
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default SecureEscrowPage;
