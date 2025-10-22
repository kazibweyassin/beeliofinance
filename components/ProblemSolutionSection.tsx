import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from './Icon';

const ProblemSolutionSection = () => {
  const problems = [
    {
      problem: "Limited Access to Credit",
      description: "Traditional banks reject 70% of loan applications, leaving millions without access to capital for business growth or personal needs.",
      solution: "Direct peer-to-peer connections eliminate traditional banking barriers, providing accessible credit opportunities for everyone.",
      icon: "XCircle",
      stats: "70% rejection rate",
      impact: "Millions excluded"
    },
    {
      problem: "High Interest Rates",
      description: "Banks charge exorbitant interest rates (15-30%+) making loans unaffordable for small businesses and individuals.",
      solution: "Competitive rates through direct lending, typically 5-12% lower than traditional banks, saving borrowers thousands.",
      icon: "DollarSign",
      stats: "15-30% APR",
      impact: "Unaffordable for many"
    },
    {
      problem: "Slow Approval Process",
      description: "Bank loan approvals take weeks or months, missing critical opportunities for time-sensitive business needs.",
      solution: "Instant matching and approval process - get funded in hours, not weeks, when opportunities arise.",
      icon: "Clock",
      stats: "Weeks to months",
      impact: "Missed opportunities"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Problem We're Solving
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Traditional banking fails millions of Africans. We're building a better way 
            to connect borrowers and lenders directly, creating opportunities for everyone.
          </p>
        </motion.div>

        {/* Problems & Solutions */}
        <motion.div 
          className="space-y-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((item, index) => (
            <motion.div 
              key={index} 
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              variants={itemVariants}
            >
              {/* Problem Side */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon name={item.icon} className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-600">The Problem</h3>
                      <div className="text-sm text-red-500 font-medium">{item.stats}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-gray-900">{item.problem}</h4>
                    <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                    
                    {/* Impact Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                      <Icon name="AlertCircle" className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-red-700 font-medium text-sm">{item.impact}</span>
                    </div>
                  </div>

                       {/* Problem Visual */}
                       <div className="mt-8 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 shadow-sm relative overflow-hidden">
                         <div className="flex items-center justify-between relative z-10">
                           <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                               <Icon name="XCircle" className="w-6 h-6 text-white" />
                             </div>
                             <div>
                               <h5 className="text-red-800 font-bold text-lg">Traditional Banking</h5>
                               <p className="text-red-600 text-sm">Complex & Exclusive</p>
                             </div>
                           </div>
                           <div className="text-right">
                             <div className="text-2xl font-bold text-red-600">{item.stats}</div>
                             <div className="text-red-500 text-sm">Current Reality</div>
                           </div>
                         </div>
                         {/* Background money image for financial problems */}
                         {item.icon === "DollarSign" && (
                           <div className="absolute top-0 right-0 w-32 h-20 opacity-10">
                             <img 
                               src="/money-3602159.jpg" 
                               alt="Financial challenges"
                               className="w-full h-full object-cover rounded-r-2xl"
                             />
                           </div>
                         )}
                       </div>
                </div>
              </div>

              {/* Solution Side */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon name="CheckCircle" className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600">Our Solution</h3>
                      <div className="text-sm text-green-500 font-medium">Beelio Platform</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-gray-900">Beelio's Approach</h4>
                    <p className="text-gray-600 leading-relaxed text-lg">{item.solution}</p>
                    
                    {/* Benefit Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full">
                      <Icon name="TrendingUp" className="w-4 h-4 text-indigo-500 mr-2" />
                      <span className="text-indigo-700 font-medium text-sm">Better Outcomes</span>
                    </div>
                  </div>

                  {/* Solution Visual */}
                  <div className="mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                          <Icon name="CheckCircle" className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h5 className="text-indigo-800 font-bold text-lg">Beelio Platform</h5>
                          <p className="text-indigo-600 text-sm">Simple & Inclusive</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">Better Rates</div>
                        <div className="text-indigo-500 text-sm">Our Promise</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-3xl p-12 max-w-5xl mx-auto border border-indigo-200 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Zap" className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-3xl mx-auto">
              Join thousands of Africans who are already building wealth through direct peer-to-peer lending. 
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Started Today
                </button>
              </Link>
              <Link href="/features">
                <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-8 rounded-xl text-lg border-2 border-blue-600 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
