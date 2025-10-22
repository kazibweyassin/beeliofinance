import React from 'react';
import Link from 'next/link';

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Sign up and complete your profile with basic information and verification documents. Our secure system protects your data.",
      details: [
        "Upload ID verification",
        "Connect bank account",
        "Set lending/borrowing preferences",
        "Complete risk assessment"
      ],
      icon: "👤", // Replace with actual icon component
      color: "primary"
    },
    {
      step: "02", 
      title: "Browse & Match",
      description: "Browse available loan opportunities or create loan requests. Our AI matches you with compatible borrowers or lenders.",
      details: [
        "View loan listings",
        "Set investment criteria",
        "Review borrower profiles",
        "Get instant matches"
      ],
      icon: "🔍", // Replace with actual icon component
      color: "secondary"
    },
    {
      step: "03",
      title: "Lend & Earn",
      description: "Fund loans and start earning returns, or receive funding for your needs. All transactions are secured through our platform.",
      details: [
        "Secure escrow protection",
        "Automated repayments",
        "Real-time tracking",
        "Community support"
      ],
      icon: "💰", // Replace with actual icon component
      color: "success"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-primary-100 text-primary-600 border-primary-200",
      secondary: "bg-secondary-100 text-secondary-600 border-secondary-200", 
      success: "bg-green-100 text-green-600 border-green-200"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Beelio Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with peer-to-peer lending is simple. 
            Follow these three easy steps to begin your journey.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Step Info */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${getColorClasses(step.color)} rounded-full flex items-center justify-center text-2xl font-bold border-2`}>
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <h4 className="text-xl font-semibold text-gray-700">{step.title}</h4>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Step-specific CTA */}
                <div className="pt-4">
                  <Link href={index === 0 ? '/auth' : index === 1 ? '/dashboard' : '/dashboard'}>
                    <button className="btn-primary">
                      {index === 0 ? 'Get Started' : index === 1 ? 'Browse Loans' : 'Start Earning'}
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  {/* Main Visual Container */}
                  <div className={`${getColorClasses(step.color)} rounded-2xl p-8 h-80 flex flex-col items-center justify-center space-y-6`}>
                    <div className="text-6xl">{step.icon}</div>
                    <div className="text-center space-y-2">
                      <h4 className="text-xl font-bold">{step.title}</h4>
                      <p className="text-sm opacity-80">Step {step.step}</p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  {index === 0 && (
                    <>
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full opacity-60"></div>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <div className="absolute top-1/2 -right-6 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
                      <div className="absolute -bottom-6 left-1/2 w-8 h-8 bg-purple-400 rounded-full opacity-60"></div>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <div className="absolute -top-6 left-1/4 w-6 h-6 bg-orange-400 rounded-full opacity-60"></div>
                      <div className="absolute top-1/4 -right-6 w-8 h-8 bg-pink-400 rounded-full opacity-60"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Complete Process Flow
            </h3>
            <p className="text-gray-600">
              From registration to earning returns, see how Beelio connects communities
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Process Cards */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                  1
                </div>
                <h4 className="font-semibold text-gray-900">Registration</h4>
                <p className="text-sm text-gray-600">Complete profile and verification</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                  2
                </div>
                <h4 className="font-semibold text-gray-900">Matching</h4>
                <p className="text-sm text-gray-600">AI-powered borrower-lender matching</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                  3
                </div>
                <h4 className="font-semibold text-gray-900">Transact</h4>
                <p className="text-sm text-gray-600">Secure lending and earning returns</p>
              </div>
            </div>

            {/* Connecting Arrows */}
            <div className="hidden md:flex justify-center items-center mt-8 space-x-4">
              <div className="flex-1 h-0.5 bg-primary-300"></div>
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex-1 h-0.5 bg-primary-300"></div>
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex-1 h-0.5 bg-primary-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
