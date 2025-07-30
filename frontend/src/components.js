import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import JourneyTimeline from './components/JourneyTimeline';
import EnhancedServices from './components/EnhancedServices';
import { Play, Shield, ChevronRight } from 'lucide-react';
import HackerScene3D from './components/HackerScene3D';

// SVG Icons Component
const SVGIcon = ({ type, className = "w-6 h-6" }) => {
  const icons = {
    security: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    malware: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    blockchain: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    network: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    iot: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    crypto: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    penetration: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    soc: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    cloud: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    play: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    work: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
      </svg>
    ),
    monitor: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    ai: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    quantum: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a8.973 8.973 0 008.354-5.646z" />
      </svg>
    ),
    chevronDown: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    )
  };

  return icons[type] || icons.security;
};

// Progress Bar Component
const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercentage = (scrolled / maxHeight) * 100;
      setProgress(progressPercentage);
    };

    // Use requestAnimationFrame for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { passive: true });
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-50"
      style={{ width: `${progress}%` }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

// Smooth Typing Animation Component
const SmoothTypingAnimation = ({ text, className = "", highlight = [] }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  const renderText = () => {
    let result = displayText;
    highlight.forEach(word => {
      result = result.replace(
        new RegExp(`\\b${word}\\b`, 'g'),
        `<span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">${word}</span>`
      );
    });
    return result;
  };

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: renderText() }}
    />
  );
};

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 animate-pulse-slow" />
      
      {/* Floating abstract shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-40 w-48 h-48 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 4
        }}
      />
      
      {/* Subtle matrix-style animation with very low opacity */}
      <div className="absolute inset-0 opacity-5">
        <div className="matrix-bg"></div>
      </div>
    </div>
  );
};

// Feature Indicator Component
const FeatureIndicator = ({ icon, text, delay = 0 }) => {
  return (
    <motion.div
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          delay: delay * 0.5
        }}
      />
      <span className="text-sm font-medium">{text}</span>
    </motion.div>
  );
};

// Scroll Indicator Component
const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <motion.div
        className="text-gray-400 text-sm font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll to explore
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <SVGIcon type="chevronDown" className="w-6 h-6 text-gray-400" />
      </motion.div>
    </motion.div>
  );
};

// Scroll Reveal Hook
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Clean Header Component
export const Header = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'security' },
    { id: 'about', label: 'About', icon: 'network' },
    { id: 'services', label: 'Services', icon: 'crypto' },
    { id: 'team', label: 'Team', icon: 'soc' },
    { id: 'projects', label: 'Projects', icon: 'work' },
    { id: 'blog', label: 'Blog', icon: 'penetration' },
    { id: 'testimonials', label: 'Testimonials', icon: 'star' },
    { id: 'contact', label: 'Contact', icon: 'iot' }
  ];

  return (
    <>
      <ProgressBar />
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer" 
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white font-bold text-lg">OS</span>
                  <img src = "C:\Users\PROFESSOR\AppData\Local\Microsoft\Windows\INetCache\IE\AG5X2U2L\Secureout-removebg-preview_(1)[1].png" alt = "OutSecure Logo" className="absolute inset-0 w-full h-full object-cover rounded-xl"/>
                </motion.div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  OutSecure
                </h1>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  Bitwise Security
                </p>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg group ${
                    activeSection === item.id
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <SVGIcon 
                      type={item.icon} 
                      className="w-4 h-4 transition-colors" 
                    />
                    <span>{item.label}</span>
                  </div>
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                      layoutId="activeTab"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            <motion.button 
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="space-y-1"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.div 
                  className="w-6 h-0.5 bg-white"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="w-6 h-0.5 bg-white"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="w-6 h-0.5 bg-white"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden mt-4 bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center space-x-3 w-full text-left py-3 text-gray-300 hover:text-white transition-colors rounded-lg px-3 hover:bg-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <SVGIcon type={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
};



// Stats Counter Component
const StatsCounter = () => {
  const stats = [
    { number: "99.9", suffix: "%", label: "Uptime" },
    { number: "500", suffix: "+", label: "Clients" },
    { number: "50", suffix: "M+", label: "Threats Blocked" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="flex justify-center space-x-8 mt-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
        >
          <div className="relative">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-300 transition-all duration-300">
              {stat.number}<span className="text-2xl">{stat.suffix}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-300/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>
          <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Modern Hero Component with 3D Hacker Scene
export const Hero = () => {
  const [ref, isVisible] = useScrollReveal();
  const [showElements, setShowElements] = useState({
    image: false,
    badge: false,
    heading: false,
    description: false,
    buttons: false,
    stats: false
  });

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setShowElements(s => ({...s, image: true})), 300);
    const timer2 = setTimeout(() => setShowElements(s => ({...s, badge: true})), 600);
    const timer3 = setTimeout(() => setShowElements(s => ({...s, heading: true})), 900);
    const timer4 = setTimeout(() => setShowElements(s => ({...s, description: true})), 1200);
    const timer5 = setTimeout(() => setShowElements(s => ({...s, buttons: true})), 1500);
    const timer6 = setTimeout(() => setShowElements(s => ({...s, stats: true})), 1800);

    return () => {
      [timer1, timer2, timer3, timer4, timer5, timer6].forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleExploreWork = () => {
    const element = document.getElementById('services');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    // Show coming soon message
    alert('This functionality will be available soon!');
  };

  // Animated background elements
  const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]">
        </div>
      </div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]">
      </div>
      
      {/* Animated dots for cyberpunk feel */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              boxShadow: '0 0 15px 2px rgba(96, 165, 250, 0.5)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );

  // Stats item component
  const StatItem = ({ value, label, delay }) => (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={showElements.stats ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-blue-300 uppercase tracking-wider">{label}</div>
    </motion.div>
  );

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
    >
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-16 lg:mb-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showElements.badge ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20">
                <span className="text-sm font-medium text-blue-300 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  SECURITY SOLUTIONS
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={showElements.heading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Secure Your Digital
              </span>
              <br />
              <span className="text-white">Infrastructure</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showElements.description ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-300 mb-8 max-w-lg"
            >
              We provide cutting-edge cybersecurity solutions to protect your business from evolving digital threats. Our expert team ensures your data remains secure 24/7.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={showElements.buttons ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <button 
                onClick={handleExploreWork}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={handleWatchDemo}
                className="px-8 py-4 bg-transparent border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider group"
                title="Coming soon"
              >
                <Play className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right Column - 3D Hacker Scene */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={showElements.image ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-gray-900/50 to-blue-900/30 backdrop-blur-sm">
              {/* 3D Hacker Scene */}
              <HackerScene3D />
              
              {/* Cyberpunk frame overlay */}
              <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 pointer-events-none">
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400"></div>
              </div>
              
              {/* Status indicators */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
              </div>
              
              {/* Loading text overlay for first load */}
              <div className="absolute bottom-4 right-4 text-xs text-cyan-400 font-mono opacity-70">
                RENDERING 3D SCENE...
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced About Component with Timeline
export const About = () => {
  const [ref, isVisible] = useScrollReveal();
  const [stats, setStats] = useState({ audits: 0, monitoring: 0, clients: 0, threats: 0 });
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const timeline = [
    { year: '2020', title: 'Foundation', description: 'OutSecure was founded with a vision to revolutionize cybersecurity' },
    { year: '2021', title: 'First Major Client', description: 'Secured first enterprise client, protecting 10,000+ devices' },
    { year: '2022', title: 'Team Expansion', description: 'Grew team to 13 cybersecurity experts across various domains' },
    { year: '2023', title: 'AI Integration', description: 'Launched AI-powered threat detection and response systems' },
    { year: '2024', title: 'Global Reach', description: 'Expanded operations globally, serving 150+ clients worldwide' }
  ];

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;
      
      const targets = { audits: 500, monitoring: 24, clients: 150, threats: 1247 };
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          audits: Math.floor(targets.audits * progress),
          monitoring: Math.floor(targets.monitoring * progress),
          clients: Math.floor(targets.clients * progress),
          threats: Math.floor(targets.threats * progress)
        });
        
        if (step >= steps) clearInterval(timer);
      }, increment);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveTimelineItem((prev) => (prev + 1) % timeline.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible, timeline.length]);

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid-12 gap-16 items-center">
          <div className={`col-12 lg:col-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} ref={ref}>
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <SVGIcon type="security" className="w-4 h-4 inline mr-2" />
                ABOUT OutSecure
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Securing Systems with<br />
                <span className="gradient-text">Strategic Insight</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                OutSecure is a comprehensive cybersecurity platform designed to protect digital 
                assets from modern threats. We combine advanced encryption, real-time threat 
                detection, and robust user authentication to ensure secure operations.
              </p>
              <p>
                With a focus on usability and reliability, OutSecure offers tools like 
                vulnerability scanning and detailed security analytics, providing users with actionable 
                insights for safeguarding their systems.
              </p>
            </div>
            
            <div className="grid-12 gap-4 mt-12">
              <div className="col-3 glass-card p-6 text-center card-interactive">
                <h3 className="text-3xl font-bold gradient-text mb-2">{stats.audits}+</h3>
                <p className="text-gray-400 text-sm">Security Audits</p>
              </div>
              <div className="col-3 glass-card p-6 text-center card-interactive">
                <h3 className="text-3xl font-bold gradient-text mb-2">{stats.monitoring}/7</h3>
                <p className="text-gray-400 text-sm">Threat Monitoring</p>
              </div>
              <div className="col-3 glass-card p-6 text-center card-interactive">
                <h3 className="text-3xl font-bold gradient-text mb-2">{stats.clients}+</h3>
                <p className="text-gray-400 text-sm">Clients Protected</p>
              </div>
              <div className="col-3 glass-card p-6 text-center card-interactive">
                <h3 className="text-3xl font-bold gradient-text mb-2">{stats.threats}</h3>
                <p className="text-gray-400 text-sm">Threats Blocked</p>
              </div>
            </div>
          </div>
          
          <div className={`col-12 lg:col-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-8">
              <JourneyTimeline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Component using EnhancedServices
export const Services = () => {
  return <EnhancedServices />;
};

// Enhanced Team Component
export const Team = () => {
  const [ref, isVisible] = useScrollReveal();
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Mohsin Mukhtiar Lashari",
      role: "Founder & CEO",
      specialization: "Network Security / Malware Analysis / SOC",
      image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85",
      expertise: ["Network Security", "Malware Analysis", "SOC Operations"],
      experience: "10+ years",
      bio: "Visionary leader with over a decade of experience in cybersecurity. Specializes in advanced threat detection and security operations center management."
    },
    {
      name: "Ali Ejaz",
      role: "CEO",
      specialization: "Malware Developer / Analyst, Blockchain Expert / SEO Expert",
      image: "https://images.unsplash.com/photo-1589935447067-5531094415d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxzZWN1cml0eXxlbnwwfHx8Ymx1ZXwxNzUyNjQ5NjIwfDA&ixlib=rb-4.1.0&q=85",
      expertise: ["Malware Development", "Blockchain", "SEO"],
      experience: "8+ years",
      bio: "Expert in malware analysis and blockchain security with strong technical leadership skills and digital marketing expertise."
    },
    {
      name: "Khizar Ali Shah",
      role: "Co-founder / COO",
      specialization: "Hardware & IoT Security Expert / Blockchain Expert / Reverse Engineer",
      image: "https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg",
      expertise: ["Hardware Security", "IoT Security", "Reverse Engineering"],
      experience: "9+ years",
      bio: "Pioneering expert in hardware security and IoT protection with deep knowledge of reverse engineering and secure system design."
    },
    {
      name: "Mazhar Saeed",
      role: "Co-founder / CTO",
      specialization: "Web Application Security Expert / Blockchain Developer",
      image: "https://images.unsplash.com/photo-1660644808226-a5b2e691fc51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85",
      expertise: ["Web Security", "Blockchain Development", "System Architecture"],
      experience: "7+ years",
      bio: "Technical architect specializing in web application security and blockchain technology with extensive development experience."
    },
    {
      name: "Wahab Khan",
      role: "Co-founder / Lead Security Engineer",
      specialization: "Hardware Security Expert / Binary Exploitation Expert / Network Security Expert",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85",
      expertise: ["Hardware Security", "Binary Exploitation", "Network Security"],
      experience: "8+ years",
      bio: "Advanced security engineer with expertise in low-level system security, binary exploitation, and network defense strategies."
    },
    {
      name: "Talha Bilal",
      role: "CFO",
      specialization: "Hardware Security Expert / Firmware Analyst / Reverse Engineer",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85",
      expertise: ["Hardware Security", "Firmware Analysis", "Reverse Engineering"],
      experience: "6+ years",
      bio: "Financial operations expert with deep technical background in hardware security and firmware analysis."
    }
  ];

  return (
    <section id="team" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 cyber-glow animate-cyber-pulse">
              <SVGIcon type="soc" className="w-4 h-4 inline mr-2 animate-neon-flicker" />
              CYBER TEAM
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Elite <span className="hologram-text">Security</span> Specialists
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Advanced cybersecurity experts pioneering the future of digital defense
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
              <div 
                className="h-full glass-card p-4 sm:p-5 card-interactive cursor-pointer transition-all duration-500 flex flex-col"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 0.2}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
                }}
                onClick={() => setSelectedMember(member)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl mb-4 group flex-shrink-0 aspect-video">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1">
                      <p className="text-white font-medium text-xs sm:text-sm truncate">{member.experience}</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 line-clamp-1">{member.name}</h3>
                  <p className="text-cyan-400 font-medium text-xs sm:text-sm mb-2">{member.role}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow">{member.specialization}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] sm:text-xs border border-cyan-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 3 && (
                      <span className="text-gray-400 text-xs flex items-center">
                        +{member.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Member Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card max-w-2xl w-full p-8 relative">
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name}
                  className="w-32 h-32 rounded-2xl object-cover mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedMember.name}</h3>
                  <p className="text-blue-400 font-medium mb-4">{selectedMember.role}</p>
                  <p className="text-gray-300 mb-6">{selectedMember.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {selectedMember.expertise.map((skill, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Enhanced Projects Component
export const Projects = () => {
  const [ref, isVisible] = useScrollReveal();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      title: "Enterprise Security Audit",
      description: "Comprehensive security assessment for a Fortune 500 company",
      category: "Security Audit",
      technologies: ["Penetration Testing", "Vulnerability Assessment", "Security Analysis"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk2MjB8MA&ixlib=rb-4.1.0&q=85",
      status: "Completed"
    },
    {
      title: "Blockchain Security Platform",
      description: "Custom blockchain security solution for DeFi applications",
      category: "Blockchain",
      technologies: ["Solidity", "Smart Contracts", "Web3"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxibG9ja2NoYWlufGVufDB8fHxibHVlfDE3NTI2NDk2MjB8MA&ixlib=rb-4.1.0&q=85",
      status: "In Progress"
    },
    {
      title: "IoT Device Security",
      description: "Securing connected devices in smart home ecosystems",
      category: "IoT Security",
      technologies: ["Hardware Security", "Firmware Analysis", "Network Security"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpb3R8ZW58MHx8fGJsdWV8MTc1MjY0OTYyMHww&ixlib=rb-4.1.0&q=85",
      status: "Completed"
    }
  ];

  const categories = ['all', 'Security Audit', 'Blockchain', 'IoT Security'];

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  );

  return (
    <section id="projects" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 cyber-glow animate-cyber-pulse">
              <SVGIcon type="work" className="w-4 h-4 inline mr-2 animate-neon-flicker" />
              CYBER PROJECTS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Advanced <span className="hologram-text">Security</span> Deployments
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Cutting-edge cybersecurity implementations and breakthrough solutions
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-scale border ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white border-cyan-500/50 cyber-glow'
                  : 'cyber-card text-gray-300 hover:text-white border-gray-600/30 hover:border-cyan-500/50'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap -mx-2">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6"
            >
              <div 
                className="h-full glass-card p-4 sm:p-5 card-interactive transition-all duration-500 flex flex-col"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 0.15}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl mb-4 group flex-shrink-0 aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] xs:text-xs font-medium backdrop-blur-sm ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1">
                      <p className="text-white font-medium text-xs sm:text-sm truncate">{project.title}</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <p className="text-cyan-400 font-medium text-xs sm:text-sm mb-2">{project.category}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] sm:text-xs border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-700/50 text-gray-400 px-2 py-0.5 rounded-full text-[10px] xs:text-xs border border-gray-600/30">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                
                  <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 hover-scale cyber-glow">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Blog Component with Markdown Support
export const Blog = () => {
  // State management
  const [state, setState] = useState({
    posts: [],
    filteredPosts: [],
    visiblePosts: [],
    currentPage: 1,
    selectedCategory: 'all',
    searchTerm: '',
    isLoading: true
  });
  
  const { posts, filteredPosts, visiblePosts, currentPage, selectedCategory, searchTerm, isLoading } = state;
  const postsPerPage = 6;
  const navigate = useNavigate();
  const blogRef = useRef(null);
  const observer = useRef(null);
  const loadingRef = useRef(false);
  
  // Define available categories
  const allCategories = [
    { id: 'all', name: 'All' },
    { id: 'security', name: 'Security' },
    { id: 'cyber', name: 'Cyber Security' },
    { id: 'privacy', name: 'Privacy' },
    { id: 'hacking', name: 'Hacking' },
  ];

  // Update state helper
  const updateState = (updates) => {
    setState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Fetch posts with error handling and caching
  useEffect(() => {
    const fetchPosts = async () => {
      if (loadingRef.current) return;
      
      loadingRef.current = true;
      updateState({ isLoading: true });
      
      try {
        // Check cache first
        const cachedPosts = sessionStorage.getItem('cachedPosts');
        const cacheTime = sessionStorage.getItem('cachedPostsTime');
        const isCacheValid = cacheTime && (Date.now() - parseInt(cacheTime, 10)) < 5 * 60 * 1000; // 5 min cache
        
        if (cachedPosts && isCacheValid) {
          const data = JSON.parse(cachedPosts);
          updateState({
            posts: data,
            filteredPosts: data,
            isLoading: false
          });
          return;
        }
        
        // Fetch from API
        const response = await fetch('/posts.json');
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        let data = await response.json();
        if (!Array.isArray(data)) {
          console.error('Expected posts.json to be an array');
          data = [];
        }
        
        // Sort and cache
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        sessionStorage.setItem('cachedPosts', JSON.stringify(data));
        sessionStorage.setItem('cachedPostsTime', Date.now().toString());
        
        updateState({
          posts: data,
          filteredPosts: data,
          isLoading: false
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Try to use cache even if stale
        const cachedPosts = sessionStorage.getItem('cachedPosts');
        if (cachedPosts) {
          const data = JSON.parse(cachedPosts);
          updateState({
            posts: data,
            filteredPosts: data,
            isLoading: false
          });
        } else {
          updateState({ isLoading: false });
        }
      } finally {
        loadingRef.current = false;
      }
    };

    fetchPosts();
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Filter posts with debounce
  useEffect(() => {
    const filterPosts = () => {
      let filtered = [...posts];
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(post => 
          (post.title && post.title.toLowerCase().includes(term)) || 
          (post.excerpt && post.excerpt.toLowerCase().includes(term)) ||
          (post.content && post.content.toLowerCase().includes(term))
        );
      }
      
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(post => 
          post.categories && 
          (Array.isArray(post.categories) 
            ? post.categories.includes(selectedCategory)
            : post.categories === selectedCategory)
        );
      }
      
      updateState({
        filteredPosts: filtered,
        currentPage: 1,
        visiblePosts: filtered.slice(0, postsPerPage)
      });
    };
    
    const debounceTimer = setTimeout(filterPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory, posts, postsPerPage]);

  // Handle infinite scroll
  useEffect(() => {
    if (!filteredPosts.length || visiblePosts.length >= filteredPosts.length) return;
    
    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        const nextPage = currentPage + 1;
        const nextVisiblePosts = filteredPosts.slice(0, nextPage * postsPerPage);
        updateState({
          currentPage: nextPage,
          visiblePosts: nextVisiblePosts
        });
      }
    };
    
    observer.current = new IntersectionObserver(handleIntersect, options);
    
    const currentRef = blogRef.current?.lastElementChild;
    if (currentRef) {
      observer.current.observe(currentRef);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [filteredPosts, visiblePosts.length, currentPage, postsPerPage]);
  
  const handleReadMore = useCallback((postId) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      navigate(`/blog/${postId}`);
    }, 100);
  }, [navigate]);

  if (isLoading) {
    return (
      <section id="blog" className="py-24 bg-black relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white">Loading posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-black/20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SVGIcon type="security" className="w-4 h-4 inline mr-2" />
            LATEST INSIGHTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cybersecurity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Blog</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest trends, threats, and best practices in cybersecurity
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              />
              <SVGIcon type="search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black/30 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
            >
              {allCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post, index) => (
              <motion.div
                key={post.id || index}
                ref={index === visiblePosts.length - 1 ? (el) => {
                  // Only set the last element as the intersection target
                  if (el && observer.current) {
                    observer.current.disconnect();
                    observer.current.observe(el);
                  }
                } : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full mb-2">
                      {post.categories?.[0] || 'Security'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="mx-2">•</span>
                    <span>{Math.ceil((post.content || '').split(' ').length / 200)} min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '4.5rem'
                  }}>
                    {post.excerpt || post.content?.substring(0, 150) + '...'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories?.slice(0, 3).map((cat, catIndex) => (
                      <span 
                        key={catIndex} 
                        className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-2 py-0.5 rounded-full text-xs border border-cyan-500/30"
                      >
                        {cat}
                      </span>
                    ))}
                    {post.categories?.length > 3 && (
                      <span className="bg-gray-700/50 text-gray-400 px-2 py-0.5 rounded-full text-xs">
                        +{post.categories.length - 3}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleReadMore(post.id || index)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Read Article
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-blue-400 hover:text-white transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Loading indicator for infinite scroll */}
        {visiblePosts.length > 0 && visiblePosts.length < filteredPosts.length && (
          <div className="flex justify-center mt-12">
            <div className="animate-pulse flex space-x-4 items-center">
              <div className="h-3 w-3 bg-blue-400 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-400 rounded-full delay-100"></div>
              <div className="h-3 w-3 bg-blue-400 rounded-full delay-200"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Enhanced Contact Component
export const Contact = () => {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowSuccess(true);
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: "crypto",
      label: "Email",
      value: "contact@out-sec.org",
      subvalue: "Contact Email"
    },
    {
      icon: "network",
      label: "Phone",
      value: "+92 (340) 1900907",
      subvalue: "24/7 Emergency Line"
    },
    {
      icon: "iot",
      label: "Website",
      value: "www.out-sec.org",
      subvalue: "Visit our main site"
    },
    {
      icon: "soc",
      label: "Office",
      value: "Cybersecurity Hub",
      subvalue: "Remote & Global"
    }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ), 
      url: 'https://www.linkedin.com/company/out-sec',
      color: 'text-blue-500 hover:text-blue-400'
    },
    { 
      name: 'GitHub', 
      icon: (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ), 
      url: 'https://github.com/out-sec',
      color: 'text-purple-500 hover:text-purple-400'
    },
    { 
      name: 'Twitter', 
      icon: (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ), 
      url: 'https://twitter.com/out_sec',
      color: 'text-cyan-400 hover:text-cyan-300'
    },
    { 
      name: 'Discord', 
      icon: (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      url: 'https://discord.gg/outsec',
      color: 'text-indigo-400 hover:text-indigo-300'
    }
  ];

  return (
    <section id="contact" className="py-24 gradient-bg-animated relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <SVGIcon type="security" className="w-4 h-4 inline mr-2" />
              GET IN TOUCH
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to <span className="gradient-text">Secure</span> Your Future?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Contact our cybersecurity experts today and let's build a safer digital world together
            </p>
          </div>
        </div>
        
        <div className="grid-12 gap-16">
          {/* Contact Information */}
          <div className={`col-12 lg:col-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-3xl font-bold text-white mb-8">Let's Connect</h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 glass-card p-4 card-interactive">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <SVGIcon type={info.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                    <p className="text-white font-semibold">{info.value}</p>
                    <p className="text-gray-400 text-sm">{info.subvalue}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
              <div className="flex space-x-6 mt-8 justify-center">
                {socialLinks.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative ${platform.color} transition-all duration-300`}
                    aria-label={platform.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <span className="relative z-10">
                      {platform.icon}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`col-12 lg:col-7 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Send Us a Message</h3>
              
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-green-400 font-medium">Thank you! Your message has been sent successfully.</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid-12 gap-6">
                  <div className="col-12 md:col-6">
                    <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="col-12 md:col-6">
                    <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-gray-400 text-sm font-medium mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-gray-400 text-sm font-medium mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="penetration-testing">Penetration Testing</option>
                    <option value="malware-analysis">Malware Analysis</option>
                    <option value="blockchain-security">Blockchain Security</option>
                    <option value="iot-security">IoT Security</option>
                    <option value="cryptography">Cryptography Integration</option>
                    <option value="soc">Security Operations Center</option>
                    <option value="consultation">Security Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300 resize-none"
                    placeholder="Tell us about your cybersecurity needs..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover-scale ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="loading-spinner w-5 h-5 mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer Component
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    Services: [
      'Penetration Testing',
      'Malware Analysis',
      'Blockchain Security',
      'IoT Security',
      'Cryptography',
      'Security Consultation'
    ],
    Company: [
      'About Us',
      'Our Team',
      'Projects',
      'Blog',
      'Contact',
      'Careers'
    ],
    Resources: [
      'Documentation',
      'Case Studies',
      'Security Tools',
      'Research Papers',
      'Whitepapers',
      'API Reference'
    ]
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/out-sec',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-gray-800 to-gray-900',
      hoverColor: 'hover:from-gray-700 hover:to-gray-800'
    },
    { 
      name: 'Twitter', 
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      color: 'from-blue-400 to-blue-500',
      hoverColor: 'hover:from-blue-500 hover:to-blue-600'
    },
    { 
      name: 'LinkedIn', 
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800'
    },
    { 
      name: 'Discord', 
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.453.96-.62 1.445a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.445.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700'
    },
    { 
      name: 'Instagram', 
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-1.284.013-2.46.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045 1.064.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-pink-500 to-rose-500',
      hoverColor: 'hover:from-pink-600 hover:to-rose-600'
    }
  ];

  // Generate random stars for the footer background
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate more stars (increased from 50 to 150)
    const newStars = Array.from({ length: 150 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 1.5, // Slightly smaller stars for better density
      opacity: Math.random() * 0.7 + 0.1, // Wider opacity range
      delay: Math.random() * 10,
      duration: Math.random() * 3 + 1 // More varied durations
    }));
    setStars(newStars);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-gray-950/95 backdrop-blur-sm">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.5, star.opacity],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/90 to-purple-600/90 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                <span className="text-white font-bold text-lg">OS</span>
              </div>
              <div>
                <span className="text-white font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Out-Sec</span>
                <p className="text-xs text-gray-400 font-mono mt-1">Cybersecurity Excellence</p>
              </div>
            </div>
            
            <p className="text-gray-300/80 mb-6 max-w-md leading-relaxed text-sm md:text-base font-light">
              Defending the digital world with cutting-edge strategies in cybersecurity, 
              blockchain, and IoT security solutions. Built by experts, driven by innovation.
            </p>
            
            <div className="flex space-x-3">
              {socialLinks.map((platform, index) => (
                <motion.a 
                  key={platform.name}
                  href={platform.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden group"
                  title={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} rounded-xl opacity-80 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10`}></div>
                  <div className="relative z-10 flex items-center justify-center w-full h-full text-white/90 group-hover:text-white transition-colors">
                    {platform.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Footer Links - All in one row */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-white font-bold mb-4 text-lg">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a 
                          href="#" 
                          className="text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm flex items-center group"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                {currentYear} Out-Sec. All rights reserved. Built with expertise, driven by innovation.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Securing your digital future with cutting-edge cybersecurity solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-300 transition-colors hover:underline underline-offset-4 decoration-blue-300/50 text-sm font-light"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-300 transition-colors hover:underline underline-offset-4 decoration-blue-300/50 text-sm font-light"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-300 transition-colors hover:underline underline-offset-4 decoration-blue-300/50 text-sm font-light"
              >
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Testimonial data
const testimonialsData = [
  {
    id: 1,
    name: 'Igor Fediczko',
    title: 'CTO, TechCorp',
    content: 'Out-Sec provided exceptional security services that significantly improved our infrastructure. Their team demonstrated deep expertise and professionalism throughout our engagement.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Chen',
    title: 'Security Lead, FinSecure',
    content: 'The security audit conducted by Out-Sec was thorough and insightful. Their recommendations were practical and immediately actionable, helping us strengthen our defenses.',
    rating: 5
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    title: 'Director of IT, HealthPlus',
    content: 'Working with Out-Sec was a game-changer for our organization. Their team helped us implement robust security measures that were both effective and non-disruptive to our operations.',
    rating: 4
  },
  {
    id: 4,
    name: 'Emily Park',
    title: 'VP Engineering, DataFlow',
    content: 'Out-Sec\'s approach to security is both comprehensive and business-focused. They helped us understand our vulnerabilities without causing unnecessary alarm.',
    rating: 5
  },
  {
    id: 5,
    name: 'David Kim',
    title: 'CISO, GlobalBank',
    content: 'The team at Out-Sec demonstrated exceptional knowledge in financial sector security. Their compliance expertise was particularly valuable for our organization.',
    rating: 5
  },
  {
    id: 6,
    name: 'Lisa Wong',
    title: 'Product Manager, SecureCloud',
    content: 'Out-Sec\'s security assessment was instrumental in identifying critical vulnerabilities in our platform. Their detailed report and remediation guidance were outstanding.',
    rating: 4
  }
];

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Testimonials Component with refined design
export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  // Handle manual navigation
  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Discover what our clients say about our security services and expertise.
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Testimonial Card */}
          <motion.div 
            key={activeIndex}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xl font-bold">
                    {testimonialsData[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonialsData[activeIndex].name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonialsData[activeIndex].title}
                  </p>
                  <div className="mt-1">
                    <StarRating rating={testimonialsData[activeIndex].rating} />
                  </div>
                </div>
              </div>
              
              <blockquote className="relative">
                <div className="absolute top-0 left-0 -mt-4 -ml-4 text-gray-200 dark:text-gray-700 text-6xl font-serif">"</div>
                <p className="relative z-10 text-lg text-gray-700 dark:text-gray-300 italic pl-8">
                  {testimonialsData[activeIndex].content}
                </p>
              </blockquote>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => goToTestimonial((activeIndex - 1 + testimonialsData.length) % testimonialsData.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => goToTestimonial((activeIndex + 1) % testimonialsData.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};



// LiveChatWidget Component
export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your OutSecure assistant. How can I help you with your cybersecurity needs today?", 
      sender: "bot", 
      timestamp: new Date(),
      status: 'delivered'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const messageText = inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: "bot",
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prev => {
        const updated = [...prev];
        const userMsgIndex = updated.findIndex(m => m.id === userMessage.id);
        if (userMsgIndex !== -1) {
          updated[userMsgIndex] = { ...updated[userMsgIndex], status: 'delivered' };
        }
        return [...updated, botResponse];
      });
      
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help with all your cybersecurity questions. What can I assist you with today?";
    } else if (lowerMessage.includes('service') || lowerMessage.includes('services')) {
      return "We offer a range of cybersecurity services including Penetration Testing, Security Audits, and Incident Response. Would you like more details about any specific service?";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach our team at contact@out-sec.com or call us at +1 (555) 123-4567. Our support is available 24/7 for critical security incidents.";
    } else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "Our pricing varies based on the scope and requirements of your project. Could you tell me more about what you're looking for so I can provide a more accurate estimate?";
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return "For immediate security incidents, please call our 24/7 emergency line at +1 (555) 987-6543. Our team is standing by to assist you.";
    } else {
      return "Thank you for your message. Our cybersecurity experts will review your inquiry and respond shortly. In the meantime, you might find helpful information in our Knowledge Base or FAQ section.";
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10 w-96 flex flex-col"
          style={{
            height: isMinimized ? '60px' : '600px',
            transition: 'height 0.3s ease-in-out'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">OutSecure Support</h3>
                <p className="text-xs text-white/80">
                  {isTyping ? 'Typing...' : 'Online'}
                  <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-400"></span>
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={minimizeChat} 
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Minimize chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button 
                onClick={toggleChat} 
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-900/30">
                {messages.map((message) => (
                  <motion.div 
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 relative ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' 
                        : 'bg-gray-800/80 text-gray-100 rounded-bl-none'
                    }`}>
                      <div className="text-sm">{message.text}</div>
                      <div className={`text-xs mt-1 flex items-center justify-end space-x-1 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                      }`}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && (
                          <span>
                            {message.status === 'sending' ? (
                              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-1 pl-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-gray-900/50">
                <div className="relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows="1"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${
                      inputMessage.trim() 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                    aria-label="Send message"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Our team typically responds within a few minutes
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
      
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
          isOpen ? 'hidden' : 'flex bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
};
