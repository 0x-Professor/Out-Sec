import React, { useState, useEffect } from "react";

// Header Component
export const Header = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">OS</span>
            </div>
            <span className="text-white font-bold text-xl">Out-Sec</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

// Hero Component
export const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30"></div>
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1660644808219-1f103401bc85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-400 text-sm font-medium mb-4 tracking-wide uppercase">
            BITWISE SECURITY
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Securing Information with<br />
            <span className="text-blue-400">Sophisticated Strategies</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Out-Sec defends the digital world with cutting-edge strategies in cybersecurity, 
            blockchain, and IoT. From deep analysis to secure development, we turn threats into 
            fortified systems — built by experts, driven by innovation.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
            Our work →
          </button>
        </div>
      </div>
    </section>
  );
};

// About Component
export const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Securing Systems with<br />
              <span className="text-blue-400">Strategic Insight</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              OutSecure is a comprehensive cybersecurity platform designed to protect digital 
              assets from modern threats. It combines advanced encryption, real-time threat 
              detection, and robust user authentication to ensure secure operations for individuals 
              and organizations.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              With a focus on usability and reliability, OutSecure offers tools like 
              vulnerability scanning and detailed security analytics, providing users with actionable 
              insights for safeguarding their systems.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">500+</h3>
                <p className="text-gray-300 text-sm">Security Audits</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">24/7</h3>
                <p className="text-gray-300 text-sm">Threat Monitoring</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">
                Strengthening Security with<br />
                <span className="text-blue-400">Sophisticated Strategies</span>
              </h3>
              <div 
                className="w-full h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1597733336794-12d05021d510?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Network Security', 'Malware Analysis', 'Penetration Testing', 'Hardware', 'Cryptography', 'Threat Hunting'].map((skill, index) => (
                  <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Component
export const Services = () => {
  const services = [
    {
      title: "Cryptography Integration",
      description: "Advanced encryption solutions for IoT, websites, systems, and networks",
      icon: "🔐",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Malware Analysis & Development",
      description: "Expert analysis and development of security-focused malware solutions",
      icon: "🛡️",
      image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Blockchain Development",
      description: "Secure blockchain solutions and smart contract development",
      icon: "⛓️",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Penetration Testing",
      description: "Comprehensive security testing for networks, systems, and applications",
      icon: "🔍",
      image: "https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxoYWNraW5nfGVufDB8fHxibHVlfDE3NTI1NjA1NTN8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "IoT Security",
      description: "Specialized security solutions for Internet of Things devices and networks",
      icon: "📡",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU4OXww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Security Operations Center",
      description: "24/7 monitoring and incident response for comprehensive security coverage",
      icon: "🏢",
      image: "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxzZWN1cml0eXxlbnwwfHx8Ymx1ZXwxNzUyNjQ5NjIwfDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive cybersecurity solutions tailored to protect your digital assets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div 
                className="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-6 flex items-center justify-center text-4xl"
                style={{
                  backgroundImage: `url('${service.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="bg-black/50 w-full h-full rounded-lg flex items-center justify-center">
                  <span className="text-6xl">{service.icon}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Component
export const Team = () => {
  const teamMembers = [
    {
      name: "Mohsin Mukhtiar Lashari",
      role: "Founder",
      specialization: "Network Security / Malware Analysis / SOC",
      image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Ali Ejaz",
      role: "CEO",
      specialization: "Malware Developer / Analyst, Blockchain Expert / SEO Expert",
      image: "https://images.unsplash.com/photo-1589935447067-5531094415d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxzZWN1cml0eXxlbnwwfHx8Ymx1ZXwxNzUyNjQ5NjIwfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Khizar Ali Shah",
      role: "Co-founder / COO",
      specialization: "Hardware & IoT Security Expert / Blockchain Expert / Reverse Engineer",
      image: "https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg"
    },
    {
      name: "Mazhar Saeed",
      role: "Co-founder / CTO",
      specialization: "Web Application Security Expert / Blockchain Developer",
      image: "https://images.unsplash.com/photo-1660644808226-a5b2e691fc51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI2NDk1ODJ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Wahab Khan",
      role: "Co-founder / Lead Security Engineer",
      specialization: "Hardware Security Expert / Binary Exploitation Expert / Network Security Expert",
      image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Talha Bilal",
      role: "CFO",
      specialization: "Hardware Security Expert / Firmware Analyst / Reverse Engineer",
      image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjY0OTU5OHww&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Expert Team</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the cybersecurity experts driving innovation and securing the digital future
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div 
                className="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-6"
                style={{
                  backgroundImage: `url('${member.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-blue-400 font-medium mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.specialization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Component
export const Projects = () => {
  const projects = [
    {
      title: "Advanced Threat Detection System",
      description: "AI-powered threat detection and response system with real-time monitoring capabilities",
      tech: ["Python", "Machine Learning", "React", "Node.js"],
      github: "https://github.com/out-sec/threat-detection"
    },
    {
      title: "Blockchain Security Framework",
      description: "Comprehensive security framework for blockchain applications and smart contracts",
      tech: ["Solidity", "Web3", "JavaScript", "Security Tools"],
      github: "https://github.com/out-sec/blockchain-security"
    },
    {
      title: "IoT Security Suite",
      description: "Complete security solution for IoT devices and networks with encryption and monitoring",
      tech: ["C++", "Python", "IoT Protocols", "Encryption"],
      github: "https://github.com/out-sec/iot-security"
    },
    {
      title: "Penetration Testing Toolkit",
      description: "Professional penetration testing tools and automated security assessment framework",
      tech: ["Python", "Bash", "Security Tools", "Automation"],
      github: "https://github.com/out-sec/pentest-toolkit"
    },
    {
      title: "Malware Analysis Platform",
      description: "Advanced malware analysis and reverse engineering platform with dynamic analysis",
      tech: ["Python", "Assembly", "Reverse Engineering", "Virtualization"],
      github: "https://github.com/out-sec/malware-analysis"
    },
    {
      title: "Cryptography Library",
      description: "High-performance cryptography library with modern encryption algorithms",
      tech: ["C++", "Python", "Cryptography", "Performance"],
      github: "https://github.com/out-sec/crypto-lib"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Innovative cybersecurity solutions and tools developed by our expert team
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                View on GitHub →
              </a>
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