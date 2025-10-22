import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from './Icon';

const HeroSection = () => {
  return (
    <section className="bg-primary-50 dark:bg-gray-800 section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Empowering African
                <motion.span 
                  className="text-indigo-600 dark:text-indigo-400 block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Communities
                </motion.span>
                Through P2P Lending
              </h1>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Connect directly with borrowers and lenders across Africa. 
                Build wealth, support communities, and create financial opportunities 
                that traditional banks can't provide.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/auth">
                <motion.button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-indigo-600 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Dashboard
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex items-center space-x-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {[
                { value: "10K+", label: "Active Users" },
                { value: "$2M+", label: "Loans Facilitated" },
                { value: "98%", label: "Success Rate" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                         <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Hero Image with actual Unsplash images */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Main hero image */}
              <img 
                src="/uganda-3602150.jpg"
                alt="Ugandan currency and financial prosperity"
                className="w-full h-96 object-cover"
                loading="eager"
              />
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <h3 className="text-xl font-bold mb-2">Ugandan Prosperity</h3>
                  <p className="text-sm opacity-90">
                    Building wealth with local currency and community support
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Cards with additional images */}
            <motion.div 
              className="absolute -top-6 -right-6 w-32 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <img 
                src="/action-2277292.jpg"
                alt="Team collaboration and unity"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-28 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              animate={{ 
                y: [0, 8, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              <img 
                src="/street-6771492.jpg"
                alt="African street life and community"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Stats overlay */}
            <motion.div 
              className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Live Transactions
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
