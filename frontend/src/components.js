import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Threat Map Component
const ThreatMap = () => {
  const canvasRef = useRef(null);
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    // Generate random threat locations
    const generateThreats = () => {
      const newThreats = [];
      for (let i = 0; i < 20; i++) {
        newThreats.push({
          x: Math.random() * 800,
          y: Math.random() * 400,
          intensity: Math.random(),
          type: ['malware', 'ddos', 'phishing', 'ransomware'][Math.floor(Math.random() * 4)],
          pulse: Math.random() * Math.PI * 2
        });
      }
      setThreats(newThreats);
    };

    generateThreats();
    const interval = setInterval(generateThreats, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;

    let animationId;
    let time = 0;

    const drawThreatMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw world map outline (simplified)
      ctx.strokeStyle = 'rgba(0, 221, 235, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(50, 50, 700, 300);
      ctx.stroke();
      
      // Draw grid
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(50 + i * 87.5, 50);
        ctx.lineTo(50 + i * 87.5, 350);
        ctx.stroke();
      }
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(50, 50 + i * 75);
        ctx.lineTo(750, 50 + i * 75);
        ctx.stroke();
      }
      
      // Draw threats
      threats.forEach((threat, index) => {
        const pulse = Math.sin(time + threat.pulse) * 0.5 + 0.5;
        const radius = 3 + pulse * 5;
        
        ctx.save();
        ctx.translate(threat.x, threat.y);
        
        // Threat glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2);
        gradient.addColorStop(0, `rgba(255, 0, 0, ${threat.intensity * pulse})`);
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Threat dot
        ctx.fillStyle = `rgba(255, 0, 0, ${threat.intensity})`;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
      
      time += 0.05;
      animationId = requestAnimationFrame(drawThreatMap);
    };

    drawThreatMap();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [threats]);

  return (
    <div className="glass-card p-6 card-interactive">
      <h3 className="text-xl font-bold text-white mb-4">Real-time Threat Map</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg"
        style={{ background: 'rgba(0, 0, 0, 0.2)' }}
      />
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>🔴 Active Threats: {threats.length}</span>
        <span>🛡️ Blocked: 1,247</span>
        <span>⚠️ Monitoring: 24/7</span>
      </div>
    </div>
  );
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

// Sophisticated Hero Component
export const Hero = () => {
  const [ref, isVisible] = useScrollReveal();

  const handleExploreWork = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl max-w-4xl w-full mx-4 p-8 relative">
        <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-white hover:text-red-400 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-6">🎬 Interactive Demo</h3>
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-12">
            <div class="text-6xl mb-6">🚀</div>
            <p class="text-white text-xl mb-4">Coming Soon</p>
            <p class="text-gray-300">Experience our cutting-edge cybersecurity solutions in action.</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm">
              <span className="text-sm font-medium text-blue-300">
                🛡️ OUTSECURE • ADVANCED CYBERSECURITY
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block mb-2">Securing the Future with</span>
              <SmoothTypingAnimation
                text="Next-Gen Solutions"
                highlight={["Next-Gen"]}
                className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              />
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              OutSecure defends the digital world with cutting-edge strategies in cybersecurity, blockchain, and IoT.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={handleExploreWork}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <SVGIcon type="work" className="w-5 h-5" />
                <span>Explore Our Work</span>
                <motion.div
                  className="w-5 h-5"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </div>
            </motion.button>

            <motion.button
              onClick={handleWatchDemo}
              className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400 rounded-xl text-cyan-400 font-semibold text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative flex items-center space-x-2">
                <SVGIcon type="play" className="w-5 h-5" />
                <span>Watch Demo</span>
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              </div>
            </motion.button>
          </motion.div>

          {/* Feature Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center space-x-8 mt-12"
          >
            <FeatureIndicator icon="monitor" text="24/7 Monitoring" delay={0.2} />
            <FeatureIndicator icon="ai" text="AI-Powered" delay={0.4} />
            <FeatureIndicator icon="quantum" text="Quantum-Safe" delay={0.6} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
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
              <ThreatMap />
              
              {/* Timeline */}
              <div className="glass-card p-6 card-interactive">
                <h3 className="text-2xl font-bold text-white mb-6">Our Journey</h3>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                        activeTimelineItem === index ? 'bg-blue-600/20 border-l-4 border-blue-500' : 'bg-transparent'
                      }`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{item.year}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Services Component with 8 Services
export const Services = () => {
  const [ref, isVisible] = useScrollReveal();
  const [activeService, setActiveService] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      title: "Cryptography Integration",
      description: "Advanced encryption solutions for IoT, websites, systems, and networks with quantum-resistant algorithms",
      icon: "crypto",
      features: ["AES-256 Encryption", "RSA Key Management", "Quantum-Safe Protocols", "Hash Functions"],
      technologies: ["OpenSSL", "Libsodium", "Post-Quantum Crypto"],
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Malware Analysis & Development",
      description: "Expert analysis and development of security-focused malware solutions with AI-powered detection",
      icon: "malware",
      features: ["Dynamic Analysis", "Behavioral Detection", "Signature Generation", "Sandbox Testing"],
      technologies: ["YARA", "Volatility", "Cuckoo Sandbox"],
      image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Blockchain Development",
      description: "Secure blockchain solutions and smart contract development with DeFi integration",
      icon: "blockchain",
      features: ["Smart Contracts", "DeFi Solutions", "NFT Platforms", "Consensus Mechanisms"],
      technologies: ["Solidity", "Web3.js", "Ethereum", "Hyperledger"],
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Penetration Testing",
      description: "Comprehensive security testing for networks, systems, and applications with automated tools",
      icon: "penetration",
      features: ["Network Scanning", "Web App Testing", "Social Engineering", "Vulnerability Assessment"],
      technologies: ["Metasploit", "Burp Suite", "Nmap", "Wireshark"],
      image: "https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxoYWNraW5nfGVufDB8fHxibHVlfDE3NTI1NjA1NTN8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "IoT Security",
      description: "Specialized security solutions for Internet of Things devices and edge computing networks",
      icon: "iot",
      features: ["Device Authentication", "Edge Security", "Protocol Analysis", "Firmware Security"],
      technologies: ["MQTT", "CoAP", "LoRaWAN", "Zigbee"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Security Operations Center",
      description: "24/7 monitoring and incident response for comprehensive security coverage with AI analytics",
      icon: "soc",
      features: ["24/7 Monitoring", "Incident Response", "Threat Intelligence", "SIEM Integration"],
      technologies: ["Splunk", "ELK Stack", "SOAR", "MITRE ATT&CK"],
      image: "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxzZWN1cml0eXxlbnwwfHx8Ymx1ZXwxNzUyNjQ5NjIwfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Cloud Security",
      description: "Comprehensive cloud security solutions for AWS, Azure, and Google Cloud platforms",
      icon: "cloud",
      features: ["Cloud Assessment", "Identity Management", "Data Protection", "Compliance Audit"],
      technologies: ["AWS Security", "Azure Security", "GCP Security", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Network Security",
      description: "Advanced network security solutions including firewalls, intrusion detection, and monitoring",
      icon: "network",
      features: ["Firewall Management", "IDS/IPS", "VPN Solutions", "Network Monitoring"],
      technologies: ["pfSense", "Suricata", "Wireshark", "Nagios"],
      image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    }
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="services" className="py-24 gradient-bg-animated relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 cyber-glow animate-cyber-pulse">
              <SVGIcon type="security" className="w-4 h-4 inline mr-2 animate-neon-flicker" />
              CYBER SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Next-Gen <span className="hologram-text">Cybersecurity</span> Arsenal
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Cutting-edge security solutions powered by AI and quantum-resistant technologies
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cyber services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-black/50 transition-all duration-300 cyber-glow backdrop-blur-sm"
            />
            <SVGIcon type="penetration" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 animate-neon-flicker" />
          </div>
        </div>
        
        <div className="grid-12 gap-6">
          {filteredServices.map((service, index) => (
            <div 
              key={index} 
              className={`col-12 md:col-6 lg:col-4 glass-card p-6 card-interactive transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 0.2}s`
              }}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="relative overflow-hidden rounded-xl mb-4 group">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center animate-cyber-pulse">
                    <SVGIcon type={service.icon} className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white font-medium text-sm">{service.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-cyan-400 font-medium text-sm mb-3">{service.category}</p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{service.description}</p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {service.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-2 py-1 rounded-full text-xs border border-cyan-500/30">
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 4 && (
                    <span className="bg-gray-700/50 text-gray-400 px-2 py-1 rounded-full text-xs border border-gray-600/30">
                      +{service.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 hover-scale cyber-glow">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No services found</h3>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </section>
  );
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
            <span className="inline-block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 cyber-glow animate-cyber-pulse">
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
        
        <div className="grid-12 gap-4 sm:gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`col-12 sm:col-6 lg:col-4 glass-card p-4 sm:p-5 card-interactive cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 0.2}s`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 group flex-shrink-0">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-36 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5">
                    <p className="text-white font-medium text-xs sm:text-sm truncate">{member.experience}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-1">{member.name}</h3>
                <p className="text-cyan-400 font-medium text-xs sm:text-sm mb-2 sm:mb-3">{member.role}</p>
                <p className="text-gray-400 text-xs mb-3 sm:mb-4 line-clamp-2 flex-grow">{member.specialization}</p>
                
                <div className="flex flex-wrap gap-1 justify-center mt-auto">
                  {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-xs border border-cyan-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 3 && (
                    <span className="bg-gray-700/50 text-gray-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-xs border border-gray-600/30">
                      +{member.expertise.length - 3}
                    </span>
                  )}
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
            <span className="inline-block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 cyber-glow animate-cyber-pulse">
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
        
        <div className="grid-12 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className={`col-12 sm:col-6 lg:col-4 glass-card p-4 sm:p-5 card-interactive transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 0.15}s`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 group flex-shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-36 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-700"
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5">
                    <p className="text-white font-medium text-xs sm:text-sm truncate">{project.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow">
                <p className="text-cyan-400 font-medium text-xs sm:text-sm mb-2 sm:mb-3">{project.category}</p>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-3 sm:mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-xs border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-gray-700/50 text-gray-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-xs border border-gray-600/30">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 hover-scale cyber-glow">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Blog Component
export const Blog = () => {
  const [ref, isVisible] = useScrollReveal();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      title: "Secure communication of IoT Devices using blockchain",
      author: "Mohsin Mukhtiar",
      category: "Blockchain",
      categories: ["Blockchain", "Network Security", "IoT Security"],
      date: "December 4, 2024",
      readTime: "4 mins",
      excerpt: "Exploring how blockchain technology can enhance IoT device security and communication protocols through decentralized authentication and encrypted data transmission...",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85",
      featured: true
    },
    {
      title: "Advanced Malware Analysis Techniques",
      author: "Ali Ejaz",
      category: "Malware Analysis",
      categories: ["Malware Analysis", "Security Research"],
      date: "November 28, 2024",
      readTime: "6 mins",
      excerpt: "Deep dive into modern malware analysis methodologies and reverse engineering techniques using dynamic analysis, behavioral detection, and AI-powered classification...",
      image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      title: "Hardware Security in Modern Systems",
      author: "Khizar Ali Shah",
      category: "Hardware Security",
      categories: ["Hardware Security", "IoT Security"],
      date: "November 22, 2024",
      readTime: "5 mins",
      excerpt: "Understanding hardware-level security threats and mitigation strategies for modern systems including secure boot, hardware attestation, and side-channel attacks...",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      title: "Web Application Security Best Practices",
      author: "Mazhar Saeed",
      category: "Web Security",
      categories: ["Web Security", "Application Security"],
      date: "November 15, 2024",
      readTime: "7 mins",
      excerpt: "Comprehensive guide to securing web applications against modern attack vectors including OWASP Top 10, secure coding practices, and security testing methodologies...",
      image: "https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxoYWNraW5nfGVufDB8fHxibHVlfDE3NTI1NjA1NTN8MA&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      title: "Cryptography in Cybersecurity",
      author: "Muhammad Fazeel",
      category: "Cryptography",
      categories: ["Cryptography", "Security"],
      date: "November 8, 2024",
      readTime: "5 mins",
      excerpt: "Exploring the role of cryptography in modern cybersecurity implementations including quantum-resistant algorithms, post-quantum cryptography, and secure key management...",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      title: "Network Penetration Testing Methodologies",
      author: "Wahab Khan",
      category: "Penetration Testing",
      categories: ["Penetration Testing", "Network Security"],
      date: "November 1, 2024",
      readTime: "8 mins",
      excerpt: "Advanced techniques and methodologies for effective network penetration testing including reconnaissance, vulnerability assessment, and exploit development...",
      image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85",
      featured: false
    }
  ];

  const categories = ['all', 'Blockchain', 'Malware Analysis', 'Hardware Security', 'Web Security', 'Cryptography', 'Penetration Testing'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <SVGIcon type="security" className="w-4 h-4 inline mr-2" />
              BLOG & INSIGHTS
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Latest <span className="gradient-text">Cybersecurity</span> Insights
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest research, techniques, and insights in cybersecurity
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-16">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/20 transition-all duration-300"
            />
            <SVGIcon type="penetration" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover-scale ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'glass-card text-gray-300 hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid-12 gap-4 sm:gap-6">
          {filteredPosts.map((post, index) => (
            <article 
              key={index} 
              className={`${post.featured ? 'col-12 lg:col-8' : 'col-12 sm:col-6 lg:col-4'} glass-card card-interactive transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 group flex-shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                    post.featured ? 'h-48 sm:h-56' : 'h-36 sm:h-40'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] xs:text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                {post.featured && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className="bg-yellow-500 text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] xs:text-xs font-bold">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col flex-grow p-4 sm:p-5">
                <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 flex-wrap">
                  <span className="text-blue-400">{post.author}</span>
                  <span className="mx-1 sm:mx-2">•</span>
                  <span>{post.date}</span>
                  <span className="mx-1 sm:mx-2">•</span>
                  <span className="whitespace-nowrap">{post.readTime}</span>
                </div>
                
                <h3 className={`font-bold text-white mb-2 sm:mb-3 line-clamp-2 ${
                  post.featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                }`}>
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {post.categories.slice(0, 3).map((cat, catIndex) => (
                    <span 
                      key={catIndex} 
                      className="bg-blue-500/20 text-blue-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                  {post.categories.length > 3 && (
                    <span className="bg-gray-700/50 text-gray-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-xs">
                      +{post.categories.length - 3}
                    </span>
                  )}
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-scale">
                  Read Article
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
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
    { name: 'LinkedIn', icon: 'L', url: '#' },
    { name: 'GitHub', icon: 'G', url: 'https://github.com/out-sec' },
    { name: 'Twitter', icon: 'T', url: '#' },
    { name: 'Discord', icon: 'D', url: '#' }
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
              <div className="flex space-x-4">
                {socialLinks.map((platform) => (
                  <a 
                    key={platform.name}
                    href={platform.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-scale"
                  >
                    {platform.icon}
                  </a>
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
    { name: 'LinkedIn', icon: 'L', url: '#' },
    { name: 'GitHub', icon: 'G', url: 'https://github.com/out-sec' },
    { name: 'Twitter', icon: 'T', url: '#' },
    { name: 'Discord', icon: 'D', url: '#' },
    { name: 'Instagram', icon: 'I', url: '#' }
  ];

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid-12 gap-12">
          {/* Company Info */}
          <div className="col-12 lg:col-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">OS</span>
              </div>
              <div>
                <span className="text-white font-bold text-2xl gradient-text">Out-Sec</span>
                <p className="text-xs text-gray-400">Cybersecurity Excellence</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Defending the digital world with cutting-edge strategies in cybersecurity, 
              blockchain, and IoT security solutions. Built by experts, driven by innovation.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-scale"
                  title={platform.name}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-12 md:col-4 lg:col-2">
              <h4 className="text-white font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Out-Sec. All rights reserved. Built with expertise, driven by innovation.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// LiveChatWidget Component
export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you with your cybersecurity needs?", sender: "bot", timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! Our cybersecurity experts will respond shortly. In the meantime, you can explore our services or contact us directly.",
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="glass-card w-80 h-96 mb-4 flex flex-col">
          <div className="p-4 border-b border-white/20">
            <h3 className="text-white font-semibold">OutSecure Support</h3>
            <p className="text-sm text-gray-300">We're here to help!</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-200'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="btn-primary px-4 py-2 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-scale"
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};
