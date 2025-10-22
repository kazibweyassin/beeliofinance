import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from './Icon';

const Footer = () => {
  const socialLinks = [
    { name: 'twitter', href: '#', label: 'Twitter' },
    { name: 'linkedin', href: '#', label: 'LinkedIn' },
    { name: 'facebook', href: '#', label: 'Facebook' },
    { name: 'instagram', href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-indigo-900 dark:bg-gray-900 text-white">
      <div className="container-max">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-2">
                  <img 
                    src="/logo.png" 
                    alt="Beelio Logo" 
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-gray-300 dark:text-gray-400 text-sm max-w-md">
                  Empowering African communities through accessible peer-to-peer lending. 
                  Building financial inclusion, one connection at a time.
                </p>
              </motion.div>
              
              {/* Social Links */}
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={social.name}
                    href={social.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon name={social.name} size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { href: '/features', label: 'Features' },
                  { href: '/how-it-works', label: 'How It Works' },
                  { href: '/testimonials', label: 'Testimonials' },
                  { href: '/contact', label: 'Contact' }
                ].map((link, index) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {[
                  { href: '/legal/privacy-policy', label: 'Privacy Policy' },
                  { href: '/legal/terms-of-service', label: 'Terms of Service' },
                  { href: '/security/security', label: 'Security' },
                  { href: '/security/compliance', label: 'Compliance' }
                ].map((link, index) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 dark:border-gray-600 py-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © 2024 Beelio Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.span 
                className="text-gray-400 dark:text-gray-500 text-sm flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <Icon name="heart" size={16} className="text-red-500" />
                <span>Made with ❤️ in Africa</span>
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
