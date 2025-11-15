import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const badges = [
  { label: 'Registered Business in Uganda', icon: 'check-circle' },
  { label: '99.9% Platform Uptime', icon: 'activity' },
  { label: 'Bank-Grade Security', icon: 'shield' },
  { label: 'Serving 3 African Countries', icon: 'globe' },
];

const TrustSignals = () => {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Trusted. Secure. Reliable.</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Signals that demonstrate our commitment to reliability and security.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, idx) => (
            <motion.div
              key={b.label}
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 flex items-center space-x-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-300">
                <Icon name={b.icon} size={20} />
              </div>
              <span className="text-gray-800 dark:text-gray-200 font-medium">{b.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;


