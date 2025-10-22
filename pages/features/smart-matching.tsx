import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';
import ThemeProvider from '../../components/ThemeProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

const SmartMatchingPage = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Head>
          <title>Smart Matching Algorithm - Beelio</title>
          <meta name="description" content="Learn how Beelio's AI-powered matching system connects borrowers with lenders for optimal outcomes." />
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
          <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
            <div className="container-max">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Icon name="search" size={40} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Smart Matching Algorithm
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our AI-powered system intelligently matches borrowers with lenders based on risk profiles, 
                  preferences, and financial goals to ensure optimal outcomes for everyone.
                </p>
              </motion.div>
            </div>
          </section>

          {/* How It Works */}
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
                  How Our Matching Works
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our sophisticated algorithm analyzes multiple factors to create the perfect match between borrowers and lenders.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Profile Analysis",
                    description: "We analyze borrower credit history, income stability, and loan purpose to create comprehensive risk profiles.",
                    icon: "user"
                  },
                  {
                    step: "02", 
                    title: "Preference Matching",
                    description: "Lender preferences for risk tolerance, loan amounts, and terms are matched with suitable borrowers.",
                    icon: "target"
                  },
                  {
                    step: "03",
                    title: "Optimal Pairing",
                    description: "Our AI finds the best matches that satisfy both parties' requirements and maximize success rates.",
                    icon: "check-circle"
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

          {/* Benefits */}
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
                  Benefits for Everyone
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* For Borrowers */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Icon name="user" size={24} className="text-green-600 mr-3" />
                    For Borrowers
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Faster loan approval with pre-qualified lenders",
                      "Better interest rates through competitive matching",
                      "Transparent risk assessment and feedback",
                      "Personalized loan recommendations"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon name="check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* For Lenders */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Icon name="dollar-sign" size={24} className="text-blue-600 mr-3" />
                    For Lenders
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Pre-screened borrowers matching your criteria",
                      "Detailed risk profiles and credit scores",
                      "Diversified portfolio recommendations",
                      "Higher success rates and returns"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon name="check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
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
                  Ready to Experience Smart Matching?
                </h2>
                <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already benefiting from our intelligent matching system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/auth" 
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started as Borrower
                  </Link>
                  <Link 
                    href="/auth" 
                    className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors"
                  >
                    Start Investing
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

export default SmartMatchingPage;
