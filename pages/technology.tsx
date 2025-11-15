import React from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';
import AuthProvider from '../components/SessionProvider';
import ErrorBoundary from '../components/ErrorBoundary';

const TechnologyPage = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <SEO
        title="Beelio Technology - Architecture, Security, APIs, Performance"
        description="Explore Beelio's system architecture, enterprise security, API capabilities and integrations, technology stack, and platform performance metrics."
        canonical="/technology"
        keywords="system architecture, enterprise security, API integrations, platform performance, technology stack"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="section-padding">
          <div className="container-max space-y-16">
            <section className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Technology</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                Technical overview of the Beelio platform: architecture, security, APIs, stack, and performance.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">System Architecture</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Cloud-native architecture with modular services for matching, risk scoring, payments, and analytics. Event-driven processing enables real-time updates and scalable throughput.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Security</h2>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Encryption: AES-256 at rest, TLS 1.2+ in transit</li>
                  <li>Hardened environments and secret management</li>
                  <li>Role-based access controls and audit logging</li>
                  <li>Regular backups and disaster recovery</li>
                  <li>Compliance with local regulations and data protection standards</li>
                </ul>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">APIs and Integrations</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  RESTful APIs for partner integrations, webhooks for events, and native connections to mobile money providers including M-Pesa, Airtel Money, MTN, and processors like Flutterwave.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Technology Stack</h2>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Frontend: Next.js, React, TypeScript</li>
                  <li>Backend: Node.js, Next.js API Routes, Prisma</li>
                  <li>Database: PostgreSQL</li>
                  <li>Infrastructure: Vercel, CDN, CI/CD</li>
                  <li>Monitoring and observability tooling</li>
                </ul>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Platform Performance</h2>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Uptime: 99.9%</li>
                  <li>Fast response times with global edge delivery</li>
                  <li>Scalable architecture for peak loads</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Developer Resources</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Coming soon: API docs, SDKs, webhooks catalog, and sandbox access for partners and developers.
                </p>
              </div>
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

export default TechnologyPage;


