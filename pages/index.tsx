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
import TechPlatformOverview from '../components/TechPlatformOverview';
import HowItWorksSection from '../components/HowItWorksSection';
import SocialProofSection from '../components/SocialProofSection';
import PlatformStats from '../components/PlatformStats';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import TrustSignals from '../components/TrustSignals';

const HomePage = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          {/* Enhanced SEO Component */}
          <SEO
            title="Beelio - AI Technology Platform for African Communities"
            description="Our AI-powered, mobile-first platform enables secure peer-to-peer connections for financial opportunities across Uganda, Kenya, and Nigeria. Enterprise security, cloud infrastructure, and real-time processing."
            canonical="/"
            keywords="AI platform Africa, mobile-first technology, peer-to-peer platform, cloud infrastructure, fintech APIs, M-Pesa integration, Airtel Money, MTN, risk analytics, credit scoring, enterprise security"
          />

          <Head>
            {/* Additional Structured Data for Homepage */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Beelio Finance",
                  "url": "https://beelio.finance",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://beelio.finance/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                })
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Service",
                  "serviceType": "Peer-to-Peer Lending",
                  "provider": {
                    "@type": "FinancialService",
                    "name": "Beelio Finance",
                    "url": "https://beelio.finance"
                  },
                  "areaServed": {
                    "@type": "Country",
                    "name": "Uganda"
                  },
                  "description": "Secure peer-to-peer lending platform connecting borrowers and lenders in Uganda",
                  "offers": {
                    "@type": "Offer",
                    "name": "Personal Loans",
                    "description": "Fast loan approvals with competitive interest rates"
                  }
                })
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://beelio.finance"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "How It Works",
                      "item": "https://beelio.finance/how-it-works"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Features",
                      "item": "https://beelio.finance/features"
                    }
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

          {/* Our Technology Platform (new) */}
          <TechPlatformOverview />

          {/* Problem → Solution Section */}
          <ProblemSolutionSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* How It Works Section */}
          <HowItWorksSection />

          {/* Platform Stats */}
          <PlatformStats />

          {/* Social Proof Section */}
          <SocialProofSection />

          {/* Trust Signals */}
          <TrustSignals />

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