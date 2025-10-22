import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../../components/ThemeProvider';
import AuthProvider from '../../components/SessionProvider';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';

const FeaturesPage = () => {
  const features = [
    {
      title: "Smart Matching Algorithm",
      description: "Our AI-powered system matches borrowers with lenders based on risk profiles, preferences, and financial goals for optimal outcomes.",
      icon: "search",
      color: "indigo",
      link: "/features/smart-matching",
      benefits: [
        "Personalized loan recommendations",
        "Risk-based matching",
        "Optimized interest rates",
        "Diversified portfolios"
      ]
    },
    {
      title: "Secure Escrow System",
      description: "All transactions are protected through our secure escrow system, ensuring funds are safely held until loan terms are met.",
      icon: "shield",
      color: "indigo",
      link: "/features/secure-escrow",
      benefits: [
        "Bank-grade security",
        "Automated fund release",
        "Dispute resolution",
        "Transaction transparency"
      ]
    },
    {
      title: "Real-time Risk Assessment",
      description: "Advanced credit scoring and risk analysis provide transparent insights for both borrowers and lenders before committing.",
      icon: "chart",
      color: "indigo",
      link: "/features/risk-assessment",
      benefits: [
        "Instant credit scoring",
        "Transparent risk metrics",
        "Historical data analysis",
        "Predictive modeling"
      ]
    },
    {
      title: "Mobile-First Experience",
      description: "Access Beelio anywhere, anytime with our intuitive mobile app designed for African users and local payment methods.",
      icon: "mobile",
      color: "indigo",
      link: "/features/mobile-first",
      benefits: [
        "Offline functionality",
        "Local payment methods",
        "SMS notifications",
        "Progressive web app"
      ]
    },
    {
      title: "Community Support",
      description: "Built-in community features help users connect, share experiences, and build trust within the lending ecosystem.",
      icon: "users",
      color: "indigo",
      link: "/features/community-support",
      benefits: [
        "User testimonials",
        "Community forums",
        "Trust building",
        "Social verification"
      ]
    },
    {
      title: "Multi-Currency Support",
      description: "Support for local African currencies (UGX, KES, NGN) with real-time conversion and local payment methods.",
      icon: "dollar-sign",
      color: "indigo",
      link: "/features/multi-currency",
      benefits: [
        "Local currency support",
        "Real-time conversion",
        "Local payment methods",
        "Cross-border transactions"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    return "bg-indigo-100 text-indigo-600";
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Head>
            <title>Features - Beelio</title>
            <meta name="description" content="Discover Beelio's powerful features designed for African peer-to-peer lending" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>

          <Header />

          <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="bg-indigo-600 dark:bg-indigo-800 text-white py-20">
              <div className="container-max">
                <motion.div 
                  className="text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Powerful Features for
                    <span className="block text-yellow-300">African Finance</span>
                  </h1>
                  <p className="text-xl text-indigo-100 leading-relaxed">
                    Discover how Beelio's innovative features are transforming peer-to-peer lending 
                    across Africa, making financial services more accessible and profitable for everyone.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
              <div className="container-max">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Everything You Need to Succeed
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our comprehensive feature set is designed specifically for African markets, 
                    addressing unique challenges and opportunities in peer-to-peer lending.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Icon */}
                      <motion.div 
                        className={`w-16 h-16 ${getColorClasses(feature.color)} rounded-xl flex items-center justify-center mb-6`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon name={feature.icon} size={32} />
                      </motion.div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>

                        {/* Benefits List */}
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Icon name="check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Learn More Link */}
                      <motion.div 
                        className="mt-6"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={feature.link} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center space-x-2">
                          <span>Learn More</span>
                          <Icon name="arrow" size={16} />
                        </Link>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 dark:bg-indigo-800 text-white py-20">
              <div className="container-max">
                <motion.div 
                  className="text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Experience These Features?
                  </h2>
                  <p className="text-xl text-indigo-100 mb-8">
                    Join thousands of Africans who are already benefiting from our innovative platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth">
                      <motion.button 
                        className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get Started
                      </motion.button>
                    </Link>
                    <Link href="/how-it-works">
                      <motion.button 
                        className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-3 px-8 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        How It Works
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>

          <Footer />
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default FeaturesPage;

