import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, date of birth, and identification documents",
        "Financial Information: Bank account details, income information, credit history, and transaction records",
        "Usage Data: Information about how you use our platform, including pages visited and features used",
        "Device Information: IP address, browser type, operating system, and device identifiers"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and improve our peer-to-peer lending services",
        "To verify your identity and assess creditworthiness",
        "To match borrowers with suitable lenders",
        "To process transactions and manage your account",
        "To communicate with you about your account and our services",
        "To comply with legal and regulatory requirements",
        "To prevent fraud and ensure platform security"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We share information with lenders/borrowers as necessary to facilitate transactions",
        "We may share information with third-party service providers who help us operate our platform",
        "We may share information with credit bureaus and financial institutions as required",
        "We may share information with law enforcement agencies when legally required",
        "We do not sell your personal information to third parties for marketing purposes"
      ]
    },
    {
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "We implement strict access controls and authentication measures",
        "We regularly audit our security systems and practices",
        "We train our staff on data protection and privacy best practices",
        "We have incident response procedures in place for any security breaches"
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Right to access: You can request a copy of your personal information",
        "Right to rectification: You can correct inaccurate or incomplete information",
        "Right to erasure: You can request deletion of your personal information",
        "Right to portability: You can request transfer of your data to another service",
        "Right to object: You can object to certain processing of your information",
        "Right to restrict processing: You can limit how we use your information"
      ]
    },
    {
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as necessary to provide our services",
        "We may retain information longer for legal, regulatory, or business purposes",
        "We securely delete or anonymize information when it's no longer needed",
        "Transaction records may be retained for up to 7 years for regulatory compliance"
      ]
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies to improve your experience on our platform",
        "We use analytics cookies to understand how our platform is used",
        "We use security cookies to protect against fraud and unauthorized access",
        "You can control cookie settings through your browser preferences"
      ]
    },
    {
      title: "International Transfers",
      content: [
        "Your data may be transferred to and processed in countries outside your residence",
        "We ensure appropriate safeguards are in place for international transfers",
        "We comply with applicable data protection laws in all jurisdictions",
        "We may use cloud services that store data in multiple locations"
      ]
    }
  ];

  const contactInfo = {
    email: "privacy@beelio.com",
    phone: "+256 700 123 456",
    address: "Plot 123, Nakasero Road, Kampala, Uganda"
  };

  return (
    <>
      <Head>
        <title>Privacy Policy - Beelio</title>
        <meta name="description" content="Beelio's Privacy Policy - Learn how we collect, use, and protect your personal information on our peer-to-peer lending platform." />
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
                Privacy Policy
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <div className="mt-6 text-sm text-blue-200">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Beelio ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our peer-to-peer lending platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with 
                this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <Icon name="Check" className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mt-12 border border-blue-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" className="w-5 h-5 text-blue-600" />
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-700">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" className="w-5 h-5 text-blue-600" />
                  <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:text-blue-700">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">{contactInfo.address}</span>
                </div>
              </div>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 mt-8 shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
                this Privacy Policy periodically for any changes.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <Link href="/legal/terms-of-service">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Terms of Service
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-6 rounded-xl border-2 border-blue-600 transition-all duration-300 transform hover:scale-105">
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
