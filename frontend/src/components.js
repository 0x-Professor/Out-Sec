import React, { useState, useEffect, useRef } from "react";

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

  return <div className="progress-bar" style={{ width: `${progress}%` }}></div>;
};

// Matrix Rain Effect Component
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0ea5e9';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 35);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
      style={{ zIndex: -1 }}
    />
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

// Enhanced Header Component
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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <ProgressBar />
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-card shadow-2xl' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 hover-lift">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">OS</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div>
                <span className="text-white font-bold text-2xl gradient-text">Out-Sec</span>
                <p className="text-xs text-gray-400">Cybersecurity Excellence</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 hover-lift ${
                    activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="btn-primary hover-lift">
                Get Started
              </button>
              
              <button 
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 glass-card rounded-2xl p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

// Enhanced Hero Component
export const Hero = () => {
  const [ref, isVisible] = useScrollReveal();
  const [typedText, setTypedText] = useState('');
  const fullText = "Securing Information with Sophisticated Strategies";

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isVisible, fullText]);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden gradient-bg-1">
      <MatrixRain />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl floating"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl floating-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl floating"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl floating-delayed"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto" ref={ref}>
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 hover-lift">
                  🛡️ BITWISE SECURITY
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
                <span className="block">Securing Information with</span>
                <span className="block gradient-text typewriter">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Out-Sec defends the digital world with cutting-edge strategies in cybersecurity, 
                  blockchain, and IoT. From deep analysis to secure development, we turn threats into 
                  fortified systems — <span className="gradient-text font-semibold">built by experts, driven by innovation.</span>
                </p>
              </div>
              
              <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="btn-primary text-lg px-8 py-4 hover-lift">
                    <span className="flex items-center">
                      Explore Our Work
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>
                  </button>
                  
                  <button className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover-lift">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

// Enhanced About Component
export const About = () => {
  const [ref, isVisible] = useScrollReveal();
  const [stats, setStats] = useState({ audits: 0, monitoring: 0, clients: 0 });

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;
      
      const targets = { audits: 500, monitoring: 24, clients: 150 };
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          audits: Math.floor(targets.audits * progress),
          monitoring: Math.floor(targets.monitoring * progress),
          clients: Math.floor(targets.clients * progress)
        });
        
        if (step >= steps) clearInterval(timer);
      }, increment);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} ref={ref}>
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                🏢 ABOUT OUT-SEC
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
            
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="glass-card p-6 text-center hover-lift">
                <h3 className="text-3xl font-bold gradient-text mb-2">{stats.audits}+</h3>
                <p className="text-gray-400 text-sm">Security Audits</p>
              </div>
              <div className="glass-card p-6 text-center hover-lift">
                <h3 className="text-3xl font-bold gradient-text mb-2">{stats.monitoring}/7</h3>
                <p className="text-gray-400 text-sm">Threat Monitoring</p>
              </div>
              <div className="glass-card p-6 text-center hover-lift">
                <h3 className="text-3xl font-bold gradient-text mb-2">{stats.clients}+</h3>
                <p className="text-gray-400 text-sm">Clients Protected</p>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="glass-card p-8 hover-lift">
                <h3 className="text-2xl font-bold text-white mb-8">
                  Strengthening Security with<br />
                  <span className="gradient-text">Sophisticated Strategies</span>
                </h3>
                
                <div className="relative overflow-hidden rounded-2xl mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1597733336794-12d05021d510?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85" 
                    alt="Cybersecurity Network" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {['Network Security', 'Malware Analysis', 'Penetration Testing', 'Hardware Security', 'Cryptography', 'Threat Hunting'].map((skill, index) => (
                    <span key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover-lift">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl floating"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl floating-delayed"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Services Component
export const Services = () => {
  const [ref, isVisible] = useScrollReveal();
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "Cryptography Integration",
      description: "Advanced encryption solutions for IoT, websites, systems, and networks with quantum-resistant algorithms",
      icon: "🔐",
      features: ["AES-256 Encryption", "RSA Key Management", "Quantum-Safe Protocols"],
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Malware Analysis & Development",
      description: "Expert analysis and development of security-focused malware solutions with AI-powered detection",
      icon: "🛡️",
      features: ["Dynamic Analysis", "Behavioral Detection", "Signature Generation"],
      image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Blockchain Development",
      description: "Secure blockchain solutions and smart contract development with DeFi integration",
      icon: "⛓️",
      features: ["Smart Contracts", "DeFi Solutions", "NFT Platforms"],
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Penetration Testing",
      description: "Comprehensive security testing for networks, systems, and applications with automated tools",
      icon: "🔍",
      features: ["Network Scanning", "Web App Testing", "Social Engineering"],
      image: "https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxoYWNraW5nfGVufDB8fHxibHVlfDE3NTI1NjA1NTN8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "IoT Security",
      description: "Specialized security solutions for Internet of Things devices and edge computing networks",
      icon: "📡",
      features: ["Device Authentication", "Edge Security", "Protocol Analysis"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Security Operations Center",
      description: "24/7 monitoring and incident response for comprehensive security coverage with AI analytics",
      icon: "🏢",
      features: ["24/7 Monitoring", "Incident Response", "Threat Intelligence"],
      image: "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxzZWN1cml0eXxlbnwwfHx8Ymx1ZXwxNzUyNjQ5NjIwfDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section id="services" className="py-24 gradient-bg-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🚀 OUR SERVICES
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Comprehensive <span className="gradient-text">Cybersecurity</span> Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced security solutions tailored to protect your digital assets from evolving threats
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`glass-card p-8 card-hover transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-5xl">{service.icon}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-lift">
                Learn More
              </button>
            </div>
          ))}
        </div>
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
      experience: "10+ years"
    },
    {
      name: "Ali Ejaz",
      role: "CEO",
      specialization: "Malware Developer / Analyst, Blockchain Expert / SEO Expert",
      image: "https://images.unsplash.com/photo-1589935447067-5531094415d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxzZWN1cml0eXxlbnwwfHx8Ymx1ZXwxNzUyNjQ5NjIwfDA&ixlib=rb-4.1.0&q=85",
      expertise: ["Malware Development", "Blockchain", "SEO"],
      experience: "8+ years"
    },
    {
      name: "Khizar Ali Shah",
      role: "Co-founder / COO",
      specialization: "Hardware & IoT Security Expert / Blockchain Expert / Reverse Engineer",
      image: "https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg",
      expertise: ["Hardware Security", "IoT Security", "Reverse Engineering"],
      experience: "9+ years"
    },
    {
      name: "Mazhar Saeed",
      role: "Co-founder / CTO",
      specialization: "Web Application Security Expert / Blockchain Developer",
      image: "https://images.unsplash.com/photo-1660644808226-a5b2e691fc51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85",
      expertise: ["Web Security", "Blockchain Development", "System Architecture"],
      experience: "7+ years"
    },
    {
      name: "Wahab Khan",
      role: "Co-founder / Lead Security Engineer",
      specialization: "Hardware Security Expert / Binary Exploitation Expert / Network Security Expert",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85",
      expertise: ["Hardware Security", "Binary Exploitation", "Network Security"],
      experience: "8+ years"
    },
    {
      name: "Talha Bilal",
      role: "CFO",
      specialization: "Hardware Security Expert / Firmware Analyst / Reverse Engineer",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85",
      expertise: ["Hardware Security", "Firmware Analysis", "Reverse Engineering"],
      experience: "6+ years"
    }
  ];

  return (
    <section id="team" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              👥 OUR TEAM
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cybersecurity professionals driving innovation and securing the digital future
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`glass-card p-6 card-hover cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 group">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white font-medium text-sm">{member.experience}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{member.specialization}</p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                      +{member.expertise.length - 2} more
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
                  <p className="text-gray-300 mb-6">{selectedMember.specialization}</p>
                  
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
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      title: "Advanced Threat Detection System",
      description: "AI-powered threat detection and response system with real-time monitoring capabilities and machine learning algorithms",
      tech: ["Python", "Machine Learning", "React", "Node.js", "TensorFlow"],
      category: "ai",
      github: "https://github.com/out-sec/threat-detection",
      image: "https://images.unsplash.com/photo-1660644808219-1f103401bc85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Blockchain Security Framework",
      description: "Comprehensive security framework for blockchain applications and smart contracts with automated vulnerability detection",
      tech: ["Solidity", "Web3", "JavaScript", "Security Tools", "Hardhat"],
      category: "blockchain",
      github: "https://github.com/out-sec/blockchain-security",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "IoT Security Suite",
      description: "Complete security solution for IoT devices and networks with encryption, device authentication, and monitoring",
      tech: ["C++", "Python", "IoT Protocols", "Encryption", "MQTT"],
      category: "iot",
      github: "https://github.com/out-sec/iot-security",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Penetration Testing Toolkit",
      description: "Professional penetration testing tools and automated security assessment framework with reporting capabilities",
      tech: ["Python", "Bash", "Security Tools", "Automation", "Nmap"],
      category: "security",
      github: "https://github.com/out-sec/pentest-toolkit",
      image: "https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxoYWNraW5nfGVufDB8fHxibHVlfDE3NTI1NjA1NTN8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Malware Analysis Platform",
      description: "Advanced malware analysis and reverse engineering platform with dynamic analysis and sandboxing capabilities",
      tech: ["Python", "Assembly", "Reverse Engineering", "Virtualization", "YARA"],
      category: "security",
      github: "https://github.com/out-sec/malware-analysis",
      image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Cryptography Library",
      description: "High-performance cryptography library with modern encryption algorithms and quantum-resistant protocols",
      tech: ["C++", "Python", "Cryptography", "Performance", "OpenSSL"],
      category: "crypto",
      github: "https://github.com/out-sec/crypto-lib",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'ai', label: 'AI & ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'blockchain', label: 'Blockchain', count: projects.filter(p => p.category === 'blockchain').length },
    { id: 'iot', label: 'IoT Security', count: projects.filter(p => p.category === 'iot').length },
    { id: 'security', label: 'Security Tools', count: projects.filter(p => p.category === 'security').length },
    { id: 'crypto', label: 'Cryptography', count: projects.filter(p => p.category === 'crypto').length }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 gradient-bg-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🚀 OUR PROJECTS
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Innovation in <span className="gradient-text">Cybersecurity</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge solutions and tools developed by our expert team
            </p>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover-lift ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className={`glass-card p-6 card-hover transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {categories.find(cat => cat.id === project.category)?.label || 'General'}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{project.title}</h3>
              <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 3).map((tech, techIndex) => (
                  <span key={techIndex} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex gap-3">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-lift"
                >
                  View Code
                </a>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition-all duration-300 hover-lift">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Blog Component
export const Blog = () => {
  const blogPosts = [
    {
      title: "Secure communication of IoT Devices using blockchain",
      author: "Mohsin Mukhtiar",
      category: "Blockchain, Network Security, IoT Security",
      date: "12/4/2024",
      readTime: "4 mins",
      excerpt: "Exploring how blockchain technology can enhance IoT device security and communication protocols..."
    },
    {
      title: "Advanced Malware Analysis Techniques",
      author: "Ali Ejaz",
      category: "Malware Analysis, Security Research",
      date: "11/28/2024",
      readTime: "6 mins",
      excerpt: "Deep dive into modern malware analysis methodologies and reverse engineering techniques..."
    },
    {
      title: "Hardware Security in Modern Systems",
      author: "Khizar Ali Shah",
      category: "Hardware Security, IoT Security",
      date: "11/22/2024",
      readTime: "5 mins",
      excerpt: "Understanding hardware-level security threats and mitigation strategies for modern systems..."
    },
    {
      title: "Web Application Security Best Practices",
      author: "Mazhar Saeed",
      category: "Web Security, Application Security",
      date: "11/15/2024",
      readTime: "7 mins",
      excerpt: "Comprehensive guide to securing web applications against modern attack vectors..."
    },
    {
      title: "Cryptography in Cybersecurity",
      author: "Muhammad Fazeel",
      category: "Cryptography, Security",
      date: "11/8/2024",
      readTime: "5 mins",
      excerpt: "Exploring the role of cryptography in modern cybersecurity implementations..."
    },
    {
      title: "Network Penetration Testing Methodologies",
      author: "Wahab Khan",
      category: "Penetration Testing, Network Security",
      date: "11/1/2024",
      readTime: "8 mins",
      excerpt: "Advanced techniques and methodologies for effective network penetration testing..."
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Latest Blog Posts</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest insights and research in cybersecurity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="mb-4">
                <span className="text-blue-400 text-sm font-medium">{post.category}</span>
                <div className="flex items-center text-gray-400 text-xs mt-1">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
              <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                Read More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Component
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to secure your digital assets? Contact our cybersecurity experts today
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium">contact@out-sec.org</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🌐</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Website</p>
                  <p className="text-white font-medium">www.out-sec.org</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['LinkedIn', 'GitHub', 'Twitter', 'Discord'].map((platform) => (
                  <a 
                    key={platform}
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                  >
                    {platform.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-gray-400 text-sm font-medium mb-2">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="penetration-testing">Penetration Testing</option>
                  <option value="malware-analysis">Malware Analysis</option>
                  <option value="blockchain-security">Blockchain Security</option>
                  <option value="iot-security">IoT Security</option>
                  <option value="security-consultation">Security Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
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

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">OS</span>
              </div>
              <span className="text-white font-bold text-xl">Out-Sec</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Defending the digital world with cutting-edge strategies in cybersecurity, 
              blockchain, and IoT security solutions.
            </p>
            <div className="flex space-x-4">
              {['LinkedIn', 'GitHub', 'Twitter', 'Discord', 'Instagram'].map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  {platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Penetration Testing</a></li>
              <li><a href="#" className="hover:text-blue-400">Malware Analysis</a></li>
              <li><a href="#" className="hover:text-blue-400">Blockchain Security</a></li>
              <li><a href="#" className="hover:text-blue-400">IoT Security</a></li>
              <li><a href="#" className="hover:text-blue-400">Security Consultation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Our Team</a></li>
              <li><a href="#" className="hover:text-blue-400">Projects</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Out-Sec. All rights reserved. Built with expertise, driven by innovation.</p>
        </div>
      </div>
    </footer>
  );
};