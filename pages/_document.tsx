import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="03abbb8610574c19" />
        
        {/* SEO Meta tags */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="msapplication-TileColor" content="#4F46E5" />
        <meta name="description" content="Beelio - Uganda's leading peer-to-peer lending platform connecting borrowers and lenders with secure, fast, and transparent financial services." />
        <meta name="keywords" content="peer-to-peer lending, P2P lending Uganda, microfinance, loans Uganda, online lending, crowdfunding, investment opportunities Uganda, borrow money, lend money" />
        <meta name="author" content="Beelio Finance" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Beelio Finance" />
        <meta property="og:title" content="Beelio - Peer-to-Peer Lending Platform in Uganda" />
        <meta property="og:description" content="Connect with trusted lenders and borrowers. Fast approvals, low interest rates, and secure transactions." />
        <meta property="og:image" content="https://beelio.finance/logo.png" />
        <meta property="og:locale" content="en_UG" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Beelio - Peer-to-Peer Lending Platform" />
        <meta name="twitter:description" content="Uganda's leading P2P lending platform. Fast, secure, transparent." />
        <meta name="twitter:image" content="https://beelio.finance/logo.png" />
        
        {/* Canonical URL - will be overridden per page */}
        <link rel="canonical" href="https://beelio.finance" />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialService',
              name: 'Beelio Finance',
              description: 'Peer-to-peer lending platform connecting borrowers and lenders in Uganda',
              url: 'https://beelio.finance',
              logo: 'https://beelio.finance/logo.png',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'UG',
                addressRegion: 'Uganda'
              },
              sameAs: [
                'https://facebook.com/beeliofinance',
                'https://twitter.com/beeliofinance',
                'https://linkedin.com/company/beeliofinance'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+256-XXX-XXXXXX',
                contactType: 'Customer Service',
                availableLanguage: ['en', 'sw']
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
