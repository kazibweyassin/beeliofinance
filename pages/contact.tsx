import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      title: "Customer Support",
      description: "Get help with your account, transactions, or general questions",
      email: "support@beelio.com",
      phone: "+256 700 123 456",
      hours: "24/7 Support",
      icon: "MessageCircle"
    },
    {
      title: "Business Inquiries",
      description: "Partnerships, media, and business development",
      email: "business@beelio.com",
      phone: "+256 700 123 457",
      hours: "Mon-Fri 9AM-6PM EAT",
      icon: "Users"
    },
    {
      title: "Technical Support",
      description: "Technical issues, API access, and developer support",
      email: "tech@beelio.com",
      phone: "+256 700 123 458",
      hours: "Mon-Fri 9AM-6PM EAT",
      icon: "Activity"
    }
  ];

  const offices = [
    {
      city: "Kampala, Uganda",
      address: "Plot 123, Nakasero Road\nKampala, Uganda",
      phone: "+256 700 123 456",
      email: "uganda@beelio.com",
      icon: "MapPin"
    },
    {
      city: "Nairobi, Kenya",
      address: "Westlands Business Center\nNairobi, Kenya",
      phone: "+254 700 123 456",
      email: "kenya@beelio.com",
      icon: "MapPin"
    },
    {
      city: "Lagos, Nigeria",
      address: "Victoria Island Business District\nLagos, Nigeria",
      phone: "+234 700 123 456",
      email: "nigeria@beelio.com",
      icon: "MapPin"
    }
  ];

  const faqs = [
    {
      question: "How do I get started as a borrower?",
      answer: "Simply sign up, complete your profile, and submit a loan request. Our system will match you with suitable lenders based on your requirements and risk profile."
    },
    {
      question: "What are the interest rates?",
      answer: "Interest rates vary based on risk assessment, loan amount, and duration. Generally, rates are 5-12% lower than traditional banks, typically ranging from 8-18% APR."
    },
    {
      question: "How secure is my money?",
      answer: "We use bank-grade security, SSL encryption, and secure escrow services. All transactions are protected and monitored by our compliance team."
    },
    {
      question: "Can I invest from outside Africa?",
      answer: "Currently, we only accept investors from Kenya, Uganda, and Nigeria. We're working on expanding to other African countries soon."
    },
    {
      question: "What happens if a borrower defaults?",
      answer: "We have a comprehensive risk assessment system and collection process. In case of default, we work with borrowers on repayment plans and may use collection agencies as a last resort."
    },
    {
      question: "How long does loan approval take?",
      answer: "Most loans are approved within 24-48 hours. Simple personal loans can be approved in as little as 2-4 hours, while business loans may take up to 72 hours."
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us - Beelio</title>
        <meta name="description" content="Get in touch with Beelio's support team. We're here to help with your peer-to-peer lending needs across Africa." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                We're here to help. Get in touch with our team for support, partnerships, or any questions you may have.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name="CheckCircle" className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+256 700 123 456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Inquiry Type
                          </label>
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="borrower">Borrower Support</option>
                            <option value="lender">Lender Support</option>
                            <option value="technical">Technical Issue</option>
                            <option value="business">Business Partnership</option>
                            <option value="media">Media Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Brief description of your inquiry"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Please provide details about your inquiry..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Choose the right contact method for your needs. Our team is ready to help you succeed.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name={info.icon} className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                          <p className="text-gray-600 mb-4">{info.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Icon name="Mail" className="w-4 h-4 text-gray-400" />
                              <a href={`mailto:${info.email}`} className="text-blue-600 hover:text-blue-700">
                                {info.email}
                              </a>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="Phone" className="w-4 h-4 text-gray-400" />
                              <a href={`tel:${info.phone}`} className="text-blue-600 hover:text-blue-700">
                                {info.phone}
                              </a>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="Clock" className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{info.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Offices */}
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
                Our Offices
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We have offices across three African countries to serve you better
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-200"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={office.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{office.city}</h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="whitespace-pre-line">{office.address}</p>
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="Phone" className="w-4 h-4" />
                      <a href={`tel:${office.phone}`} className="text-blue-600 hover:text-blue-700">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="Mail" className="w-4 h-4" />
                      <a href={`mailto:${office.email}`} className="text-blue-600 hover:text-blue-700">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions about our platform
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
