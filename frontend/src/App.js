import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import Scene3D from './components/Scene3D';
import AdvancedChatbot from './components/AdvancedChatbot';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

// Enhanced Logo Component with 3D effects
const OutSecureLogo = () => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    className="relative"
  >
    <svg viewBox="0 0 60 60" className="w-12 h-12 relative z-10">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M15,45 Q25,35 35,45" stroke="url(#logoGradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M18,42 Q28,32 38,42" stroke="url(#logoGradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M21,39 Q31,29 41,39" stroke="url(#logoGradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M24,36 Q34,26 44,36" stroke="url(#logoGradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M27,33 Q37,23 47,33" stroke="url(#logoGradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M30,30 Q40,20 50,30" stroke="url(#logoGradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M33,27 Q43,17 53,27" stroke="url(#logoGradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
    </svg>
  </motion.div>
);

// Enhanced Navigation with glassmorphism
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'projects', 'team', 'blog', 'research', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-gray-900/80 shadow-lg shadow-cyan-500/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <OutSecureLogo />
            <motion.span 
              className="text-white text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              OutSecure
            </motion.span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'services', 'projects', 'team', 'blog', 'research', 'contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className={`relative px-3 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item 
                    ? 'text-cyan-400 bg-cyan-500/20' 
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full -z-10"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>
          
          <motion.button 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-cyan-500/25"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

// Ultra-advanced Hero Section with 3D elements
const HeroSection = () => {
  const [threatCount, setThreatCount] = useState(0);
  const [currentStats, setCurrentStats] = useState({
    threats: 0,
    uptime: 99.9,
    experts: 15
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setCurrentStats(prev => ({
        ...prev,
        threats: prev.threats + Math.floor(Math.random() * 5) + 1
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Secure Your
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 block"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Digital Future
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            OutSecure provides cutting-edge cybersecurity solutions powered by AI to protect your business 
            from evolving threats. Our expert team delivers comprehensive security services, from malware 
            analysis to blockchain development.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform shadow-lg hover:shadow-cyan-500/25"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Security Assessment
            </motion.button>
            <motion.button 
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Projects
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center lg:justify-start space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.div 
              className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
            >
              <motion.div 
                className="text-2xl font-bold text-cyan-400"
                key={currentStats.threats}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentStats.threats}
              </motion.div>
              <div className="text-sm text-gray-400">Threats Blocked Today</div>
            </motion.div>
            
            <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl">
              <div className="text-2xl font-bold text-cyan-400">{currentStats.uptime}%</div>
              <div className="text-sm text-gray-400">Security Uptime</div>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl">
              <div className="text-2xl font-bold text-cyan-400">{currentStats.experts}+</div>
              <div className="text-sm text-gray-400">Security Experts</div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative h-96 lg:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Scene3D className="absolute inset-0" />
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Services Section
const ServicesSection = () => {
  const services = [
    {
      title: "AI-Powered Threat Detection",
      description: "Advanced machine learning algorithms that identify and neutralize threats in real-time before they can cause damage.",
      icon: "🤖",
      features: ["Real-time monitoring", "ML-based analysis", "Automated response", "Predictive analytics"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Penetration Testing",
      description: "Comprehensive security assessments that simulate real-world attacks to identify vulnerabilities.",
      icon: "🔍",
      features: ["Network testing", "Web application security", "Mobile app testing", "Social engineering"],
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Blockchain Security",
      description: "Specialized security services for blockchain applications, smart contracts, and DeFi platforms.",
      icon: "🔗",
      features: ["Smart contract audits", "DeFi security", "NFT protection", "Consensus mechanisms"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Security Operations Center",
      description: "24/7 monitoring and incident response to keep your systems secure around the clock.",
      icon: "🏢",
      features: ["24/7 monitoring", "Incident response", "Threat hunting", "Forensic analysis"],
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Cloud Security",
      description: "Comprehensive cloud security solutions for AWS, Azure, GCP, and hybrid environments.",
      icon: "☁️",
      features: ["Cloud configuration", "Identity management", "Data encryption", "Compliance auditing"],
      color: "from-red-500 to-orange-500"
    },
    {
      title: "IoT Security",
      description: "Specialized security for Internet of Things devices and networks in industrial and consumer environments.",
      icon: "📡",
      features: ["Device hardening", "Network segmentation", "Firmware analysis", "Protocol security"],
      color: "from-orange-500 to-yellow-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Advanced Services</h2>
          <p className="text-xl text-gray-300">Comprehensive cybersecurity solutions powered by cutting-edge technology</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-center text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-3"></span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button 
                  className={`mt-6 bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-full font-semibold transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      name: "CynsesAI",
      description: "Comprehensive network security analysis tool for PCAP files with threat intelligence integration and ML-powered threat detection.",
      tech: ["Python", "TypeScript", "HTML", "Machine Learning"],
      link: "https://github.com/k4Karlal/CynsesAi",
      image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI3MzY4NDd8MA&ixlib=rb-4.1.0&q=85",
      category: "AI Security"
    },
    {
      name: "Fluffy-ware",
      description: "Advanced malware for security testing and system privilege escalation research with Windows Defender bypass capabilities.",
      tech: ["Rust", "Assembly", "Windows API"],
      link: "https://github.com/out-sec/fluffy-ware",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85",
      category: "Malware Research"
    },
    {
      name: "Spamy",
      description: "Comprehensive email analysis tool for security filtering, threat detection, and phishing prevention with ML classification.",
      tech: ["Python", "Natural Language Processing", "Machine Learning"],
      link: "https://github.com/president-xd/Spamy",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85",
      category: "Email Security"
    },
    {
      name: "Toralizer",
      description: "Compact tool for anonymous web browsing through Tor network integration with advanced privacy features.",
      tech: ["C", "Shell", "Network Programming"],
      link: "https://github.com/president-xd/toralizer",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85",
      category: "Privacy Tools"
    },
    {
      name: "SecureTasker",
      description: "Enterprise-level secure task management with OWASP compliance, advanced authentication, and automated CI/CD pipeline integration.",
      tech: ["TypeScript", "JavaScript", "CSS", "OWASP"],
      link: "https://github.com/0x-Professor/SecureTasker",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85",
      category: "Enterprise Security"
    },
    {
      name: "GDrive-2.0",
      description: "Decentralized cloud storage dApp built on Ethereum blockchain using Scaffold-ETH 2 with end-to-end encryption.",
      tech: ["Solidity", "TypeScript", "JavaScript", "Blockchain"],
      link: "https://github.com/0x-Professor/gdrive2.0",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85",
      category: "Blockchain"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Innovative Projects</h2>
          <p className="text-xl text-gray-300">Cutting-edge security solutions and research projects</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="bg-gray-800 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AdvancedChatbot />
    </div>
  );
}

export default App;