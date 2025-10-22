import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from './Icon';

const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
});

const CTASection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: { email: string }) => {
    console.log('Email submitted:', data.email);
    setIsSubmitted(true);
    reset();
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main CTA Content */}
          <motion.div 
            className="space-y-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Ready to Transform Your
              <motion.span 
                className="block text-yellow-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Financial Future?
              </motion.span>
            </h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of Africans who are already building wealth through 
              peer-to-peer lending. Start your journey today.
            </motion.p>
          </motion.div>

          {/* Benefits List */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { icon: 'dollar', title: 'Earn Higher Returns', desc: 'Get 12-15% annual returns vs 2-5% from banks' },
              { icon: 'zap', title: 'Quick Access', desc: 'Get funded in hours, not weeks' },
              { icon: 'users', title: 'Community Support', desc: 'Connect with like-minded Africans' }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name={benefit.icon} size={32} className="text-indigo-800" />
                </motion.div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Email Signup Form */}
          <motion.div 
            className="bg-white dark:bg-gray-700 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Get Started Today
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of Africans already building wealth through peer-to-peer lending
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 ${
                          errors.email 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                      />
                      {errors.email && (
                        <motion.p 
                          className="text-red-500 text-sm mt-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>
                    <motion.button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 whitespace-nowrap rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join Now
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    No spam, ever. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <motion.div 
                  className="text-center space-y-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon name="check" size={32} className="text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome to Beelio!</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for joining us. We'll keep you updated on the latest features and opportunities.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Additional CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download App
            </motion.button>
            <motion.button 
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </motion.div>

          {/* Urgency/Scarcity */}
          <motion.div 
            className="mt-12 bg-yellow-400 dark:bg-yellow-500 text-indigo-800 dark:text-indigo-900 rounded-lg p-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon name="clock" size={24} />
              </motion.div>
              <span className="font-semibold">
                Limited Early Access - Join Now!
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
