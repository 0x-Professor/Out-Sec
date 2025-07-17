import React, { useState, useEffect } from 'react';
import './App.css';

// Logo Component
const OutSecureLogo = () => (
  <svg viewBox="0 0 60 60" className="w-12 h-12">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
    {/* Curved lines forming fingerprint pattern */}
    <path d="M15,45 Q25,35 35,45" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
    <path d="M18,42 Q28,32 38,42" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
    <path d="M21,39 Q31,29 41,39" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
    <path d="M24,36 Q34,26 44,36" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
    <path d="M27,33 Q37,23 47,33" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
    <path d="M30,30 Q40,20 50,30" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
    <path d="M33,27 Q43,17 53,27" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
  </svg>
);

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <OutSecureLogo />
            <span className="text-white text-xl font-bold">OutSecure</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
            <a href="#services" className="text-gray-300 hover:text-cyan-400 transition-colors">Services</a>
            <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#team" className="text-gray-300 hover:text-cyan-400 transition-colors">Team</a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [threatCount, setThreatCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            Secure Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"> Digital Future</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            OutSecure provides cutting-edge cybersecurity solutions to protect your business from evolving threats. 
            Our expert team delivers comprehensive security services, from malware analysis to blockchain development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105">
              Start Security Assessment
            </button>
            <button className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all">
              View Our Projects
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{threatCount}</div>
              <div className="text-sm text-gray-400">Threats Blocked Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">99.9%</div>
              <div className="text-sm text-gray-400">Security Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">15+</div>
              <div className="text-sm text-gray-400">Security Experts</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
            alt="Cybersecurity"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
};

// Threat Map Component
const ThreatMap = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const mockThreats = [
      { id: 1, location: 'New York', type: 'Malware', severity: 'High', x: 20, y: 30 },
      { id: 2, location: 'London', type: 'Phishing', severity: 'Medium', x: 50, y: 20 },
      { id: 3, location: 'Tokyo', type: 'DDoS', severity: 'Critical', x: 80, y: 40 },
      { id: 4, location: 'Sydney', type: 'Ransomware', severity: 'High', x: 85, y: 70 },
      { id: 5, location: 'Berlin', type: 'Data Breach', severity: 'Medium', x: 52, y: 25 },
    ];
    setThreats(mockThreats);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Real-Time Threat Intelligence</h2>
          <p className="text-xl text-gray-300">Monitor global cybersecurity threats as they happen</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 relative">
          <div className="relative h-96 bg-gray-700 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
              alt="Threat Map Background"
              className="w-full h-full object-cover opacity-30"
            />
            {threats.map(threat => (
              <div
                key={threat.id}
                className={`absolute w-4 h-4 rounded-full ${getSeverityColor(threat.severity)} animate-pulse cursor-pointer`}
                style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                title={`${threat.location}: ${threat.type} (${threat.severity})`}
              >
                <div className={`absolute inset-0 rounded-full ${getSeverityColor(threat.severity)} animate-ping`}></div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-400">3</div>
              <div className="text-sm text-gray-300">Critical Threats</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">7</div>
              <div className="text-sm text-gray-300">High Priority</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">12</div>
              <div className="text-sm text-gray-300">Medium Priority</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      title: "Malware Analysis",
      description: "Advanced malware detection and analysis using cutting-edge tools and techniques.",
      icon: "🛡️",
      features: ["Real-time scanning", "Behavioral analysis", "Threat intelligence"]
    },
    {
      title: "Penetration Testing",
      description: "Comprehensive security testing to identify vulnerabilities before attackers do.",
      icon: "🔍",
      features: ["Network testing", "Web application security", "Mobile app testing"]
    },
    {
      title: "Blockchain Security",
      description: "Secure blockchain development and smart contract auditing services.",
      icon: "🔗",
      features: ["Smart contract audits", "DeFi security", "NFT protection"]
    },
    {
      title: "Security Operations Center",
      description: "24/7 monitoring and incident response to keep your systems secure.",
      icon: "🏢",
      features: ["24/7 monitoring", "Incident response", "Threat hunting"]
    },
    {
      title: "Forensics Analysis",
      description: "Digital forensics and incident investigation services.",
      icon: "🔬",
      features: ["Digital evidence", "Incident reconstruction", "Expert testimony"]
    },
    {
      title: "IoT Security",
      description: "Comprehensive IoT device security and network protection.",
      icon: "📡",
      features: ["Device hardening", "Network segmentation", "Firmware analysis"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-300">Comprehensive cybersecurity solutions for modern businesses</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-cyan-400">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      name: "CynsesAI",
      description: "Comprehensive network security analysis tool for PCAP files with threat intelligence integration.",
      tech: ["Python", "TypeScript", "HTML"],
      link: "https://github.com/k4Karlal/CynsesAi",
      image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI3MzY4NDd8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Fluffy-ware",
      description: "Advanced malware for security testing and system privilege escalation research.",
      tech: ["Rust"],
      link: "https://github.com/out-sec/fluffy-ware",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Spamy",
      description: "Comprehensive email analysis tool for security filtering and threat detection.",
      tech: ["Python"],
      link: "https://github.com/president-xd/Spamy",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Toralizer",
      description: "Compact tool for anonymous web browsing through Tor network integration.",
      tech: ["C", "Shell", "MakeFile"],
      link: "https://github.com/president-xd/toralizer",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "SecureTasker",
      description: "Enterprise-level secure task management with OWASP compliance and CI/CD integration.",
      tech: ["TypeScript", "JavaScript", "CSS"],
      link: "https://github.com/0x-Professor/SecureTasker",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "GDrive-2.0",
      description: "Decentralized cloud storage dApp built on Ethereum blockchain using Scaffold-ETH 2.",
      tech: ["Solidity", "TypeScript", "JavaScript"],
      link: "https://github.com/0x-Professor/gdrive2.0",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Projects</h2>
          <p className="text-xl text-gray-300">Innovative security solutions and research projects</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  const leaders = [
    {
      name: "Mohsin Mukhtiar Lashari",
      role: "Founder / President",
      expertise: "Network Security, Malware Analysis, SOC Expert",
      github: "https://github.com/president-xd",
      linkedin: "https://www.linkedin.com/in/mohsin-lashari/",
      twitter: "https://x.com/@justmohsin_"
    },
    {
      name: "Ali Ejaz",
      role: "CEO",
      expertise: "Malware Developer/Analyst, Blockchain Expert, SEO Specialist",
      linkedin: "https://www.linkedin.com/in/ozee/"
    },
    {
      name: "Khizar Ali Shah",
      role: "Co-founder / COO",
      expertise: "Hardware & IoT Security Expert, Blockchain Expert, Reverse Engineer",
      github: "https://github.com/eros938",
      linkedin: "https://www.linkedin.com/in/khizar-ali-shah-410214233/"
    },
    {
      name: "Talha Bilal",
      role: "Co-founder / CISO",
      expertise: "Hardware Security Expert, Firmware Analyst, Reverse Engineer",
      github: "https://github.com/k4rlal",
      linkedin: "https://www.linkedin.com/in/talha-bilal-karlal/"
    },
    {
      name: "Mazhar Saeed",
      role: "Co-founder / CTO",
      expertise: "Web Application Security Expert, Blockchain Developer",
      github: "https://github.com/0xProfessor",
      linkedin: "https://www.linkedin.com/in/mazhar-saeed-8414682a7/"
    },
    {
      name: "Mudasir Shamshad",
      role: "CFO",
      expertise: "Software Engineer, Graphics Designer, UI/UX Developer, Game Developer",
      linkedin: "https://www.linkedin.com/in/mudasir-ali-5159282b9/"
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-300">Meet the experts behind OutSecure</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((member, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-750 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-cyan-400 mb-2">{member.role}</p>
              <p className="text-gray-300 text-sm mb-4">{member.expertise}</p>
              <div className="flex justify-center space-x-4">
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300">Ready to secure your digital future? Let's discuss your security needs.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300">info@outsecure.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <a href="https://linkedin.com/company/outsecure" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  linkedin.com/company/outsecure
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <a href="https://github.com/out-sec" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  github.com/out-sec
                </a>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/company/outsecure" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/out_secure._" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.326-1.445L3.178 7.73c-1.297-1.297-1.297-3.326 0-4.623s3.326-1.297 4.623 0l1.945 1.945c1.297 1.297 1.297 3.326 0 4.623l-1.945 1.945c-.878.878-2.029 1.368-3.326 1.368z"/>
                  </svg>
                </a>
                <a href="https://discord.gg/9uWGeatRBd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Service Interest</label>
                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white">
                  <option>Select a service</option>
                  <option>Penetration Testing</option>
                  <option>Malware Analysis</option>
                  <option>Security Consultation</option>
                  <option>Blockchain Security</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="Tell us about your security needs..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <OutSecureLogo />
              <span className="text-white text-xl font-bold">OutSecure</span>
            </div>
            <p className="text-gray-400">
              Cutting-edge cybersecurity solutions for the digital age. 
              Protecting your business from evolving threats.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Penetration Testing</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Malware Analysis</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blockchain Security</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Consultation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-cyan-400 transition-colors">Team</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 OutSecure. All rights reserved. Built with cutting-edge security in mind.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <HeroSection />
      <ThreatMap />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;