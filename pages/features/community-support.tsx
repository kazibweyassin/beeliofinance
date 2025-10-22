import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';
import ThemeProvider from '../../components/ThemeProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

const CommunitySupportPage = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Head>
          <title>Community Support - Beelio</title>
          <meta name="description" content="Learn about Beelio's community features that help users connect, share experiences, and build trust." />
        </Head>

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container-max py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Beelio</span>
                </Link>
                <Link href="/" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-800 dark:to-gray-700">
            <div className="container-max">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Icon name="users" size={40} className="text-pink-600 dark:text-pink-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Community Support
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Built-in community features help users connect, share experiences, and build trust 
                  within the lending ecosystem across Africa.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Community Features */}
          <section className="py-16">
            <div className="container-max">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Building Trust Through Community
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our community features create a supportive environment where users can learn, 
                  share, and build lasting relationships.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "User Reviews & Ratings",
                    description: "Rate and review borrowers and lenders to build reputation and trust within the community.",
                    icon: "star"
                  },
                  {
                    title: "Discussion Forums",
                    description: "Join conversations about financial literacy, investment strategies, and lending best practices.",
                    icon: "message-circle"
                  },
                  {
                    title: "Success Stories",
                    description: "Share and read inspiring stories of successful loans and investments from community members.",
                    icon: "award"
                  },
                  {
                    title: "Local Groups",
                    description: "Connect with users in your city or region for local meetups and networking opportunities.",
                    icon: "map-pin"
                  },
                  {
                    title: "Mentorship Program",
                    description: "Experienced users can mentor newcomers, sharing knowledge and guidance for better outcomes.",
                    icon: "user-plus"
                  },
                  {
                    title: "Community Challenges",
                    description: "Participate in financial literacy challenges and earn rewards while learning about smart money management.",
                    icon: "trophy"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={feature.icon} size={20} className="text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Community Stats */}
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container-max">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Growing Community
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Join thousands of users who are building a supportive financial community across Kenya, Uganda, and Nigeria.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "15K+", label: "Active Members" },
                  { number: "500+", label: "Success Stories" },
                  { number: "95%", label: "Satisfaction Rate" },
                  { number: "3", label: "Countries Served" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.number}</div>
                    <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16">
            <div className="container-max">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  What Our Community Says
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Aisha Mohammed",
                    location: "Lagos, Nigeria",
                    role: "Borrower",
                    quote: "The community helped me understand how to improve my credit score. The mentorship program is amazing!",
                    rating: 5
                  },
                  {
                    name: "James Kiprop",
                    location: "Nairobi, Kenya", 
                    role: "Lender",
                    quote: "I've made great connections through the local groups. The transparency in reviews helps me make better investment decisions.",
                    rating: 5
                  },
                  {
                    name: "Fatima Hassan",
                    location: "Kampala, Uganda",
                    role: "Both",
                    quote: "The discussion forums taught me so much about financial planning. Now I'm both borrowing and lending successfully.",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="star" size={16} className="text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.location} • {testimonial.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Join Community CTA */}
          <section className="py-16 bg-primary-600 dark:bg-primary-700">
            <div className="container-max text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Join Our Community Today
                </h2>
                <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                  Connect with like-minded individuals, learn from experts, and build your financial future together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/auth" 
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Join as Borrower
                  </Link>
                  <Link 
                    href="/auth" 
                    className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors"
                  >
                    Join as Lender
                  </Link>
                </div>
                <p className="text-primary-200 text-sm mt-4">
                  Free to join • No hidden fees • Instant access to community features
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default CommunitySupportPage;
