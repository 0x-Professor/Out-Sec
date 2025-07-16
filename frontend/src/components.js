import React, { useState, useEffect, useRef } from "react";

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

  return <div className="progress-bar" style={{ width: `${progress}%` }}></div>;
};

// 3D Cyber Orb Component
const CyberOrb = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    let animationId;
    let rotation = 0;

    const drawOrb = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;
      
      // Apply mouse-based rotation
      const rotX = mousePos.y * 0.5;
      const rotY = mousePos.x * 0.5;
      
      // Create cyber orb effect
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation + rotY);
      
      // Outer glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2);
      gradient.addColorStop(0, 'rgba(0, 221, 235, 0.3)');
      gradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.2)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-radius * 2, -radius * 2, radius * 4, radius * 4);
      
      // Main orb
      const orbGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      orbGradient.addColorStop(0, 'rgba(0, 221, 235, 0.8)');
      orbGradient.addColorStop(0.7, 'rgba(30, 58, 138, 0.6)');
      orbGradient.addColorStop(1, 'rgba(147, 51, 234, 0.4)');
      
      ctx.fillStyle = orbGradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Grid lines
      ctx.strokeStyle = 'rgba(0, 221, 235, 0.6)';
      ctx.lineWidth = 2;
      for (let i = -radius; i <= radius; i += 20) {
        ctx.beginPath();
        ctx.moveTo(-radius, i);
        ctx.lineTo(radius, i);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(i, -radius);
        ctx.lineTo(i, radius);
        ctx.stroke();
      }
      
      ctx.restore();
      
      rotation += 0.01;
      animationId = requestAnimationFrame(drawOrb);
    };

    drawOrb();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30"
      style={{ filter: 'blur(1px)' }}
    />
  );
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

// Live Chat Widget
const LiveChatWidget = () => {
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
            <h3 className="text-white font-semibold">Out-Sec Support</h3>
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
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
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
        isScrolled ? 'glass-nav shadow-2xl' : 'bg-transparent'
      }`} role="banner">
        <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 hover-scale cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
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
                  className={`relative text-sm font-medium transition-all duration-300 hover-scale ${
                    activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="btn-primary hover-scale" aria-label="Get started with Out-Sec">
                Get Started
              </button>
              
              <button 
                className="md:hidden text-white hover-scale"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 glass-card rounded-2xl p-4" role="menu">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 text-gray-300 hover:text-blue-400 transition-colors"
                  role="menuitem"
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
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const keywords = ["Secure", "Protect", "Defend", "Fortify"];

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentKeyword((prev) => (prev + 1) % keywords.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible, keywords.length]);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden gradient-bg-animated" role="main">
      <CyberOrb />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl floating"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl floating-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl floating"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl floating-slow"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto" ref={ref}>
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 hover-scale">
                  🛡️ BITWISE SECURITY
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
                <span className="block">Securing the Future with</span>
                <span className="block gradient-text">
                  Next-Gen <span className="typewriter">{keywords[currentKeyword]}</span> Cybersecurity
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
                  <button className="btn-primary text-lg px-8 py-4 hover-scale group">
                    <span className="flex items-center">
                      Explore Our Work
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>
                  </button>
                  
                  <button className="btn-secondary text-lg px-8 py-4 hover-scale">
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

// Enhanced About Component with Timeline
export const About = () => {
  const [ref, isVisible] = useScrollReveal();
  const [stats, setStats] = useState({ audits: 0, monitoring: 0, clients: 0, threats: 0 });
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const timeline = [
    { year: '2020', title: 'Foundation', description: 'Out-Sec was founded with a vision to revolutionize cybersecurity' },
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
                ABOUT OUT-SEC
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
        <div className="text-center mb-20" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <SVGIcon type="security" className="w-4 h-4 inline mr-2" />
              OUR SERVICES
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Comprehensive <span className="gradient-text">Cybersecurity</span> Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced security solutions tailored to protect your digital assets from evolving threats
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/20 transition-all duration-300"
            />
            <SVGIcon type="penetration" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        
        <div className="grid-12 gap-8">
          {filteredServices.map((service, index) => (
            <div 
              key={index} 
              className={`col-12 md:col-6 lg:col-4 glass-card p-8 card-interactive transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 group">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <SVGIcon type={service.icon} className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Key Features:</h4>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-scale">
                Learn More
              </button>
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

// Enhanced Blog Component
export const Blog = () => {
  const [ref, isVisible] = useScrollReveal();
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section id="blog" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              📚 BLOG & INSIGHTS
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Latest <span className="gradient-text">Cybersecurity</span> Insights
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest research, techniques, and insights in cybersecurity
            </p>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover-lift ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article 
              key={index} 
              className={`glass-card card-hover transition-all duration-500 ${
                post.featured ? 'md:col-span-2 lg:col-span-2' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 group">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                    post.featured ? 'h-64' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                {post.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <span className="text-blue-400">{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className={`font-bold text-white mb-4 line-clamp-2 ${
                  post.featured ? 'text-2xl' : 'text-xl'
                }`}>
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories.map((cat, catIndex) => (
                    <span key={catIndex} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                      {cat}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-lift">
                  Read Article
                </button>
              </div>
            </article>
          ))}
        </div>
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
    
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "contact@out-sec.org",
      subvalue: "info@out-sec.org"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+1 (555) 123-4567",
      subvalue: "24/7 Emergency Line"
    },
    {
      icon: "🌐",
      label: "Website",
      value: "www.out-sec.org",
      subvalue: "Visit our main site"
    },
    {
      icon: "📍",
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
    <section id="contact" className="py-24 gradient-bg-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              📞 GET IN TOUCH
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to <span className="gradient-text">Secure</span> Your Future?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Contact our cybersecurity experts today and let's build a safer digital world together
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-3xl font-bold text-white mb-8">Let's Connect</h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 glass-card p-4 hover-lift">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                    {info.icon}
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
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-lift"
                  >
                    {platform.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
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
                  
                  <div>
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
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover-lift ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
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
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-lift"
                  title={platform.name}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
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