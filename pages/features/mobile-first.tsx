import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';
import ThemeProvider from '../../components/ThemeProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

const MobileFirstPage = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Head>
          <title>Mobile-First Experience - Beelio</title>
          <meta name="description" content="Learn about Beelio's intuitive mobile app designed for African users and local payment methods." />
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
          <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-800 dark:to-gray-700">
            <div className="container-max">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Icon name="mobile" size={40} className="text-orange-600 dark:text-orange-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Mobile-First Experience
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Access Beelio anywhere, anytime with our intuitive mobile app designed specifically 
                  for African users and local payment methods.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mobile Features */}
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
                  Built for African Mobile Users
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our mobile app is optimized for the unique needs and preferences of African users.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Offline Capability",
                    description: "Core features work even with poor internet connectivity common in rural areas.",
                    icon: "wifi-off"
                  },
                  {
                    title: "Low Data Usage",
                    description: "Optimized for minimal data consumption to reduce costs for users.",
                    icon: "battery"
                  },
                  {
                    title: "Local Languages",
                    description: "Support for major African languages including Swahili, Yoruba, and Igbo.",
                    icon: "globe"
                  },
                  {
                    title: "Biometric Security",
                    description: "Fingerprint and face recognition for secure, quick access to your account.",
                    icon: "fingerprint"
                  },
                  {
                    title: "Push Notifications",
                    description: "Real-time alerts for loan updates, payments, and important account activities.",
                    icon: "bell"
                  },
                  {
                    title: "Quick Actions",
                    description: "One-tap access to common features like loan requests and payments.",
                    icon: "zap"
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
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={feature.icon} size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Payment Methods */}
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
                  Local Payment Methods
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Integrated with popular African payment systems for seamless transactions.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { name: "MTN Mobile Money", country: "Uganda, Ghana" },
                  { name: "Airtel Money", country: "Kenya, Uganda" },
                  { name: "M-Pesa", country: "Kenya, Tanzania" },
                  { name: "Flutterwave", country: "Nigeria, Ghana" },
                  { name: "Paystack", country: "Nigeria" },
                  { name: "Orange Money", country: "West Africa" },
                  { name: "Ecocash", country: "Zimbabwe" },
                  { name: "Bank Transfer", country: "All Countries" }
                ].map((payment, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="credit-card" size={20} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{payment.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{payment.country}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* App Screenshots Placeholder */}
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
                  Intuitive User Interface
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Clean, simple design that makes peer-to-peer lending accessible to everyone.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Dashboard",
                    description: "Overview of your loans, investments, and account balance at a glance.",
                    mockup: "📱 Dashboard View"
                  },
                  {
                    title: "Loan Request",
                    description: "Simple form to request loans with instant risk assessment and matching.",
                    mockup: "📱 Loan Request Form"
                  },
                  {
                    title: "Investment",
                    description: "Browse available loans and make investments with detailed borrower profiles.",
                    mockup: "📱 Investment Screen"
                  }
                ].map((screen, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-2xl flex items-center justify-center mb-6 text-gray-500 dark:text-gray-400 text-lg">
                      {screen.mockup}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{screen.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{screen.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Download Section */}
          <section className="py-16 bg-primary-600 dark:bg-primary-700">
            <div className="container-max text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Download Beelio Mobile App
                </h2>
                <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                  Available on iOS and Android. Coming soon to app stores.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                    <Icon name="apple" size={20} />
                    <span>App Store (Coming Soon)</span>
                  </button>
                  <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors flex items-center justify-center space-x-2">
                    <Icon name="play" size={20} />
                    <span>Google Play (Coming Soon)</span>
                  </button>
                </div>
                <p className="text-primary-200 text-sm mt-4">
                  Join our beta program to get early access
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default MobileFirstPage;
