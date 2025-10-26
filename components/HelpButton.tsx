import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

interface HelpButtonProps {
  phoneNumber?: string;
  email?: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ 
  phoneNumber = '+256-XXX-XXX-XXXX',
  email = 'support@beelio.com'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=Hi, I need help with Beelio`;
  const emailUrl = `mailto:${email}?subject=Beelio Support Request`;

  return (
    <>
      {/* Main Help Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          aria-label="Get Help"
        >
          <Icon 
            name={isOpen ? 'x' : 'help-circle'} 
            className="w-6 h-6 transition-transform group-hover:scale-110" 
          />
        </button>

        {/* Badge for 24/7 support */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-md"
        >
          24/7
        </motion.div>
      </motion.div>

      {/* Help Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 w-64"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              How can we help?
            </h3>
            
            <div className="space-y-2">
              {/* WhatsApp Support */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Icon name="message-circle" className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    WhatsApp Support
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Chat with us now
                  </p>
                </div>
              </a>

              {/* Email Support */}
              <a
                href={emailUrl}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Icon name="mail" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Us
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {email}
                  </p>
                </div>
              </a>

              {/* FAQ Link */}
              <a
                href="/faq"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
              >
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Icon name="book-open" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    FAQ
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Find quick answers
                  </p>
                </div>
              </a>
            </div>

            {/* Average Response Time */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                ⚡ Average response time: <span className="font-semibold">5 minutes</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpButton;
