import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const items = [
  {
    title: 'AI Matching Engine',
    description: 'Machine learning algorithms pairing community members using 50+ data points.',
    icon: 'search',
  },
  {
    title: 'Mobile-First Architecture',
    description: 'Native-ready UI patterns optimized for African devices and networks.',
    icon: 'mobile',
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption (AES-256), secure escrow flows, and hardening.',
    icon: 'shield',
  },
  {
    title: 'Real-Time Processing',
    description: 'Cloud-native event pipeline for instant decisions and updates.',
    icon: 'zap',
  },
  {
    title: 'Payment Integration',
    description: 'M-Pesa, Airtel Money, MTN, and Flutterwave integrations via secure APIs.',
    icon: 'credit-card',
  },
  {
    title: 'Data Analytics Dashboard',
    description: 'Risk assessment and credit scoring with behavioral analytics.',
    icon: 'chart',
  },
];

const TechPlatformOverview = () => {
  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Technology Platform
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A secure, AI-powered platform connecting community members through mobile-first experiences and robust cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-5">
                <Icon name={item.icon} size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechPlatformOverview;


