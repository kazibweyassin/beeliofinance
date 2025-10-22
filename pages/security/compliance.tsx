import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';

const CompliancePage = () => {
  const regulations = [
    {
      country: "Uganda",
      regulator: "Bank of Uganda",
      framework: "Financial Institutions Act",
      status: "Compliant",
      description: "We operate under the supervision of Bank of Uganda and comply with all applicable financial services regulations.",
      requirements: [
        "Licensed money lending operations",
        "Anti-money laundering compliance",
        "Customer due diligence procedures",
        "Regular regulatory reporting"
      ],
      icon: "Shield"
    },
    {
      country: "Kenya",
      regulator: "Central Bank of Kenya",
      framework: "Banking Act & Microfinance Act",
      status: "Compliant",
      description: "Our operations in Kenya are regulated by the Central Bank of Kenya under applicable fintech regulations.",
      requirements: [
        "Digital financial services license",
        "Data protection compliance",
        "Consumer protection standards",
        "Risk management frameworks"
      ],
      icon: "Shield"
    },
    {
      country: "Nigeria",
      regulator: "Central Bank of Nigeria",
      framework: "Banking & Other Financial Institutions Act",
      status: "Compliant",
      description: "We comply with Nigerian financial services regulations and operate under appropriate licensing frameworks.",
      requirements: [
        "Fintech licensing requirements",
        "Know Your Customer (KYC) procedures",
        "Anti-terrorism financing measures",
        "Consumer credit regulations"
      ],
      icon: "Shield"
    }
  ];

  const complianceAreas = [
    {
      title: "Anti-Money Laundering (AML)",
      description: "Comprehensive AML procedures to prevent money laundering and terrorist financing",
      features: [
        "Customer identification and verification",
        "Transaction monitoring and reporting",
        "Suspicious activity detection",
        "Regular AML training for staff"
      ],
      icon: "Activity"
    },
    {
      title: "Know Your Customer (KYC)",
      description: "Robust customer due diligence processes to verify identity and assess risk",
      features: [
        "Identity document verification",
        "Address verification",
        "Biometric data collection",
        "Ongoing customer monitoring"
      ],
      icon: "User"
    },
    {
      title: "Data Protection",
      description: "Strict data protection measures in compliance with local and international standards",
      features: [
        "GDPR compliance for EU users",
        "Local data protection law adherence",
        "Data minimization principles",
        "User consent management"
      ],
      icon: "Lock"
    },
    {
      title: "Consumer Protection",
      description: "Comprehensive consumer protection measures to ensure fair treatment",
      features: [
        "Transparent fee disclosure",
        "Fair lending practices",
        "Dispute resolution mechanisms",
        "Financial education resources"
      ],
      icon: "Heart"
    },
    {
      title: "Risk Management",
      description: "Enterprise-wide risk management framework to identify and mitigate risks",
      features: [
        "Credit risk assessment",
        "Operational risk controls",
        "Market risk monitoring",
        "Regulatory risk management"
      ],
      icon: "BarChart3"
    },
    {
      title: "Reporting & Monitoring",
      description: "Regular reporting to regulators and continuous monitoring of compliance",
      features: [
        "Monthly regulatory reports",
        "Quarterly compliance reviews",
        "Annual external audits",
        "Real-time monitoring systems"
      ],
      icon: "FileText"
    }
  ];

  const certifications = [
    {
      name: "ISO 27001:2013",
      description: "Information Security Management System",
      issuer: "International Organization for Standardization",
      status: "Certified",
      validity: "Valid until 2025",
      icon: "Shield"
    },
    {
      name: "PCI DSS Level 1",
      description: "Payment Card Industry Data Security Standard",
      issuer: "PCI Security Standards Council",
      status: "Compliant",
      validity: "Annual assessment",
      icon: "CreditCard"
    },
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2",
      issuer: "American Institute of CPAs",
      status: "Audited",
      validity: "Annual audit",
      icon: "FileText"
    },
    {
      name: "GDPR Compliance",
      description: "General Data Protection Regulation",
      issuer: "European Union",
      status: "Compliant",
      validity: "Ongoing compliance",
      icon: "Globe"
    }
  ];

  const auditSchedule = [
    {
      quarter: "Q1 2024",
      audits: ["Internal Security Audit", "AML Compliance Review", "Data Protection Assessment"],
      status: "Completed",
      icon: "CheckCircle"
    },
    {
      quarter: "Q2 2024",
      audits: ["External Security Audit", "Regulatory Compliance Review", "Risk Management Assessment"],
      status: "Completed",
      icon: "CheckCircle"
    },
    {
      quarter: "Q3 2024",
      audits: ["ISO 27001 Surveillance Audit", "PCI DSS Assessment", "Consumer Protection Review"],
      status: "Completed",
      icon: "CheckCircle"
    },
    {
      quarter: "Q4 2024",
      audits: ["Annual Compliance Review", "SOC 2 Type II Audit", "Regulatory Reporting Review"],
      status: "In Progress",
      icon: "Clock"
    }
  ];

  return (
    <>
      <Head>
        <title>Compliance - Beelio</title>
        <meta name="description" content="Learn about Beelio's regulatory compliance and certifications across Kenya, Uganda, and Nigeria." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Regulatory Compliance
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto">
                We maintain the highest standards of regulatory compliance across all our operating countries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Regulatory Framework */}
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
                Regulatory Framework
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We operate under the supervision of central banks and financial regulators in each country
              </p>
            </motion.div>

            <div className="space-y-8">
              {regulations.map((regulation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon name={regulation.icon} className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{regulation.country}</h3>
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {regulation.status}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-lg font-semibold text-gray-700 mb-1">{regulation.regulator}</div>
                        <div className="text-gray-600">{regulation.framework}</div>
                      </div>
                      <p className="text-gray-600 mb-6">{regulation.description}</p>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Requirements:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {regulation.requirements.map((requirement, reqIndex) => (
                            <li key={reqIndex} className="flex items-start space-x-3">
                              <Icon name="Check" className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-600">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Areas */}
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
                Compliance Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive compliance across all critical areas of financial services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {complianceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={area.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{area.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{area.description}</p>
                  <ul className="space-y-3">
                    {area.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Icon name="Check" className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
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
                Certifications & Standards
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We maintain internationally recognized certifications and standards
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon name={cert.icon} className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                        <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {cert.status}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{cert.description}</p>
                      <div className="text-sm text-gray-500">
                        <div>Issued by: {cert.issuer}</div>
                        <div>Valid: {cert.validity}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Schedule */}
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
                Audit Schedule
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Regular audits ensure ongoing compliance and continuous improvement
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {auditSchedule.map((audit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                      <Icon name={audit.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{audit.quarter}</h3>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        audit.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {audit.status}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {audit.audits.map((auditItem, auditIndex) => (
                      <li key={auditIndex} className="flex items-start space-x-2">
                        <Icon name="Check" className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 text-sm">{auditItem}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Compliance Questions?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Our compliance team is available to answer any regulatory questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contact Compliance Team
                  </button>
                </Link>
                <Link href="/security/security">
                  <button className="bg-transparent hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg border-2 border-white transition-all duration-300 transform hover:scale-105">
                    View Security Details
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

export default CompliancePage;
