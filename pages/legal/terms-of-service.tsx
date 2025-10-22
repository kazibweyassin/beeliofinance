import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';

const TermsOfServicePage = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Beelio's platform, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, you may not access or use our services",
        "We reserve the right to modify these terms at any time, and your continued use constitutes acceptance",
        "These terms apply to all users, including borrowers, lenders, and visitors to our platform"
      ]
    },
    {
      title: "Description of Service",
      content: [
        "Beelio operates a peer-to-peer lending platform connecting borrowers and lenders",
        "We facilitate loans between individuals and small businesses across Kenya, Uganda, and Nigeria",
        "Our platform provides matching, verification, and transaction management services",
        "We are not a bank or financial institution, but a technology platform facilitating transactions"
      ]
    },
    {
      title: "User Eligibility",
      content: [
        "You must be at least 18 years old to use our services",
        "You must be a legal resident of Kenya, Uganda, or Nigeria",
        "You must provide accurate and complete information during registration",
        "You must have a valid bank account and government-issued identification",
        "You must not be prohibited from entering into financial agreements"
      ]
    },
    {
      title: "Borrower Responsibilities",
      content: [
        "Provide accurate financial and personal information",
        "Use loan funds only for the stated purpose",
        "Make timely payments according to the agreed schedule",
        "Maintain current contact information and notify us of any changes",
        "Comply with all applicable laws and regulations",
        "Not engage in fraudulent or deceptive practices"
      ]
    },
    {
      title: "Lender Responsibilities",
      content: [
        "Provide accurate financial information and investment preferences",
        "Understand the risks associated with peer-to-peer lending",
        "Diversify investments to manage risk appropriately",
        "Comply with applicable investment and tax regulations",
        "Not engage in discriminatory lending practices",
        "Maintain sufficient funds for committed investments"
      ]
    },
    {
      title: "Fees and Charges",
      content: [
        "Borrowers pay origination fees ranging from 1-3% of loan amount",
        "Lenders pay platform fees of 0.5-1% on successful transactions",
        "Late payment fees may apply for overdue payments",
        "All fees are clearly disclosed before transaction completion",
        "We reserve the right to modify fee structures with 30 days notice"
      ]
    },
    {
      title: "Risk Disclosure",
      content: [
        "Peer-to-peer lending involves inherent risks including potential loss of principal",
        "Past performance does not guarantee future results",
        "Economic conditions may affect borrower repayment ability",
        "Platform operations may be affected by technical issues or regulatory changes",
        "Users should carefully consider their risk tolerance before participating"
      ]
    },
    {
      title: "Prohibited Activities",
      content: [
        "Creating multiple accounts or providing false information",
        "Engaging in money laundering or other illegal activities",
        "Attempting to manipulate or game the platform",
        "Harassing or threatening other users",
        "Violating intellectual property rights",
        "Using automated systems to access the platform without permission"
      ]
    },
    {
      title: "Dispute Resolution",
      content: [
        "We encourage users to resolve disputes through our customer support team",
        "For unresolved disputes, we provide mediation services",
        "Arbitration may be required for certain types of disputes",
        "Users agree to waive the right to participate in class action lawsuits",
        "Dispute resolution procedures are governed by applicable local laws"
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "Beelio's liability is limited to the fees paid for our services",
        "We are not liable for indirect, incidental, or consequential damages",
        "We do not guarantee the performance or repayment of loans",
        "Users participate at their own risk and discretion",
        "Our liability is limited to the maximum extent permitted by law"
      ]
    },
    {
      title: "Termination",
      content: [
        "Either party may terminate the service agreement at any time",
        "We may suspend or terminate accounts for violations of these terms",
        "Upon termination, outstanding obligations remain in effect",
        "We may retain certain information as required by law or regulation",
        "Termination does not affect the validity of existing loan agreements"
      ]
    },
    {
      title: "Governing Law",
      content: [
        "These terms are governed by the laws of Uganda",
        "Any legal proceedings will be conducted in Ugandan courts",
        "We comply with applicable financial regulations in all operating countries",
        "Users are responsible for compliance with local laws and regulations",
        "International users must ensure compliance with their local laws"
      ]
    }
  ];

  const contactInfo = {
    email: "legal@beelio.com",
    phone: "+256 700 123 456",
    address: "Plot 123, Nakasero Road, Kampala, Uganda"
  };

  return (
    <>
      <Head>
        <title>Terms of Service - Beelio</title>
        <meta name="description" content="Beelio's Terms of Service - Read our terms and conditions for using our peer-to-peer lending platform." />
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
                Terms of Service
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
                Please read these terms carefully before using our peer-to-peer lending platform.
              </p>
              <div className="mt-6 text-sm text-green-200">
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
                Welcome to Beelio, a peer-to-peer lending platform that connects borrowers and lenders across Africa. 
                These Terms of Service ("Terms") govern your use of our website, mobile application, and related services 
                (collectively, the "Service").
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
                part of these terms, then you may not access the Service.
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

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mt-12 border border-yellow-200"
            >
              <div className="flex items-start space-x-4">
                <Icon name="AlertCircle" className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notice</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Risk Warning:</strong> Peer-to-peer lending involves risk. Your capital is at risk and 
                    you may not get back the full amount you invest. Past performance is not a guide to future performance. 
                    Please ensure you understand the risks involved and consider seeking independent financial advice if necessary.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Regulatory Notice:</strong> Beelio operates under applicable financial services regulations 
                    in Kenya, Uganda, and Nigeria. We are committed to compliance with all relevant laws and regulations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mt-8 border border-green-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" className="w-5 h-5 text-green-600" />
                  <a href={`mailto:${contactInfo.email}`} className="text-green-600 hover:text-green-700">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" className="w-5 h-5 text-green-600" />
                  <a href={`tel:${contactInfo.phone}`} className="text-green-600 hover:text-green-700">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">{contactInfo.address}</span>
                </div>
              </div>
            </motion.div>

            {/* Changes to Terms */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 mt-8 shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes 
                a material change will be determined at our sole discretion.
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
              <Link href="/legal/privacy-policy">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Privacy Policy
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white hover:bg-gray-50 text-green-600 font-bold py-3 px-6 rounded-xl border-2 border-green-600 transition-all duration-300 transform hover:scale-105">
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

export default TermsOfServicePage;
