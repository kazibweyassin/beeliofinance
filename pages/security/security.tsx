import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';

const SecurityPage = () => {
  const securityFeatures = [
    {
      title: "Bank-Grade Encryption",
      description: "All data is encrypted using AES-256 encryption, the same standard used by banks and financial institutions worldwide.",
      icon: "Lock",
      details: [
        "End-to-end encryption for all communications",
        "Encrypted data storage and transmission",
        "Regular security audits and penetration testing",
        "Compliance with international security standards"
      ]
    },
    {
      title: "Multi-Factor Authentication",
      description: "Enhanced security with multiple verification methods to protect your account from unauthorized access.",
      icon: "Shield",
      details: [
        "SMS and email verification codes",
        "Biometric authentication support",
        "Hardware security key compatibility",
        "Backup recovery codes"
      ]
    },
    {
      title: "Secure Escrow System",
      description: "Funds are held in secure, regulated escrow accounts until transactions are completed successfully.",
      icon: "Key",
      details: [
        "Third-party regulated escrow services",
        "Automatic fund release upon completion",
        "Dispute resolution mechanisms",
        "Insurance coverage for escrow funds"
      ]
    },
    {
      title: "Fraud Detection",
      description: "Advanced AI-powered systems continuously monitor for suspicious activities and potential fraud.",
      icon: "Activity",
      details: [
        "Real-time transaction monitoring",
        "Machine learning fraud detection",
        "Behavioral analysis and risk scoring",
        "Automated alerts for suspicious activities"
      ]
    },
    {
      title: "Identity Verification",
      description: "Comprehensive identity verification process ensures all users are who they claim to be.",
      icon: "Fingerprint",
      details: [
        "Government ID verification",
        "Biometric data collection",
        "Address verification",
        "Credit bureau integration"
      ]
    },
    {
      title: "Data Protection",
      description: "Strict data protection measures ensure your personal and financial information remains secure.",
      icon: "Eye",
      details: [
        "Minimal data collection principles",
        "Regular data purging policies",
        "User consent management",
        "GDPR and local privacy law compliance"
      ]
    }
  ];

  const complianceStandards = [
    {
      name: "PCI DSS",
      description: "Payment Card Industry Data Security Standard",
      status: "Compliant",
      icon: "CreditCard"
    },
    {
      name: "ISO 27001",
      description: "Information Security Management System",
      status: "Certified",
      icon: "Shield"
    },
    {
      name: "SOC 2",
      description: "Service Organization Control 2",
      status: "Audited",
      icon: "FileText"
    },
    {
      name: "GDPR",
      description: "General Data Protection Regulation",
      status: "Compliant",
      icon: "Globe"
    }
  ];

  const securityTips = [
    {
      title: "Strong Passwords",
      description: "Use unique, complex passwords for your Beelio account",
      icon: "Key"
    },
    {
      title: "Secure Networks",
      description: "Only access your account from secure, private networks",
      icon: "WifiOff"
    },
    {
      title: "Regular Updates",
      description: "Keep your device and browser software updated",
      icon: "Bell"
    },
    {
      title: "Monitor Activity",
      description: "Regularly review your account activity and statements",
      icon: "Activity"
    }
  ];

  const incidentResponse = [
    {
      step: "Detection",
      description: "Automated monitoring systems detect potential security incidents",
      icon: "AlertCircle"
    },
    {
      step: "Assessment",
      description: "Security team assesses the severity and impact of the incident",
      icon: "Search"
    },
    {
      step: "Containment",
      description: "Immediate measures taken to contain and prevent further damage",
      icon: "Shield"
    },
    {
      step: "Investigation",
      description: "Thorough investigation to understand the root cause",
      icon: "FileText"
    },
    {
      step: "Recovery",
      description: "Systems restored and services resumed with enhanced security",
      icon: "CheckCircle"
    },
    {
      step: "Review",
      description: "Post-incident review and security improvements implemented",
      icon: "TrendingUp"
    }
  ];

  return (
    <>
      <Head>
        <title>Security - Beelio</title>
        <meta name="description" content="Learn about Beelio's comprehensive security measures and how we protect your data and funds on our peer-to-peer lending platform." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-red-600 to-pink-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Security First
              </h1>
              <p className="text-xl md:text-2xl text-red-100 max-w-4xl mx-auto">
                Your security is our top priority. Learn about the comprehensive measures we take to protect your data and funds.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Security Features */}
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
                Our Security Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple layers of security protect your information and transactions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={feature.icon} className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <Icon name="Check" className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
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
                Compliance & Certifications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We meet the highest industry standards for security and compliance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {complianceStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 text-center border border-red-200"
                >
                  <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={standard.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{standard.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{standard.description}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {standard.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Incident Response */}
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
                Incident Response Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our structured approach to handling security incidents
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {incidentResponse.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <Icon name={step.icon} className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.step}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Tips */}
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
                Security Tips for Users
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Help us keep your account secure by following these best practices
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {securityTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-200"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={tip.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Questions About Security?
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Our security team is here to help. Contact us with any security concerns or questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contact Security Team
                  </button>
                </Link>
                <Link href="/security/compliance">
                  <button className="bg-transparent hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg border-2 border-white transition-all duration-300 transform hover:scale-105">
                    View Compliance Details
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

export default SecurityPage;
