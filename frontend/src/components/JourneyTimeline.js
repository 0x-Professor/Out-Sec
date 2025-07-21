import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

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
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
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
    <section id="journey" className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 -right-10 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-medium animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-slow animation-delay-4000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-cyan-400 bg-cyan-900/30 rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            OUR JOURNEY
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Our <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Journey</span> So Far
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            From our humble beginnings to becoming a leader in cybersecurity innovation.
            Every milestone tells a story of growth, challenges, and success.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          ref={timelineRef}
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Animated timeline line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform -translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/30 to-transparent opacity-30"></div>
          </motion.div>
          
          {/* Timeline items */}
          <div className="space-y-20 md:space-y-32">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  custom={index}
                >
                  {/* Content */}
                  <motion.div 
                    className={`w-full md:w-[45%] mb-8 md:mb-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}
                    whileHover="hover"
                    variants={cardVariants}
                    onHoverStart={() => setActiveIndex(index)}
                    onHoverEnd={() => setActiveIndex(-1)}
                  >
                    <div className={`relative p-8 bg-gray-800/60 backdrop-blur-md rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? 'ring-2 ring-cyan-500/50' : ''
                    }`}>
                      {/* Glow effect */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${milestone.color} rounded-3xl opacity-0 transition-all duration-500 ${
                        activeIndex === index ? 'opacity-30' : 'group-hover:opacity-20'
                      } blur-xl`}></div>
                      
                      <div className="relative">
                        {/* Mobile icon */}
                        <div className={`absolute -left-14 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r ${milestone.color} text-white font-bold shadow-lg md:hidden`}>
                          {milestone.icon}
                        </div>
                        
                        {/* Year badge */}
                        <div className="absolute -top-4 right-0">
                          <span className={`inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r ${milestone.color} text-white shadow-lg`}>
                            {milestone.year}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{milestone.title}</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">{milestone.description}</p>
                        
                        <ul className="space-y-3 mt-6">
                          {milestone.achievements.map((achievement, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start group"
                              whileHover={{ x: 5 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                              <span className="flex-shrink-0 mt-1 mr-3 text-cyan-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              </span>
                              <span className="text-gray-300">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Center dot */}
                  <motion.div 
                    className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-gray-700 z-10 shadow-2xl transition-all duration-300 hover:scale-110"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: `0 0 30px -5px ${milestone.color.split(' ')[1].replace('to-', '#').replace(/-500/, '')}80`
                    }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-gradient-to-r ${milestone.color} text-white shadow-lg`}
                      animate={activeIndex === index ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {milestone.icon}
                    </motion.div>
                  </motion.div>
                  
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
        </motion.div>
        
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
