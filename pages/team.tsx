import React from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';
import AuthProvider from '../components/SessionProvider';
import ErrorBoundary from '../components/ErrorBoundary';

const TeamPage = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <SEO
        title="Beelio Team - Builders of Africa's Technology Platform"
        description="Meet the team building Beelio's AI-driven, mobile-first technology platform for African communities."
        canonical="/team"
        keywords="Beelio team, founders, advisors, technology team"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="section-padding">
          <div className="container-max space-y-12">
            <section className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Our Team</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                We’re a technology-focused team building secure, scalable, and inclusive platforms.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Founder</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">[Founder Name]</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Founder & CEO</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Technology background in software engineering, distributed systems, and AI-driven products.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Team Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1,2,3].map((i) => (
                  <div key={i} className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">[Team Member]</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">[Role]</p>
                    <p className="text-gray-700 dark:text-gray-300">[Short bio placeholder]</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Advisors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1,2].map((i) => (
                  <div key={i} className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">[Advisor Name]</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">[Expertise]</p>
                    <p className="text-gray-700 dark:text-gray-300">[Short bio placeholder]</p>
                  </div>
                ))}
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

export default TeamPage;


