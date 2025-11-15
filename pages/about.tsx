import React from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../components/ThemeProvider';
import AuthProvider from '../components/SessionProvider';
import ErrorBoundary from '../components/ErrorBoundary';

const AboutPage = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <SEO
        title="About Beelio - Technology Company for African Inclusion"
        description="Beelio is a Uganda-headquartered technology company building AI-powered platforms, mobile apps, payment systems, and APIs that enable secure peer-to-peer connections across Africa."
        canonical="/about"
        keywords="About Beelio, technology company Uganda, AI platform Africa, fintech technology"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="section-padding">
          <div className="container-max space-y-16">
            <section className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">About Beelio</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                Beelio is a technology company headquartered in Uganda, building innovative platforms that drive African financial inclusion.
                We design and operate AI-powered systems that enable secure peer-to-peer connections across communities.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">What We Build</h2>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Mobile applications for Android and iOS</li>
                  <li>AI engines for matching, risk scoring, and analytics</li>
                  <li>Payment integrations (M-Pesa, Airtel Money, MTN, Flutterwave)</li>
                  <li>Public and partner APIs</li>
                  <li>Secure escrow and settlement systems</li>
                  <li>Data analytics dashboards</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Impact</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary-50 dark:bg-gray-800 p-6">
                    <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">99.9%</div>
                    <div className="text-gray-600 dark:text-gray-400">Platform Uptime</div>
                  </div>
                  <div className="rounded-xl bg-primary-50 dark:bg-gray-800 p-6">
                    <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">3</div>
                    <div className="text-gray-600 dark:text-gray-400">Countries Served</div>
                  </div>
                  <div className="rounded-xl bg-primary-50 dark:bg-gray-800 p-6">
                    <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">10k+</div>
                    <div className="text-gray-600 dark:text-gray-400">Community Members</div>
                  </div>
                  <div className="rounded-xl bg-primary-50 dark:bg-gray-800 p-6">
                    <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">ms</div>
                    <div className="text-gray-600 dark:text-gray-400">Low-latency Responses</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Technology Stack</h2>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Frontend: Next.js, React, TypeScript, TailwindCSS, Framer Motion</li>
                  <li>Backend: Next.js API Routes, Node.js, Prisma ORM</li>
                  <li>Database: PostgreSQL (Supabase)</li>
                  <li>Infrastructure: Vercel, CDN, Cloud monitoring</li>
                  <li>Security: AES-256 encryption at rest, TLS in transit</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Regulatory Compliance</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We operate in compliance with applicable local regulations and partner guidelines in the countries we serve.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Our policies prioritize user privacy, data protection, and transparent operations across Uganda, Kenya, and Nigeria.
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Company Details</h2>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li>Legal Name: Beelio Technologies</li>
                <li>Founded: 2024</li>
                <li>Headquarters: Kampala, Uganda</li>
                <li>Registration: Registered Business in Uganda</li>
                <li>Contact: hello@beelio.tech</li>
              </ul>
            </section>
          </div>
        </main>
        <Footer />
      </div>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AboutPage;


