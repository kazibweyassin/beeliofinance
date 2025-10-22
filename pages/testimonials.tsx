import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: "Grace Nakamya",
      location: "Kampala, Uganda",
      role: "Small Business Owner",
      image: "/images/testimonials/grace-nakamya.jpg",
      rating: 5,
      quote: "Beelio helped me expand my tailoring business. I got a loan in just 2 days and was able to buy new machines. The interest rate was much better than what banks offered.",
      amount: "UGX 2,500,000",
      duration: "6 months",
      category: "Business Loan"
    },
    {
      name: "David Ssemwogerere",
      location: "Entebbe, Uganda",
      role: "Investor",
      image: "/images/testimonials/david-ssemwogerere.jpg",
      rating: 5,
      quote: "I've been investing through Beelio for over a year now. The returns are excellent and I love supporting local entrepreneurs. The platform is very user-friendly.",
      amount: "UGX 5,000,000",
      duration: "12 months",
      category: "Investment Portfolio"
    },
    {
      name: "Patience Namukasa",
      location: "Jinja, Uganda",
      role: "Student",
      image: "/images/testimonials/patience-namukasa.jpg",
      rating: 5,
      quote: "As a university student, I needed money for my final year project. Traditional banks wouldn't give me a loan, but Beelio connected me with lenders who believed in my idea.",
      amount: "UGX 800,000",
      duration: "4 months",
      category: "Education Loan"
    },
    {
      name: "James Mwangi",
      location: "Nairobi, Kenya",
      role: "Farmer",
      image: "/images/testimonials/james-mwangi.jpg",
      rating: 5,
      quote: "The agricultural loan I got through Beelio helped me buy seeds and equipment for the planting season. The repayment schedule was flexible and suited my harvest cycle.",
      amount: "KES 150,000",
      duration: "8 months",
      category: "Agricultural Loan"
    },
    {
      name: "Aisha Ibrahim",
      location: "Lagos, Nigeria",
      role: "Tech Entrepreneur",
      image: "/images/testimonials/aisha-ibrahim.jpg",
      rating: 5,
      quote: "Starting my tech startup was challenging, but Beelio made it possible. The investors on the platform understood the tech sector and gave me favorable terms.",
      amount: "NGN 2,500,000",
      duration: "18 months",
      category: "Startup Funding"
    },
    {
      name: "Peter Okonkwo",
      location: "Abuja, Nigeria",
      role: "Retiree",
      image: "/images/testimonials/peter-okonkwo.jpg",
      rating: 5,
      quote: "As a retiree, I wanted to invest my savings wisely. Beelio allows me to diversify across different borrowers and earn steady returns. It's been a great addition to my retirement portfolio.",
      amount: "NGN 1,800,000",
      duration: "24 months",
      category: "Retirement Investment"
    }
  ];

  const stats = [
    {
      number: "15,000+",
      label: "Active Users",
      icon: "Users"
    },
    {
      number: "UGX 2.5B+",
      label: "Total Loans Disbursed",
      icon: "DollarSign"
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
      icon: "Star"
    },
    {
      number: "3 Countries",
      label: "Serving Africa",
      icon: "Globe"
    }
  ];

  const categories = [
    {
      name: "Business Loans",
      count: "45%",
      description: "Small business expansion and working capital",
      icon: "BarChart3"
    },
    {
      name: "Personal Loans",
      count: "30%",
      description: "Education, medical, and personal needs",
      icon: "User"
    },
    {
      name: "Agricultural Loans",
      count: "15%",
      description: "Farming equipment and seasonal funding",
      icon: "Target"
    },
    {
      name: "Startup Funding",
      count: "10%",
      description: "Early-stage business funding",
      icon: "Zap"
    }
  ];

  return (
    <>
      <Head>
        <title>Success Stories & Testimonials - Beelio</title>
        <meta name="description" content="Read real success stories from borrowers and lenders using Beelio's peer-to-peer lending platform across Africa" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Success Stories
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
                Real stories from real people who are building wealth and achieving their dreams through Beelio
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon name={stat.icon} className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from borrowers and lenders who are transforming their financial futures
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* User Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Loan Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Amount</div>
                        <div className="font-bold text-gray-900">{testimonial.amount}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="font-bold text-gray-900">{testimonial.duration}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-gray-500 text-sm">Category</div>
                      <div className="font-bold text-green-600">{testimonial.category}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Loan Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Loan Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See what types of loans are most popular on our platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={category.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <div className="text-3xl font-bold text-green-600 mb-4">{category.count}</div>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Join thousands of Africans who are already achieving their financial goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <button className="bg-white hover:bg-gray-100 text-green-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Start Your Journey
                  </button>
                </Link>
                <Link href="/how-it-works">
                  <button className="bg-transparent hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg border-2 border-white transition-all duration-300 transform hover:scale-105">
                    Learn How It Works
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TestimonialsPage;
