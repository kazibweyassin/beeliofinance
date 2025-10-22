import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '../components/ThemeProvider';
import AuthProvider from '../components/SessionProvider';
import { GoogleAnalytics } from '../components/Analytics';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProblemSolutionSection from '../components/ProblemSolutionSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import SocialProofSection from '../components/SocialProofSection';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Head>
            <title>Beelio - Uganda's Leading Peer-to-Peer Lending Platform</title>
            <meta 
              name="description" 
              content="Connect directly with borrowers and lenders in Uganda. Build wealth, support communities, and create financial opportunities through peer-to-peer lending." 
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content="peer-to-peer lending, African fintech, P2P loans, financial inclusion, Africa lending" />
            <meta property="og:title" content="Beelio - Empowering African Communities Through P2P Lending" />
            <meta property="og:description" content="Connect directly with borrowers and lenders across Africa. Build wealth, support communities, and create financial opportunities." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://beelio.com" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Beelio - Empowering African Communities Through P2P Lending" />
            <meta name="twitter:description" content="Connect directly with borrowers and lenders across Africa. Build wealth, support communities, and create financial opportunities." />
            <link rel="icon" href="/favicon.ico" />
            
            {/* Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Beelio Technologies",
                  "description": "African fintech startup focused on peer-to-peer lending",
                  "url": "https://beelio.com",
                  "logo": "https://beelio.com/logo.png",
                  "sameAs": [
                    "https://twitter.com/beelio",
                    "https://linkedin.com/company/beelio"
                  ]
                })
              }}
            />
          </Head>

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
      )}

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Problem → Solution Section */}
          <ProblemSolutionSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* How It Works Section */}
          <HowItWorksSection />

          {/* Social Proof Section */}
          <SocialProofSection />

          {/* CTA Section */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default HomePage;