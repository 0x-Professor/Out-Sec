import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpaceBackground from "./SpaceBackground";

// SVG Icons Component with Cyber Styling
const CyberIcon = ({ type, className = "w-6 h-6" }) => {
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
    menu: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    download: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    fingerprint: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  };

  return icons[type] || icons.security;
};

// Logo Component with Fingerprint Design
const CyberLogo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
          {/* Fingerprint-like curved lines */}
          <path d="M20 50 Q30 30, 50 30 Q70 30, 80 50" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M25 50 Q32 35, 50 35 Q68 35, 75 50" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M30 50 Q35 40, 50 40 Q65 40, 70 50" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M35 50 Q40 45, 50 45 Q60 45, 65 50" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M40 50 Q45 48, 50 48 Q55 48, 60 50" stroke="currentColor" strokeWidth="2" fill="none"/>
          
          <path d="M20 55 Q30 75, 50 75 Q70 75, 80 55" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M25 55 Q32 70, 50 70 Q68 70, 75 55" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M30 55 Q35 65, 50 65 Q65 65, 70 55" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M35 55 Q40 60, 50 60 Q60 60, 65 55" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M40 55 Q45 57, 50 57 Q55 57, 60 55" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <span className="logo-text">OUT-SEC</span>
    </div>
  );
};

// Navigation Component
const SpaceNavigation = () => {
  return (
    <nav className="space-nav">
      <div className="nav-container">
        <CyberLogo />
        
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#team" className="nav-link">Team</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        
        <button className="md:hidden text-space-white">
          <CyberIcon type="menu" className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

// Hero Section Component
const SpaceHeroSection = () => {
  return (
    <>
      <SpaceBackground />
      <section id="home" className="hero-space">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="hero-subtitle">
              Advanced Cybersecurity Solutions
            </p>
            
            <h1 className="hero-title">
              Sec<span className="cyber-text">u</span>ring the Digital 
              <br />
              <span className="glitch-text" data-text="Universe">Universe</span>
            </h1>
            
            <p className="hero-description">
              Protecting your digital assets across the vast expanse of cyberspace with 
              cutting-edge security technologies, advanced threat intelligence, and 
              comprehensive defense strategies designed for the modern digital frontier.
            </p>
            
            <div className="hero-buttons">
              <a href="#services" className="cyber-button">
                <CyberIcon type="shield" className="w-5 h-5" />
                Explore Services
              </a>
              <a href="#contact" className="cyber-button-outline">
                Get Protected
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Services Section Component
const SpaceServicesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const services = [
    {
      id: 1,
      title: "Advanced Penetration Testing",
      description: "Comprehensive security assessments using cutting-edge methodologies to identify vulnerabilities across your digital infrastructure.",
      icon: "penetration",
      category: "Security Testing",
      features: ["Web Application Security", "Network Infrastructure", "Social Engineering", "Compliance Auditing"]
    },
    {
      id: 2,
      title: "Malware Analysis & Threat Intelligence",
      description: "Advanced threat detection and analysis using AI-powered tools to protect against sophisticated cyber attacks.",
      icon: "malware",
      category: "Threat Analysis",
      features: ["Static & Dynamic Analysis", "Reverse Engineering", "IOC Generation", "Threat Hunting"]
    },
    {
      id: 3,
      title: "Blockchain Security Auditing",
      description: "Specialized security services for blockchain applications, smart contracts, and decentralized systems.",
      icon: "blockchain",
      category: "Blockchain",
      features: ["Smart Contract Audits", "DeFi Protocol Security", "Wallet Security", "Consensus Mechanism Analysis"]
    },
    {
      id: 4,
      title: "Network Security Operations",
      description: "Comprehensive network monitoring and protection against advanced persistent threats and cyber attacks.",
      icon: "network",
      category: "Infrastructure",
      features: ["Firewall Management", "IDS/IPS Systems", "Network Monitoring", "Incident Response"]
    },
    {
      id: 5,
      title: "IoT & Edge Security",
      description: "Secure your Internet of Things devices and edge computing infrastructure from emerging threats.",
      icon: "iot",
      category: "IoT",
      features: ["Device Security Assessment", "Protocol Analysis", "Firmware Testing", "Edge Computing Security"]
    },
    {
      id: 6,
      title: "Cryptographic Solutions",
      description: "Advanced cryptographic implementations and security protocols for data protection and privacy.",
      icon: "crypto",
      category: "Cryptography",
      features: ["Key Management Systems", "Encryption Design", "Protocol Security", "Cryptographic Analysis"]
    },
    {
      id: 7,
      title: "24/7 SOC Services",
      description: "Round-the-clock security operations center monitoring with advanced threat detection and response.",
      icon: "soc",
      category: "Monitoring",
      features: ["24/7 Monitoring", "Threat Hunting", "Incident Response", "Digital Forensics"]
    },
    {
      id: 8,
      title: "Cloud Security Architecture",
      description: "Comprehensive cloud security solutions for modern infrastructure and DevSecOps implementations.",
      icon: "cloud",
      category: "Cloud",
      features: ["Cloud Security Audits", "Container Security", "DevSecOps Integration", "Compliance Management"]
    }
  ];

  const categories = ["All", ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="services" className="section-space">
      <div className="container-space">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">
              O<span className="cyber-text">u</span>r Advanced Services
            </h2>
            <p className="text-xl color-space-grey max-w-3xl mx-auto mb-8">
              Comprehensive cybersecurity solutions powered by advanced technologies and 
              expert knowledge to protect your organization against evolving cyber threats.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="search-space mb-6">
              <CyberIcon type="search" className="search-icon-space" />
              <input
                type="text"
                placeholder="Search security services..."
                className="search-input-space"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-space">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-button-space ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-space-4">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-card-compact p-6 hologram-effect"
            >
              <div className="cyber-icon">
                <CyberIcon type={service.icon} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-space-white">{service.title}</h3>
              <p className="text-space-grey mb-4 text-sm leading-relaxed">{service.description}</p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-space-grey">
                    <div className="w-1.5 h-1.5 bg-space-cyan rounded-full mr-3 animate-pulse"></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <button className="cyber-button-outline w-full text-sm">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section Component
const SpaceTeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Alex Chen",
      role: "Chief Security Officer",
      bio: "15+ years in advanced cybersecurity with expertise in AI-powered threat intelligence and quantum cryptography.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Quantum Cryptography", "AI Threat Intelligence", "Zero-Trust Architecture"]
    },
    {
      id: 2,
      name: "Sarah Rodriguez",
      role: "Lead Penetration Tester",
      bio: "Expert in advanced penetration testing methodologies and blockchain security with multiple industry certifications.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      specialties: ["Advanced Penetration Testing", "Blockchain Security", "Red Team Operations"]
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Blockchain Security Architect",
      bio: "Specialized in smart contract auditing, DeFi security, and decentralized application security architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialties: ["Smart Contract Auditing", "DeFi Security", "Cryptographic Protocols"]
    }
  ];

  return (
    <section id="team" className="section-space">
      <div className="container-space">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">
              O<span className="cyber-text">u</span>r Expert Team
            </h2>
            <p className="text-xl text-space-grey max-w-3xl mx-auto">
              Meet our world-class cybersecurity experts dedicated to protecting 
              your digital infrastructure with cutting-edge technologies and advanced methodologies.
            </p>
          </motion.div>
        </div>

        <div className="grid-space-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="space-card p-6 text-center animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="mb-6">
                <div className="relative inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-2 border-space-cyan"
                    style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-space-cyan to-transparent opacity-20 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-space-white">{member.name}</h3>
                <p className="text-space-cyan font-medium mb-3 text-sm uppercase tracking-wider">{member.role}</p>
                <p className="text-space-grey text-sm mb-4 leading-relaxed">{member.bio}</p>
              </div>
              
              <div className="space-y-2">
                {member.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-space-dark text-space-cyan text-xs px-3 py-1 rounded-full mr-2 mb-2 border border-space-cyan"
                    style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)' }}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const SpaceProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Enterprise Zero-Trust Architecture",
      description: "Implementation of advanced zero-trust security architecture for a Fortune 500 financial institution with AI-powered threat detection.",
      status: "Completed",
      category: "Enterprise Security",
      duration: "8 months",
      technologies: ["Zero-Trust", "AI Threat Detection", "Quantum Encryption", "Compliance"]
    },
    {
      id: 2,
      title: "DeFi Protocol Security Audit",
      description: "Comprehensive security audit and implementation for a major DeFi platform handling $2B+ in total value locked.",
      status: "Active",
      category: "Blockchain",
      duration: "6 months",
      technologies: ["Smart Contract Auditing", "DeFi Security", "Solidity", "Formal Verification"]
    },
    {
      id: 3,
      title: "Smart City IoT Security Framework",
      description: "Securing large-scale IoT deployment for smart city infrastructure with edge computing and quantum-resistant cryptography.",
      status: "Completed",
      category: "IoT Security",
      duration: "12 months",
      technologies: ["IoT Security", "Edge Computing", "Quantum Cryptography", "5G Security"]
    }
  ];

  return (
    <section id="projects" className="section-space">
      <div className="container-space">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">
              O<span className="cyber-text">u</span>r Advanced Projects
            </h2>
            <p className="text-xl text-space-grey max-w-3xl mx-auto">
              Explore our cutting-edge cybersecurity projects and success stories 
              across various industries and advanced security domains.
            </p>
          </motion.div>
        </div>

        <div className="grid-space-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="space-card p-6 hologram-effect"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-space-grey uppercase tracking-wider">{project.category}</span>
                  <span className={`status-cyber ${
                    project.status === 'Completed' ? 'status-completed' : 
                    project.status === 'Active' ? 'status-active' : 'status-pending'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-space-white">{project.title}</h3>
                <p className="text-space-grey mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="text-sm text-space-cyan mb-4 font-medium">
                  Duration: {project.duration}
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-space-dark text-space-accent text-xs px-3 py-1 rounded-full mr-2 mb-2 border border-space-accent"
                    style={{ boxShadow: '0 0 10px rgba(100, 255, 218, 0.2)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <button className="cyber-button-outline w-full text-sm">
                View Case Study
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const SpaceContactSection = () => {
  return (
    <section id="contact" className="section-space">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4">
            O<span className="cyber-text">u</span>t-Sec is Here
          </h2>
          <p className="text-xl text-space-grey mb-8 max-w-2xl mx-auto">
            Ready to secure your digital future? Connect with our cybersecurity experts 
            and discover how we can protect your organization with advanced security solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:contact@out-sec.com" className="cyber-button">
              <CyberIcon type="shield" className="w-5 h-5" />
              Get Protected Now
            </a>
            <a href="#services" className="cyber-button-outline">
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const SpaceFooter = () => {
  return (
    <footer className="footer-space">
      <div className="footer-content-space">
        <div className="footer-links-space">
          <a href="#home" className="footer-link-space">Home</a>
          <a href="#services" className="footer-link-space">Services</a>
          <a href="#team" className="footer-link-space">Team</a>
          <a href="#projects" className="footer-link-space">Projects</a>
          <a href="#contact" className="footer-link-space">Contact</a>
        </div>
        
        <div className="footer-copyright-space">
          ©2025 OUT-SEC • Advanced Cybersecurity Solutions
        </div>
      </div>
    </footer>
  );
};

export {
  SpaceNavigation,
  SpaceHeroSection,
  SpaceServicesSection,
  SpaceTeamSection,
  SpaceProjectsSection,
  SpaceContactSection,
  SpaceFooter
};