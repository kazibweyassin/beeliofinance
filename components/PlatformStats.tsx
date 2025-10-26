import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

interface StatData {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const PlatformStats = () => {
  const [stats, setStats] = useState<StatData[]>([
    {
      label: 'Total Loans Funded',
      value: '2,500+',
      icon: 'trending-up',
      color: 'blue'
    },
    {
      label: 'Active Users',
      value: '10,000+',
      icon: 'users',
      color: 'green'
    },
    {
      label: 'Success Rate',
      value: '96%',
      icon: 'check-circle',
      color: 'purple'
    },
    {
      label: 'Total Disbursed',
      value: '₦2.5B',
      icon: 'dollar-sign',
      color: 'yellow'
    },
  ]);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-900 dark:text-blue-100', icon: 'text-blue-600 dark:text-blue-400' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-900 dark:text-green-100', icon: 'text-green-600 dark:text-green-400' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-900 dark:text-purple-100', icon: 'text-purple-600 dark:text-purple-400' },
      yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-900 dark:text-yellow-100', icon: 'text-yellow-600 dark:text-yellow-400' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands Across Africa
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join a growing community building financial futures together
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className={`${colors.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={stat.icon} className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <div className={`text-3xl font-bold ${colors.text} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* Trust Badge 1 */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Icon name="shield" className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-medium">Bank-Level Security</span>
            </div>

            {/* Trust Badge 2 */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Icon name="lock" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-medium">256-bit Encryption</span>
            </div>

            {/* Trust Badge 3 */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <Icon name="check-circle" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-medium">Verified Platform</span>
            </div>

            {/* Trust Badge 4 */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                <Icon name="clock" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStats;
