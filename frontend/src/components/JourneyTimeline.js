import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const JourneyTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Out-Sec was established with a vision to revolutionize cybersecurity solutions with cutting-edge technology and innovative approaches.',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-400',
      achievements: [
        'Launched with 5 cybersecurity experts',
        'Developed proprietary threat detection algorithms',
        'Secured first round of funding'
      ]
    },
    {
      year: '2021',
      title: 'First Major Breakthrough',
      description: 'Successfully prevented a major cyber attack on a financial institution, establishing our reputation in the industry.',
      icon: '🏆',
      color: 'from-purple-500 to-pink-500',
      achievements: [
        'Protected 50+ enterprise clients',
        'Expanded team to 25 security experts',
        'Achieved 99.99% threat detection rate'
      ]
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Opened international offices and established partnerships with leading tech companies worldwide.',
      icon: '🌐',
      color: 'from-green-500 to-emerald-400',
      achievements: [
        'Expanded to 3 continents',
        'Partnered with Fortune 500 companies',
        'Launched AI-powered security suite'
      ]
    },
    {
      year: '2023',
      title: 'Innovation Leader',
      description: 'Recognized as an industry leader in cybersecurity innovation and threat intelligence.',
      icon: '💡',
      color: 'from-yellow-500 to-orange-500',
      achievements: [
        'Awarded "Most Innovative Security Company"',
        'Patented 5 new security technologies',
        'Grew to 100+ employees'
      ]
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Continuing to push boundaries in cybersecurity with quantum computing and AI integration.',
      icon: '🔮',
      color: 'from-pink-500 to-violet-500',
      achievements: [
        'Pioneering quantum encryption',
        'Expanding AI threat prediction',
        'Global security initiative'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <section id="journey" className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold text-cyan-400 bg-cyan-900/30 rounded-full mb-4">
            OUR JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Milestones of <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tracing our path from humble beginnings to becoming industry leaders in cybersecurity innovation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div 
          ref={timelineRef}
          className="relative max-w-5xl mx-auto"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform -translate-x-1/2"></div>
          
          {/* Timeline items */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const delay = index * 0.15;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                  {/* Content */}
                  <div 
                    className={`w-full md:w-5/12 mb-6 md:mb-0 ${isEven ? 'md:pr-12' : 'md:pl-12'} transition-all duration-300 ${activeIndex === index ? 'scale-105' : ''}`}
                  >
                    <motion.div 
                      className={`relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden group ${activeIndex === index ? 'ring-2 ring-cyan-500/30' : ''}`}
                      whileHover={{ 
                        y: -5,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${milestone.color} rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-300 group-hover:duration-200`}></div>
                      
                      <div className="relative">
                        <div className={`absolute -left-12 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r ${milestone.color} text-white font-bold shadow-lg md:hidden`}>
                          {milestone.icon}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-300 mb-4">{milestone.description}</p>
                        
                        <ul className="space-y-2 mt-4">
                          {milestone.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-cyan-400 mr-2">✓</span>
                              <span className="text-gray-300">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-700/50 text-cyan-400">
                            {milestone.year}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-gray-700 z-10 shadow-xl transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      '--tw-gradient-from': `rgba(17, 24, 39, 0.9)`,
                      '--tw-gradient-to': `rgba(31, 41, 55, 0.9)`,
                    }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-r ${milestone.color} text-white shadow-lg`}>
                      {milestone.icon}
                    </div>
                  </div>
                  
                  {/* Year (desktop) */}
                  <div className="hidden md:block w-5/12">
                    <div className={`h-full flex items-center ${isEven ? 'justify-start pl-12' : 'justify-end pr-12'}`}>
                      <motion.div 
                        className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${milestone.color} opacity-10`}
                        initial={{ opacity: 0.1 }}
                        animate={activeIndex === index ? { opacity: 0.2, scale: 1.1 } : { opacity: 0.1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {milestone.year}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Animated elements */}
          {isVisible && (
            <>
              <motion.div 
                className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 transform -translate-x-1/2"
                initial={{ scaleY: 0, opacity: 0.5 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.div 
                className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 opacity-50"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.5 }}
                transition={{ duration: 2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              />
            </>
          )}
        </div>
        
        {/* CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Ready to be part of our journey?</h3>
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1">
            Contact Us Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
