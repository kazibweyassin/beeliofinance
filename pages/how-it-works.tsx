import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const HowItWorksPage = () => {
  const steps = [
    {
      title: "Sign Up & Choose Your Role",
      description: "Create your account and select whether you're a borrower looking for funding or a lender wanting to invest.",
      icon: "UserPlus",
      details: [
        "Quick 5-minute registration process",
        "Choose between Borrower or Lender profile",
        "Complete identity verification",
        "Set your preferences and goals"
      ]
    },
    {
      title: "Create Your Profile",
      description: "Build a comprehensive profile that helps us match you with the right opportunities.",
      icon: "User",
      details: [
        "Add personal and financial information",
        "Upload required documents",
        "Set investment or borrowing preferences",
        "Complete risk assessment questionnaire"
      ]
    },
    {
      title: "Get Matched",
      description: "Our AI-powered system matches borrowers with lenders based on compatibility, risk, and preferences.",
      icon: "Search",
      details: [
        "Smart algorithm analyzes profiles",
        "Matches based on risk tolerance",
        "Considers geographic preferences",
        "Ensures optimal interest rates"
      ]
    },
    {
      title: "Review & Accept",
      description: "Review matched opportunities and accept the terms that work best for you.",
      icon: "CheckCircle",
      details: [
        "Review detailed loan/investment terms",
        "Check borrower/lender profiles",
        "Verify interest rates and timelines",
        "Accept or decline matches"
      ]
    },
    {
      title: "Secure Transaction",
      description: "Complete your transaction through our secure escrow system with full protection.",
      icon: "Shield",
      details: [
        "Funds held in secure escrow",
        "Automatic payment processing",
        "Real-time transaction tracking",
        "Full dispute resolution support"
      ]
    },
    {
      title: "Track & Manage",
      description: "Monitor your investments or loan repayments through our comprehensive dashboard.",
      icon: "BarChart3",
      details: [
        "Real-time portfolio tracking",
        "Payment reminders and notifications",
        "Performance analytics",
        "Easy reinvestment options"
      ]
    }
  ];

  const borrowerBenefits = [
    {
      title: "Quick Access to Funds",
      description: "Get approved and funded in hours, not weeks",
      icon: "Zap"
    },
    {
      title: "Competitive Rates",
      description: "Lower interest rates than traditional banks",
      icon: "DollarSign"
    },
    {
      title: "Flexible Terms",
      description: "Customize repayment schedules to fit your needs",
      icon: "Clock"
    },
    {
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprise charges",
      icon: "Eye"
    }
  ];

  const lenderBenefits = [
    {
      title: "Higher Returns",
      description: "Earn better returns than traditional savings accounts",
      icon: "TrendingUp"
    },
    {
      title: "Diversified Portfolio",
      description: "Spread risk across multiple borrowers",
      icon: "Target"
    },
    {
      title: "Social Impact",
      description: "Support African entrepreneurs and communities",
      icon: "Heart"
    },
    {
      title: "Easy Management",
      description: "Automated payments and portfolio tracking",
      icon: "Activity"
    }
  ];

  return (
    <>
      <Head>
        <title>How It Works - Beelio</title>
        <meta name="description" content="Learn how Beelio's peer-to-peer lending platform works for borrowers and lenders across Africa" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                How Beelio Works
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                Simple, secure, and transparent peer-to-peer lending for Africans
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Process in 6 Simple Steps
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From registration to successful transactions, here's how our platform works
              </p>
            </motion.div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon name={step.icon} className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-600">Step {index + 1}</div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-3">
                          <Icon name="Check" className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <Icon name={step.icon} className="w-12 h-12 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Borrower Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name="User" className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">For Borrowers</h3>
                  <p className="text-lg text-gray-600">Why choose Beelio for your funding needs</p>
                </div>

                <div className="space-y-6">
                  {borrowerBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl border border-green-200"
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon name={benefit.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Lender Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name="TrendingUp" className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">For Lenders</h3>
                  <p className="text-lg text-gray-600">Grow your wealth while supporting African communities</p>
                </div>

                <div className="space-y-6">
                  {lenderBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-6 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon name={benefit.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of Africans who are already using Beelio to grow their wealth
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Start Your Journey
                  </button>
                </Link>
                <Link href="/features">
                  <button className="bg-transparent hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg border-2 border-white transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowItWorksPage;
