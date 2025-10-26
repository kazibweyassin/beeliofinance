import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '../components/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is Beelio?',
    answer: 'Beelio is a peer-to-peer lending platform that connects borrowers who need funds with lenders who want to invest. We provide a secure, transparent marketplace for community-based lending in Africa.'
  },
  {
    category: 'General',
    question: 'Is Beelio safe and secure?',
    answer: 'Yes! We use bank-level encryption, secure payment processing, and strict KYC verification for all users. All transactions are tracked and funds are held in secure escrow accounts.'
  },
  {
    category: 'Borrowing',
    question: 'How do I request a loan?',
    answer: 'Sign up, complete your KYC verification, then submit a loan request with your desired amount, duration, and purpose. Admin will review your application within 24-48 hours.'
  },
  {
    category: 'Borrowing',
    question: 'What are the loan limits?',
    answer: 'You can borrow between 1,000 UGX and 10,000,000 UGX with repayment terms from 6 to 36 months, depending on your credit profile.'
  },
  {
    category: 'Borrowing',
    question: 'How is my interest rate determined?',
    answer: 'Interest rates are calculated based on your credit score, employment status, monthly income, and loan history. Rates typically range from 12% to 35% annually.'
  },
  {
    category: 'Borrowing',
    question: 'What can I use the loan for?',
    answer: 'Loans can be used for business expansion, education, medical expenses, home improvements, or personal needs. You must specify the purpose when applying.'
  },
  {
    category: 'Borrowing',
    question: 'How long does loan approval take?',
    answer: 'Initial review takes 24-48 hours. Once approved, your loan will be available for lender investment. Full funding typically takes 3-7 days depending on loan amount.'
  },
  {
    category: 'Lending',
    question: 'How do I invest in loans?',
    answer: 'Complete your KYC verification, browse available loans, review borrower details and risk scores, then invest any amount from 10,000 UGX upwards in loans that match your criteria.'
  },
  {
    category: 'Lending',
    question: 'What returns can I expect?',
    answer: 'Returns vary based on loan interest rates and risk levels. Average returns range from 15-30% annually. You can diversify by investing in multiple loans.'
  },
  {
    category: 'Lending',
    question: 'What if a borrower defaults?',
    answer: 'We have collection processes in place. Late fees apply, and we work with borrowers to restructure payments. While we minimize risk through verification, lending does carry some default risk.'
  },
  {
    category: 'Lending',
    question: 'Can I withdraw my investment early?',
    answer: 'Investments are locked until the loan term ends or is fully repaid. You receive monthly repayments which you can withdraw or reinvest.'
  },
  {
    category: 'KYC',
    question: 'Why do I need to verify my identity?',
    answer: 'KYC (Know Your Customer) verification is required by law and helps prevent fraud, ensuring a safe platform for all users.'
  },
  {
    category: 'KYC',
    question: 'What documents do I need for KYC?',
    answer: 'You need a valid government-issued ID (National ID, Passport, or Drivers License), a selfie photo, and a recent utility bill or bank statement for address verification.'
  },
  {
    category: 'KYC',
    question: 'How long does KYC verification take?',
    answer: 'Most verifications are completed within 24 hours. Complex cases may take up to 48 hours. You\'ll receive an email notification once verified.'
  },
  {
    category: 'Payments',
    question: 'How do I make repayments?',
    answer: 'You can make repayments via mobile money (MTN, Airtel), bank transfer, or card payment. Payments are processed instantly and reflect in your account immediately.'
  },
  {
    category: 'Payments',
    question: 'What happens if I miss a payment?',
    answer: 'Late fees apply after the due date. We send reminders 7 days, 3 days, and 1 day before due date. Contact us immediately if you\'re facing difficulties - we can work out a restructuring plan.'
  },
  {
    category: 'Payments',
    question: 'Can I repay my loan early?',
    answer: 'Yes! Early repayment is allowed after 6 months with no penalty. You\'ll save on interest charges. Contact support to process early repayment.'
  },
  {
    category: 'Fees',
    question: 'Are there any fees?',
    answer: 'We charge a small platform fee (1-2% of loan amount) for borrowers. Lenders pay no fees. Payment processing fees may apply depending on your payment method.'
  },
  {
    category: 'Fees',
    question: 'How do lenders get paid?',
    answer: 'Lenders receive monthly repayments (principal + interest) directly to their Beelio account. You can withdraw funds to your bank or mobile money account anytime.'
  },
  {
    category: 'Account',
    question: 'Can I have multiple active loans?',
    answer: 'Yes, subject to our assessment of your repayment capacity. You must have a good repayment history and debt-to-income ratio within acceptable limits.'
  },
  {
    category: 'Account',
    question: 'How do I improve my credit score on Beelio?',
    answer: 'Make all payments on time, complete your profile fully, maintain stable employment, and successfully repay loans. Your credit score improves with each successful loan.'
  },
];

const categories = ['All', 'General', 'Borrowing', 'Lending', 'KYC', 'Payments', 'Fees', 'Account'];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ThemeProvider>
      <Head>
        <title>FAQ - Frequently Asked Questions | Beelio</title>
        <meta name="description" content="Find answers to common questions about borrowing, lending, KYC verification, and more on Beelio." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              How Can We Help You?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 mb-8"
            >
              Find answers to commonly asked questions about Beelio
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Icon name="search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto hide-scrollbar py-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="search" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No results found for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 block">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <Icon 
                      name={openIndex === index ? 'chevron-up' : 'chevron-down'} 
                      className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Icon name="message-circle" className="w-5 h-5" />
                WhatsApp Support
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Icon name="mail" className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default FAQ;
