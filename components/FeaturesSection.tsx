import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import Image from 'next/image';

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Matching Algorithm",
      description: "Our proprietary AI engine uses machine learning to analyze 50+ data points including risk profiles, transaction history, preferences, and financial goals to match platform users effectively.",
      icon: "search",
      color: "blue",
      link: "/features/smart-matching"
    },
    {
      title: "Secure Escrow System",
      description: "Built on secure cloud infrastructure with bank-grade encryption (AES-256). Funds are held in escrow with tamper-resistant workflows and audit trails.",
      icon: "shield",
      color: "green",
      link: "/features/secure-escrow"
    },
    {
      title: "Real-time Risk Assessment",
      description: "Advanced credit scoring engine leveraging alternative data sources and behavioral analytics to provide real-time risk insights for community members.",
      icon: "chart",
      color: "purple",
      link: "/features/risk-assessment"
    },
    {
      title: "Mobile-First Experience",
      description: "Access Beelio anywhere with a mobile-first architecture optimized for low-bandwidth networks and local payment systems across African markets.",
      icon: "mobile",
      color: "orange",
      link: "/features/mobile-first"
    },
    {
      title: "Community Support",
      description: "Built-in reputation, profiles, and messaging that foster trust and transparency across the community marketplace.",
      icon: "users",
      color: "pink",
      link: "/features/community-support"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-primary-100 text-primary-600",
      green: "bg-success-100 text-success-600", 
      purple: "bg-primary-100 text-primary-600",
      orange: "bg-warning-100 text-warning-600",
      pink: "bg-primary-100 text-primary-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-primary-100 text-primary-600";
  };

  return (
    <section id="features" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Technology Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A modern, API-driven platform with AI, mobile-first design, and cloud-native infrastructure that powers peer-to-peer connections at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 card-hover relative overflow-hidden"
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
              </div>

              {/* Learn More Link */}
              <motion.div 
                className="mt-6"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={feature.link} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center space-x-2">
                  <span>Learn More</span>
                  <Icon name="arrow" size={16} />
                </Link>
              </motion.div>
              
              {/* Background image for Community Support feature */}
              {feature.title === "Community Support" && (
                <div className="absolute top-0 right-0 w-32 h-20 opacity-5 rounded-tr-xl overflow-hidden">
                  <Image 
                    src="/patterns/mesh-gradient.webp" 
                    alt="Technology pattern"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Features Banner */}
        <motion.div 
          className="mt-16 bg-primary-600 dark:bg-primary-700 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Customer Support</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-primary-100">Uptime Guarantee</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-primary-100">Countries Served</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Integration Partners */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Integrated with Leading African Payment Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder for payment provider logos */}
            {['MTN Mobile Money', 'Airtel Money', 'M-Pesa', 'Flutterwave'].map((provider, index) => (
              <motion.div 
                key={index}
                className="bg-gray-200 dark:bg-gray-700 h-16 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-500 dark:text-gray-400 font-medium">{provider}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            Seamless integration with popular mobile money and payment services across Kenya, Uganda, and Nigeria
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
