import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from './ThemeProvider';
import Icon from './Icon';
import Image from 'next/image';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/technology', label: 'Technology' },
    { href: '/team', label: 'Team' },
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How It Works' }
  ];

  const actionItems = [
    { href: '/dashboard/borrower', label: 'For Users', icon: 'users' },
    { href: '/contact', label: 'Contact', icon: 'mail' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle page navigation
      window.location.href = href;
    }
  };

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-900/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-primary-900 dark:bg-gray-900 shadow-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Beelio Logo"
                width={120}
                height={32}
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-primary-200 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                </Link>
              </motion.div>
            ))}
            
            {/* Action Items */}
            {actionItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + index) * 0.1 }}
              >
                <Link href={item.href}>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-1 text-white hover:text-primary-200 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-primary-800"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </button>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-800 hover:bg-primary-700 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              <Icon 
                name={isDark ? 'sun' : 'moon'} 
                size={20} 
                className="text-white"
              />
            </motion.button>

            {/* User Menu or CTA Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary-800 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-primary-900 text-sm font-medium">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium">
                    {session?.user?.name || 'User'}
                  </span>
                  <Icon name="chevronDown" size={16} className="text-primary-200" />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                    >
                      <Link href="/dashboard">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Icon name="user" size={16} className="inline mr-2" />
                          Dashboard
                        </button>
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon name="logOut" size={16} className="inline mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth">
                  <motion.button 
                    className="bg-white text-primary-900 hover:bg-primary-100 font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/auth">
                  <motion.button 
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden p-2 rounded-lg hover:bg-primary-800 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? 'close' : 'menu'} 
              size={24} 
              className="text-white"
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-primary-800"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-left px-4 py-2 text-white hover:text-primary-200 hover:bg-primary-800 rounded-lg transition-colors duration-200"
                      >
                        {item.label}
                      </button>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Action Items */}
                <div className="border-t border-primary-800 pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {actionItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + index) * 0.1 }}
                      >
                        <Link href={item.href}>
                          <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-2 w-full px-4 py-3 text-white hover:text-primary-200 hover:bg-primary-800 rounded-lg transition-colors duration-200 border border-primary-700"
                          >
                            <Icon name={item.icon} size={18} />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-4 pt-4 border-t border-primary-800">
                  <span className="text-sm text-primary-200">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-primary-800 hover:bg-primary-700 transition-colors duration-200"
                  >
                    <Icon 
                      name={isDark ? 'sun' : 'moon'} 
                      size={20} 
                      className="text-white"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
