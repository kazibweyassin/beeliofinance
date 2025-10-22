import React from 'react';
import { motion } from 'framer-motion';

const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Grace Nakamya",
      role: "Small Business Owner",
      location: "Kampala, Uganda",
      content: "Beelio helped me secure funding for my catering business when banks rejected my application. The process was simple and the community support was amazing.",
      rating: 5,
      avatar: "👩🏾‍💼" // Replace with actual avatar image
    },
    {
      name: "David Ssemwogerere",
      role: "Investor",
      location: "Entebbe, Uganda", 
      content: "I've been earning consistent returns of 12-15% annually through Beelio. The platform is transparent and the risk assessment tools are excellent.",
      rating: 5,
      avatar: "👨🏾‍💼" // Replace with actual avatar image
    },
    {
      name: "Patience Namukasa",
      role: "Student",
      location: "Jinja, Uganda",
      content: "As a student, I needed a small loan for my education. Beelio connected me with lenders who understood my situation. The interest rates were fair and manageable.",
      rating: 5,
      avatar: "/maternity-7890354_1280.jpg" // Using maternity image for student testimonial
    }
  ];

  const inspiration = [
    { 
      name: "Techstars", 
      logo: "/Techstars-Black-with-white-letters.png",
      url: "https://www.techstars.com",
      description: "Global startup accelerator"
    },
    { 
      name: "Y Combinator", 
      logo: "/Y_Combinator_logo.svg",
      url: "https://ycombinator.com",
      description: "Silicon Valley accelerator"
    },
    { 
      name: "TLcom Capital", 
      logo: "/TLcom.png",
      url: "https://tlcom.vc",
      description: "African-focused VC fund"
    },
    { 
      name: "Partech Partners", 
      logo: "/Partech_Logo.png",
      url: "https://partechpartners.com",
      description: "Global technology investment firm"
    },
    { 
      name: "4DX Ventures", 
      logo: "/logo 4dx.svg",
      url: "https://4dxventures.com",
      description: "Pan-African venture capital"
    },
    { 
      name: "Future Africa", 
      logo: "/future africa.jpg",
      url: "https://future.africa",
      description: "African startup ecosystem builder"
    }
  ];


  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Across Africa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who are building wealth and supporting communities through Beelio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl overflow-hidden">
                  {testimonial.avatar.startsWith('/') ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    testimonial.avatar
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-gray-400">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-primary-600 rounded-2xl p-8 mb-16 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">15,000+</div>
              <div className="text-primary-100">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">$5M+</div>
              <div className="text-primary-100">Loans Facilitated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98.5%</div>
              <div className="text-primary-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">12%</div>
              <div className="text-primary-100">Avg. Returns</div>
            </div>
          </div>
        </div>

        {/* Investors */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Building the Future of African Finance
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Inspired by leading organizations in the African fintech ecosystem
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {inspiration.map((org, index) => (
              <motion.a
                key={index}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary-200 dark:group-hover:border-primary-700 border border-gray-200 dark:border-gray-700">
                  <div className="h-12 flex items-center justify-center mb-3">
                    <img 
                      src={org.logo} 
                      alt={`${org.name} logo`}
                      className="max-h-8 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'block';
                          }
                        }}
                    />
                    <div className="text-gray-500 dark:text-gray-400 font-medium text-sm hidden">
                      {org.name}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          <motion.p 
            className="text-gray-500 dark:text-gray-400 text-sm text-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Inspired by top-tier organizations focused on African fintech innovation
          </motion.p>
        </motion.div>


        {/* Trust Badges */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Trusted & Secure
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm text-gray-600">SSL Secured</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🛡️</div>
              <div className="text-sm text-gray-600">Bank-Grade Security</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm text-gray-600">Regulated Platform</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm text-gray-600">Award Winning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
