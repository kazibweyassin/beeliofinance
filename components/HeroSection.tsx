import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Banking-style carousel component
const BankingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Secure Transactions",
      description: "Bank-grade encryption protecting every transaction across our platform",
      icon: "🔒",
      stat: "256-bit",
      statLabel: "SSL Encryption",
      bgGradient: "from-blue-600 to-blue-800",
      image: "https://images.unsplash.com/photo-1700477800369-bc8e58928249?q=80&w=1051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Cybersecurity/lock
    },
    {
      title: "Real-Time Processing",
      description: "Lightning-fast payment processing with instant confirmations",
      icon: "⚡",
      stat: "<2 sec",
      statLabel: "Avg Processing",
      bgGradient: "from-slate-600 to-slate-800",
      image: "https://images.unsplash.com/photo-1633119747461-79f45df1913c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Analytics/charts
    },
    {
      title: "24/7 Monitoring",
      description: "Round-the-clock system monitoring ensuring maximum uptime",
      icon: "📊",
      stat: "99.9%",
      statLabel: "Uptime SLA",
      bgGradient: "from-blue-700 to-slate-700",
      image: "https://images.unsplash.com/photo-1616077168712-fc6c788db4af?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Server monitoring
    },
    {
      title: "AI Fraud Detection",
      description: "Advanced machine learning protecting your financial data",
      icon: "🤖",
      stat: "24/7",
      statLabel: "AI Protection",
      bgGradient: "from-blue-600 to-blue-800",
      image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // AI/tech
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 flex flex-col p-8">
      {/* Slide indicator dots */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Animated slides */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            {/* Background Image with Light Overlay */}
            <div className="absolute inset-0">
              <img 
                src={slides[activeSlide].image} 
                alt={slides[activeSlide].title}
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
            </div>

            {/* Top section - Icon and Status */}
            <div className="space-y-6 relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30"
              >
                <span className="text-4xl">{slides[activeSlide].icon}</span>
                <div>
                  <div className="text-white font-bold text-lg">{slides[activeSlide].title}</div>
                  <div className="text-white/80 text-sm">Active Now</div>
                </div>
              </motion.div>

              {/* Key Metric Display */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-xs"
              >
                <div className="text-5xl font-bold text-white mb-2">
                  {slides[activeSlide].stat}
                </div>
                <div className="text-white/90 text-lg font-medium">
                  {slides[activeSlide].statLabel}
                </div>
              </motion.div>
            </div>

            {/* Bottom section - Description */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8 relative z-10"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {slides[activeSlide].title}
              </h3>
              <p className="text-lg text-white/90 leading-relaxed max-w-lg">
                {slides[activeSlide].description}
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap gap-3 pt-4">
                {activeSlide === 0 && (
                  <>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      PCI DSS Compliant
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      End-to-End Encryption
                    </span>
                  </>
                )}
                {activeSlide === 1 && (
                  <>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      Instant Settlements
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      Real-Time Updates
                    </span>
                  </>
                )}
                {activeSlide === 2 && (
                  <>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      Automated Alerts
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      Performance Tracking
                    </span>
                  </>
                )}
                {activeSlide === 3 && (
                  <>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      Pattern Recognition
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      Risk Scoring
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  // Animated counter for stats
  const [counters, setCounters] = useState({
    users: 0,
    transactions: 0,
    uptime: 0
  });

  useEffect(() => {
    const targets = { users: 50000, transactions: 1500000, uptime: 99.9 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        users: Math.floor(targets.users * progress),
        transactions: Math.floor(targets.transactions * progress),
        uptime: parseFloat((targets.uptime * progress).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Cycle through stats highlights
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: counters.users, display: `${(counters.users / 1000).toFixed(0)}K+`, label: "Active Users", icon: "👥" },
    { value: counters.transactions, display: `${(counters.transactions / 1000000).toFixed(1)}M+`, label: "Transactions Processed", icon: "⚡" },
    { value: counters.uptime, display: `${counters.uptime}%`, label: "Platform Uptime", icon: "🔒" }
  ];

  const technologies = [
    { icon: "🤖", text: "AI-Powered", color: "from-blue-600 to-blue-700" },
    { icon: "☁️", text: "Cloud Native", color: "from-slate-600 to-slate-700" },
    { icon: "🔐", text: "Enterprise Security", color: "from-blue-500 to-blue-600" },
    { icon: "📊", text: "Real-time Analytics", color: "from-slate-600 to-slate-700" }
  ];

  const partners = [
    { name: "AWS", logo: "☁️" },
    { name: "Stripe", logo: "💳" },
    { name: "Twilio", logo: "📱" },
    { name: "MongoDB", logo: "🍃" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow text */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Powering Financial Infrastructure Across Africa
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">Technology Platform for </span>
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent block"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  Modern Financial Services
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                Building scalable APIs, mobile applications, and AI-powered systems that enable secure peer-to-peer transactions. Enterprise-grade infrastructure trusted by thousands across Uganda, Kenya, and Nigeria.
              </motion.p>
            </motion.div>

            {/* Technology Pills */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${tech.color} text-white rounded-full shadow-lg`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-sm font-medium">
                    {tech.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link href="/auth">
                <motion.button 
                  className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Building
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              
              <Link href="/about">
                <motion.button 
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700 border-2 border-slate-300 dark:border-slate-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Platform
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="pt-8 space-y-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    ✓
                  </span>
                  SOC 2 Compliant
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    🔒
                  </span>
                  Bank-Grade Encryption
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    ⚡
                  </span>
                  99.9% Uptime
                </span>
              </div>
              
              {/* Partner Logos */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Powered by:</span>
                <div className="flex items-center gap-4">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-lg">{partner.logo}</span>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{partner.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Platform Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`text-center p-4 rounded-xl transition-all duration-300 ${
                    activeStatIndex === index 
                      ? 'bg-blue-50 dark:bg-blue-900/20 scale-105' 
                      : 'bg-transparent'
                  }`}
                  animate={activeStatIndex === index ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {stat.display}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Tech Visual */}
          <motion.div 
            className="relative h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Platform Card */}
            <motion.div 
              className="absolute inset-0 bg-primary-900 dark:bg-primary-900 rounded-3xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Sliding Content Carousel - Banking Style */}
              <BankingCarousel />
            </motion.div>

            {/* Floating Tech Cards */}
            <motion.div 
              className="absolute -top-8 -right-8 w-40 h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 flex flex-col justify-center items-center border-2 border-blue-100 dark:border-blue-900"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <div className="text-4xl mb-2">�</div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900 dark:text-white">GraphQL</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">API Ready</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-8 -left-8 w-36 h-28 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-2xl p-4 flex flex-col justify-center items-center text-white"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="text-3xl mb-2">☁️</div>
              <div className="text-center">
                <div className="text-lg font-bold">Cloud</div>
                <div className="text-xs opacity-90">Scalable</div>
              </div>
            </motion.div>

            {/* Performance indicator */}
            <motion.div 
              className="absolute top-1/2 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border-2 border-green-100 dark:border-green-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">99.9%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Uptime SLA</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;