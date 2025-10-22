import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';
import ThemeProvider from '../../components/ThemeProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

const RiskAssessmentPage = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Head>
          <title>Real-time Risk Assessment - Beelio</title>
          <meta name="description" content="Learn how Beelio's advanced risk assessment provides transparent insights for borrowers and lenders." />
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
          <section className="py-16 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-gray-800 dark:to-gray-700">
            <div className="container-max">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Icon name="chart" size={40} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Real-time Risk Assessment
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Advanced credit scoring and risk analysis provide transparent insights for both borrowers 
                  and lenders before committing to any transaction.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Assessment Factors */}
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
                  Comprehensive Risk Analysis
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our AI analyzes multiple data points to provide accurate risk assessments and credit scores.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Credit History",
                    description: "Analysis of past loan performance, payment patterns, and credit behavior.",
                    icon: "file-text",
                    percentage: "40%"
                  },
                  {
                    title: "Income Stability",
                    description: "Evaluation of employment history, income consistency, and financial stability.",
                    icon: "trending-up",
                    percentage: "25%"
                  },
                  {
                    title: "Debt-to-Income Ratio",
                    description: "Assessment of current debt obligations relative to income capacity.",
                    icon: "calculator",
                    percentage: "20%"
                  },
                  {
                    title: "Transaction History",
                    description: "Analysis of banking patterns, spending habits, and financial behavior.",
                    icon: "activity",
                    percentage: "10%"
                  },
                  {
                    title: "Social Factors",
                    description: "Community standing, references, and social proof indicators.",
                    icon: "users",
                    percentage: "3%"
                  },
                  {
                    title: "Market Conditions",
                    description: "Economic factors, industry trends, and regional risk assessments.",
                    icon: "globe",
                    percentage: "2%"
                  }
                ].map((factor, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <Icon name={factor.icon} size={20} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{factor.percentage}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{factor.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{factor.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Risk Levels */}
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
                  Risk Level Categories
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Clear risk categorization helps both borrowers and lenders make informed decisions.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    level: "Low Risk",
                    score: "750-850",
                    color: "green",
                    description: "Excellent credit history, stable income, low debt ratio. Prime lending candidates.",
                    features: ["Lowest interest rates", "Fast approval", "High loan amounts", "Flexible terms"]
                  },
                  {
                    level: "Medium Risk", 
                    score: "650-749",
                    color: "yellow",
                    description: "Good credit standing with minor issues. Reliable borrowers with moderate risk.",
                    features: ["Competitive rates", "Standard approval", "Good loan amounts", "Standard terms"]
                  },
                  {
                    level: "Higher Risk",
                    score: "500-649", 
                    color: "red",
                    description: "Challenging credit history but potential for improvement. Higher rates apply.",
                    features: ["Higher interest rates", "Stricter terms", "Lower amounts", "Co-signer options"]
                  }
                ].map((risk, index) => (
                  <motion.div 
                    key={index}
                    className={`bg-${risk.color}-50 dark:bg-${risk.color}-900/20 rounded-xl p-6 border-2 border-${risk.color}-200 dark:border-${risk.color}-800`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-center mb-6">
                      <h3 className={`text-2xl font-bold text-${risk.color}-600 dark:text-${risk.color}-400 mb-2`}>
                        {risk.level}
                      </h3>
                      <div className={`text-lg font-semibold text-${risk.color}-700 dark:text-${risk.color}-300`}>
                        Score: {risk.score}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{risk.description}</p>
                    <ul className="space-y-2">
                      {risk.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <Icon name="check" size={16} className={`text-${risk.color}-600 dark:text-${risk.color}-400 flex-shrink-0`} />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
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
                  Benefits of Transparent Risk Assessment
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
                    <Icon name="user" size={24} className="text-blue-600 mr-3" />
                    For Borrowers
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Understand your creditworthiness before applying",
                      "Get personalized recommendations for improvement",
                      "Access to detailed credit reports and insights",
                      "Transparent pricing based on actual risk level"
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
                    <Icon name="dollar-sign" size={24} className="text-green-600 mr-3" />
                    For Lenders
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Detailed borrower risk profiles and credit scores",
                      "Historical performance data and trends",
                      "Automated risk-based pricing recommendations",
                      "Portfolio diversification insights"
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
                  Get Your Risk Assessment Today
                </h2>
                <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who trust our transparent risk assessment system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/auth" 
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Check My Credit Score
                  </Link>
                  <Link 
                    href="/auth" 
                    className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors"
                  >
                    Start Lending
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

export default RiskAssessmentPage;
