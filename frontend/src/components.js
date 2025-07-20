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
    )
  };

  return icons[type] || icons.security;
};

// Navigation Component
const Navigation = () => {
  return (
    <nav className="clean-nav fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SVGIcon type="shield" className="h-8 w-8 text-text-primary" />
          <span className="text-2xl font-bold text-text-primary">Out-Sec</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#team" className="nav-link">Team</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        
        <button className="md:hidden text-text-primary">
          <SVGIcon type="menu" className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-text-secondary mb-4 text-lg">
            A new approach to <span className="text-text-primary font-medium">cybersecurity</span>
          </p>
          
          <h1 className="large-heading mb-6">
            Sec<span className="emphasis-letter">u</span>re at the speed of tho<span className="emphasis-letter">u</span>ght
          </h1>
          
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Advanced cybersecurity solutions designed for the modern digital landscape. 
            Protect, monitor, and secure your digital assets with cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#services" className="minimal-button">
              <SVGIcon type="shield" className="w-5 h-5" />
              Get Started
            </a>
            <a href="#contact" className="minimal-button-outline">
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const services = [
    {
      id: 1,
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities in your systems and applications.",
      icon: "penetration",
      category: "Security Testing",
      features: ["Web Application Testing", "Network Security", "Social Engineering", "Compliance Audits"]
    },
    {
      id: 2,
      title: "Malware Analysis",
      description: "Advanced threat detection and analysis to protect against sophisticated malware attacks.",
      icon: "malware",
      category: "Threat Analysis",
      features: ["Static Analysis", "Dynamic Analysis", "Reverse Engineering", "IOC Generation"]
    },
    {
      id: 3,
      title: "Blockchain Security",
      description: "Specialized security services for blockchain applications and smart contracts.",
      icon: "blockchain",
      category: "Blockchain",
      features: ["Smart Contract Audits", "DeFi Security", "Wallet Security", "Consensus Analysis"]
    },
    {
      id: 4,
      title: "Network Security",
      description: "Comprehensive network monitoring and protection against cyber threats.",
      icon: "network",
      category: "Infrastructure",
      features: ["Firewall Management", "IDS/IPS", "Network Monitoring", "Incident Response"]
    },
    {
      id: 5,
      title: "IoT Security",
      description: "Secure your Internet of Things devices and infrastructure from emerging threats.",
      icon: "iot",
      category: "IoT",
      features: ["Device Security", "Protocol Analysis", "Firmware Testing", "Edge Security"]
    },
    {
      id: 6,
      title: "Cryptography",
      description: "Advanced cryptographic solutions and security implementations.",
      icon: "crypto",
      category: "Cryptography",
      features: ["Key Management", "Encryption Design", "Protocol Security", "Crypto Analysis"]
    },
    {
      id: 7,
      title: "SOC Services",
      description: "24/7 security operations center monitoring and incident response.",
      icon: "soc",
      category: "Monitoring",
      features: ["24/7 Monitoring", "Threat Hunting", "Incident Response", "Forensics"]
    },
    {
      id: 8,
      title: "Cloud Security",
      description: "Comprehensive cloud security solutions for modern infrastructure.",
      icon: "cloud",
      category: "Cloud",
      features: ["Cloud Audits", "Container Security", "DevSecOps", "Compliance"]
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
    <section id="services" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="spaced-heading mb-4">
              O<span className="emphasis-letter">u</span>r Services
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              Comprehensive cybersecurity solutions tailored to protect your digital assets 
              and ensure business continuity in an ever-evolving threat landscape.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="search-container mb-6">
              <SVGIcon type="search" className="search-icon w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-4">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="clean-card p-6"
            >
              <div className="mb-4">
                <SVGIcon type={service.icon} className="w-12 h-12 text-accent-color mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-text-secondary mb-4">{service.description}</p>
              </div>
              
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-accent-color rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button className="minimal-button-outline w-full">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section Component
const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Chief Security Officer",
      bio: "15+ years in cybersecurity with expertise in threat intelligence and incident response.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Threat Intelligence", "Incident Response", "Risk Management"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Lead Penetration Tester",
      bio: "Expert in web application security and advanced penetration testing methodologies.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      specialties: ["Web Security", "Network Testing", "Social Engineering"]
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      role: "Blockchain Security Specialist",
      bio: "Specialized in smart contract auditing and decentralized application security.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialties: ["Smart Contracts", "DeFi Security", "Cryptography"]
    }
  ];

  return (
    <section id="team" className="section-padding subtle-gradient">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="spaced-heading mb-4">
              O<span className="emphasis-letter">u</span>r Team
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Meet our world-class cybersecurity experts dedicated to protecting 
              your digital infrastructure with cutting-edge solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="clean-card p-6 text-center"
            >
              <div className="mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover image-hover-scale"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-accent-color font-medium mb-3">{member.role}</p>
                <p className="text-text-secondary text-sm mb-4">{member.bio}</p>
              </div>
              
              <div className="space-y-2">
                {member.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-secondary-bg text-text-secondary text-xs px-3 py-1 rounded-full mr-2 mb-2"
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
const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Enterprise Security Audit",
      description: "Comprehensive security assessment for a Fortune 500 financial institution.",
      status: "Completed",
      category: "Audit",
      duration: "6 months",
      technologies: ["Network Security", "Compliance", "Risk Assessment"]
    },
    {
      id: 2,
      title: "DeFi Protocol Security",
      description: "Smart contract audit and security implementation for a major DeFi platform.",
      status: "Active",
      category: "Blockchain",
      duration: "4 months",
      technologies: ["Smart Contracts", "Solidity", "DeFi"]
    },
    {
      id: 3,
      title: "IoT Infrastructure Protection",
      description: "Securing a large-scale IoT deployment for smart city infrastructure.",
      status: "Completed",
      category: "IoT",
      duration: "8 months",
      technologies: ["IoT Security", "Edge Computing", "Protocol Analysis"]
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="spaced-heading mb-4">
              O<span className="emphasis-letter">u</span>r Projects
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Explore our recent cybersecurity projects and success stories 
              across various industries and security domains.
            </p>
          </motion.div>
        </div>

        <div className="grid-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="clean-card p-6"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-muted">{project.category}</span>
                  <span className={`status-indicator ${
                    project.status === 'Completed' ? 'status-completed' : 
                    project.status === 'Active' ? 'status-active' : 'status-pending'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-text-secondary mb-4">{project.description}</p>
                
                <div className="text-sm text-text-muted mb-4">
                  Duration: {project.duration}
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-secondary-bg text-text-secondary text-xs px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <button className="minimal-button-outline w-full">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <section id="contact" className="section-padding subtle-gradient">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="spaced-heading mb-4">
            O<span className="emphasis-letter">u</span>t-Sec is here
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Ready to secure your digital future? Get in touch with our cybersecurity experts 
            and discover how we can protect your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:contact@out-sec.com" className="minimal-button">
              <SVGIcon type="shield" className="w-5 h-5" />
              Get Started
            </a>
            <a href="#services" className="minimal-button-outline">
              View Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#home" className="footer-link">Home</a>
          <a href="#services" className="footer-link">Services</a>
          <a href="#team" className="footer-link">Team</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
        
        <div className="footer-copyright">
          ©2025 OUT-SEC • CYBERSECURITY EXCELLENCE
        </div>
      </div>
    </footer>
  );
};

export {
  Navigation,
  HeroSection,
  ServicesSection,
  TeamSection,
  ProjectsSection,
  ContactSection,
  Footer
};