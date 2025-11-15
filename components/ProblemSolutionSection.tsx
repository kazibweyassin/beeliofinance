import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const ProblemSolutionSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const challenges = [
    {
      title: "Limited Access to Credit",
      problem: {
        stat: "70%",
        label: "Rejection Rate",
        description: "Traditional banks reject most loan applications, leaving millions without access to growth capital.",
        pain: "Millions excluded from financial services"
      },
      solution: {
        stat: "95%",
        label: "Approval Rate",
        description: "AI-powered matching connects borrowers with lenders directly, bypassing traditional barriers.",
        benefit: "Inclusive access for all"
      },
      icon: "🏦",
      color: "blue"
    },
    {
      title: "High Interest Rates",
      problem: {
        stat: "25%",
        label: "Average APR",
        description: "Traditional lenders charge high rates, making loans unaffordable for small businesses.",
        pain: "Too expensive for most people"
      },
      solution: {
        stat: "8-12%",
        label: "Competitive Rates",
        description: "Peer-to-peer matching eliminates intermediaries, delivering better rates for both sides.",
        benefit: "Fair & transparent pricing"
      },
      icon: "💰",
      color: "green"
    },
    {
      title: "Slow Approval Process",
      problem: {
        stat: "3-6",
        label: "Weeks Wait",
        description: "Manual verification and bureaucracy delay time-sensitive financial opportunities.",
        pain: "Missed business opportunities"
      },
      solution: {
        stat: "<24",
        label: "Hours",
        description: "Real-time processing with AI verification accelerates decisioning and fund disbursement.",
        benefit: "Lightning-fast approvals"
      },
      icon: "⚡",
      color: "purple"
    }
  ];

  const colorClasses = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      darkText: "text-blue-700"
    },
    green: {
      bg: "from-green-500 to-green-600",
      light: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      darkText: "text-green-700"
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      darkText: "text-purple-700"
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Why Choose Beelio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Traditional Banking vs. Beelio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our technology platform solves the biggest challenges in African financial services
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {challenges.map((challenge, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === index
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{challenge.icon}</span>
              {challenge.title}
            </motion.button>
          ))}
        </div>

        {/* Comparison Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Problem Card */}
            <motion.div 
              className="bg-white rounded-3xl p-8 border-2 border-red-200 shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">❌</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-600">Traditional Banking</h3>
                      <p className="text-sm text-red-500">The Old Way</p>
                    </div>
                  </div>
                </div>

                {/* Big Stat */}
                <div className="mb-6">
                  <div className="text-6xl font-bold text-red-600 mb-2">
                    {challenges[activeTab].problem.stat}
                  </div>
                  <div className="text-xl font-semibold text-red-700">
                    {challenges[activeTab].problem.label}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {challenges[activeTab].problem.description}
                </p>

                {/* Pain Point Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                  <span className="text-red-600">⚠️</span>
                  <span className="text-red-700 font-medium text-sm">
                    {challenges[activeTab].problem.pain}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Solution Card */}
            <motion.div 
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 shadow-xl relative overflow-hidden text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Beelio Platform</h3>
                      <p className="text-sm text-white/80">The Smart Way</p>
                    </div>
                  </div>
                </div>

                {/* Big Stat */}
                <div className="mb-6">
                  <div className="text-6xl font-bold text-white mb-2">
                    {challenges[activeTab].solution.stat}
                  </div>
                  <div className="text-xl font-semibold text-white/90">
                    {challenges[activeTab].solution.label}
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {challenges[activeTab].solution.description}
                </p>

                {/* Benefit Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span>✅</span>
                  <span className="text-white font-medium text-sm">
                    {challenges[activeTab].solution.benefit}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Stats Overview */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setActiveTab(index)}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl mb-3">{challenge.icon}</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h4>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-primary-600">{challenge.solution.stat}</span>
                <span className="text-sm text-gray-500">vs {challenge.problem.stat}</span>
              </div>
              <p className="text-sm text-gray-600">{challenge.solution.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-3xl p-12 max-w-4xl mx-auto border border-primary-200">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience the Beelio Difference
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands using our AI-powered platform for faster, fairer, and more inclusive financial services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <motion.button 
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link href="/how-it-works">
                <motion.button 
                  className="bg-white hover:bg-gray-50 text-primary-600 font-bold py-4 px-8 rounded-xl text-lg border-2 border-primary-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See How It Works
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
