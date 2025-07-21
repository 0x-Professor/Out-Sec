import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-tsparticles';

const services = [
  {
    title: "Cryptography Integration",
    description: "Advanced encryption solutions with quantum-resistant algorithms",
    icon: "🔒",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Malware Analysis",
    description: "Expert analysis and development of security solutions",
    icon: "🛡️",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Blockchain Security",
    description: "Secure blockchain and smart contract development",
    icon: "⛓️",
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Penetration Testing",
    description: "Comprehensive security testing for networks and applications",
    icon: "🎯",
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Cloud Security",
    description: "End-to-end security for cloud infrastructure",
    icon: "☁️",
    color: "from-pink-500 to-violet-500"
  },
  {
    title: "Threat Intelligence",
    description: "Proactive threat detection and response",
    icon: "🔍",
    color: "from-cyan-500 to-blue-500"
  }
];

const ServiceCard = ({ service, index, scrollYProgress }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate position in viewport with spring physics for smoother motion
  const yRange = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.3, 0.7, 1],
      [index % 2 === 0 ? 50 : -50, 0, 0, index % 2 === 0 ? -50 : 50]
    ),
    { stiffness: 300, damping: 30 }
  );
  
  // More refined opacity with smooth entry and exit
  const opacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.1, 0.2, 0.8, 0.9, 1],
      [0, 0.5, 1, 1, 0.5, 0]
    ),
    { stiffness: 100, damping: 20 }
  );
  
  // Scale with more subtle animation
  const scale = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.1, 0.2, 0.8, 0.9, 1],
      [0.9, 0.95, 1, 1, 0.95, 0.9]
    ),
    { stiffness: 200, damping: 20 }
  );
  
  // Subtle rotation effect
  const rotate = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [index % 2 === 0 ? -2 : 2, 0, index % 2 === 0 ? 2 : -2]
    ),
    { stiffness: 100, damping: 20 }
  );
  
  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-2xl mx-auto mb-16`}
      style={{
        y: yRange,
        opacity,
        scale,
        rotate,
        zIndex: isVisible ? 10 : 1,
      }}
      onViewportEnter={() => setIsVisible(true)}
      onViewportLeave={() => setIsVisible(false)}
      viewport={{ margin: "-20% 0px -20% 0px" }}
    >
      <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${service.color} bg-opacity-10 backdrop-blur-lg border border-white/10 shadow-2xl overflow-hidden`}>
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center text-2xl mb-6">
            {service.icon}
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            {service.title}
          </h3>
          
          <p className="text-gray-300 mb-6">
            {service.description}
          </p>
          
          <motion.button
            className="px-6 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        </div>
        
        {/* Animated elements */}
        <motion.div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/5 backdrop-blur-sm"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

const EnhancedServices = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };
  
  // Fade in/out effect for the entire section
  const sectionOpacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.1, 0.9, 1],
      [0, 1, 1, 0]
    ),
    { stiffness: 100, damping: 20 }
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [inViewRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Auto-rotate active service
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.section 
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black"
      style={{ opacity: sectionOpacity }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Scroll indicator */}
      <div className="hidden md:block fixed right-10 top-1/2 transform -translate-y-1/2 z-20">
        <motion.div 
          className="w-2 h-48 bg-white/10 rounded-full"
          initial={{ height: 0 }}
          animate={{ height: '192px' }}
          transition={{ duration: 1 }}
        />
        <div className="flex flex-col items-center space-y-2 mt-4">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <span className="text-xs text-white/30">Scroll</span>
        </div>
      </div>
      {/* Enhanced background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Parallax elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl" style={{
            transform: `translateY(${scrollYProgress.get() * 100}px)`
          }}></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl" style={{
            transform: `translateY(${scrollYProgress.get() * -100}px)`
          }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl" style={{
            transform: `translateY(${scrollYProgress.get() * 50}px)`
          }}></div>
        </div>

        {/* Particle background */}
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "transparent"
              }
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push"
                },
                onHover: {
                  enable: true,
                  mode: "repulse"
                },
                resize: true
              },
              modes: {
                push: {
                  quantity: 4
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: "#00ffff"
              },
              links: {
                color: "#00ffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce"
                },
                random: false,
                speed: 2,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  area: 800
                },
                value: 80
              },
              opacity: {
                value: 0.5
              },
              shape: {
                type: "circle"
              },
              size: {
                value: { min: 1, max: 5 }
              }
            },
            detectRetina: true
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Cutting-edge security solutions tailored to your needs
          </p>
        </motion.div>
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span 
            className="inline-flex items-center px-6 py-2 text-sm font-semibold text-cyan-400 bg-cyan-900/30 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            OUR SERVICES
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Cutting-Edge <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Security</span> Solutions
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Innovative security services designed to protect your digital assets in an evolving threat landscape.
          </motion.p>
        </div>
        
        {/* Services Grid */}
        <div ref={scrollRef} className="relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-800/50 rounded-2xl p-6 animate-pulse"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="h-16 w-16 rounded-full bg-gray-700 mb-4"></div>
                  <div className="h-4 bg-gray-700 w-48 mb-2"></div>
                  <div className="h-3 bg-gray-700 w-64 mb-4"></div>
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-24 bg-gray-700 rounded-full"></div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              {services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  service={service} 
                  index={index} 
                  scrollYProgress={scrollYProgress} 
                />
              ))}
            </AnimatePresence>
          )}
          
          {/* Active indicator */}
          <motion.div 
            className="hidden md:block fixed right-10 top-1/2 transform -translate-y-1/2 z-20"
            initial={{ opacity: 0, x: 40 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.5 }
            }}
          >
            <div className="flex flex-col items-center space-y-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    document.querySelector(`#service-${index}`)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  className="w-3 h-3 rounded-full bg-white/20 transition-all relative"
                >
                  {activeIndex === index && (
                    <motion.span
                      className="absolute inset-0 bg-white rounded-full"
                      layoutId="activeDot"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EnhancedServices;
