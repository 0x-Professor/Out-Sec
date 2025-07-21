import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: "Advanced Cryptography Solutions",
    description: "Enterprise-grade cryptographic implementations featuring post-quantum resistant algorithms, secure key management, and hardware security module (HSM) integration. Our solutions ensure data confidentiality, integrity, and authenticity across all digital assets.",
    detailedDescription: "Our cryptography solutions provide military-grade security for enterprise environments. We implement cutting-edge post-quantum cryptographic algorithms that remain secure against future quantum computing threats. Our comprehensive approach includes advanced key lifecycle management, secure hardware module integration, and compliance with international standards including FIPS 140-3 Level 4. We offer end-to-end encryption solutions that protect data at rest, in transit, and in use, ensuring your sensitive information remains secure against even the most sophisticated attacks.",
    icon: "🔐",
    gradient: "from-slate-800 to-slate-900",
    accent: "#3b82f6",
    category: "CRYPTOGRAPHY",
    features: [
      "Quantum-resistant algorithms",
      "FIPS 140-3 compliant",
      "HSM integration",
      "End-to-end encryption"
    ]
  },
  {
    title: "Malware Analysis & Reverse Engineering",
    description: "Comprehensive analysis of sophisticated malware using static and dynamic techniques. We provide detailed reports on malware behavior, capabilities, and indicators of compromise (IoCs) to strengthen your security posture.",
    detailedDescription: "Our malware analysis team employs advanced reverse engineering techniques to dissect the most complex threats. Using state-of-the-art sandboxing environments and static analysis tools, we uncover malware capabilities, communication protocols, and attack vectors. Our experts provide comprehensive threat intelligence reports including YARA rules, IOCs, and mitigation strategies. We specialize in analyzing APT campaigns, zero-day exploits, and sophisticated polymorphic malware that traditional security tools might miss.",
    icon: "🛡️",
    gradient: "from-slate-800 to-slate-900",
    accent: "#8b5cf6",
    category: "MALWARE ANALYSIS",
    features: [
      "Behavioral analysis",
      "Memory forensics",
      "YARA rule development",
      "Threat intelligence correlation"
    ]
  },
  {
    title: "Blockchain Security & Smart Contract Audits",
    description: "End-to-end security assessments for blockchain networks, smart contracts, and decentralized applications. Our team identifies vulnerabilities and provides remediation strategies to protect your blockchain assets.",
    detailedDescription: "Our blockchain security specialists conduct thorough audits of smart contracts, DeFi protocols, and blockchain infrastructure. We identify common vulnerabilities such as reentrancy attacks, integer overflows, and access control issues. Our comprehensive approach includes automated scanning, manual code review, and economic modeling to ensure your blockchain applications are secure and economically sound. We provide detailed remediation guidance and post-deployment monitoring services.",
    icon: "⛓️",
    gradient: "from-slate-800 to-slate-900",
    accent: "#10b981",
    category: "BLOCKCHAIN",
    features: [
      "Smart contract auditing",
      "Consensus mechanism security",
      "DeFi protocol analysis",
      "Wallet security"
    ]
  },
  {
    title: "Penetration Testing Services",
    description: "Simulated cyber attacks to identify and remediate vulnerabilities before they can be exploited. Our certified ethical hackers use industry-standard methodologies to test your security defenses.",
    detailedDescription: "Our penetration testing services simulate real-world attack scenarios to identify vulnerabilities in your systems. Our certified ethical hackers follow industry-standard methodologies including OWASP, NIST, and PTES frameworks. We conduct comprehensive testing across web applications, network infrastructure, wireless systems, and social engineering vectors. Each engagement includes detailed vulnerability assessment, exploitation demonstrations, and prioritized remediation recommendations with business impact analysis.",
    icon: "🎯",
    gradient: "from-slate-800 to-slate-900",
    accent: "#f59e0b",
    category: "PENETRATION TESTING",
    features: [
      "Web application testing",
      "Network penetration testing",
      "Social engineering",
      "Red team exercises"
    ]
  },
  {
    title: "Cloud Security Architecture",
    description: "Comprehensive security solutions for multi-cloud and hybrid environments. We design and implement secure cloud architectures with defense-in-depth strategies tailored to your specific cloud service model.",
    detailedDescription: "Our cloud security architects design and implement robust security frameworks for AWS, Azure, GCP, and hybrid cloud environments. We provide comprehensive cloud security posture management, identity and access management solutions, and automated compliance monitoring. Our defense-in-depth approach includes network segmentation, encryption key management, container security, and serverless security. We help organizations achieve compliance with SOC 2, ISO 27001, and industry-specific regulations.",
    icon: "☁️",
    gradient: "from-slate-800 to-slate-900",
    accent: "#8b5cf6",
    category: "CLOUD SECURITY",
    features: [
      "Cloud Security Posture Management",
      "Identity & Access Management",
      "Data protection",
      "Compliance as Code"
    ]
  },
  {
    title: "Threat Intelligence & Hunting",
    description: "Proactive identification and mitigation of emerging threats through advanced threat intelligence and hunting services. We help organizations stay ahead of sophisticated adversaries.",
    detailedDescription: "Our threat intelligence and hunting services provide proactive defense against advanced persistent threats and emerging attack vectors. We leverage machine learning algorithms, behavioral analytics, and threat intelligence feeds to identify indicators of compromise before they become incidents. Our team conducts hypothesis-driven threat hunting, develops custom detection rules, and provides strategic threat intelligence briefings to help organizations understand their threat landscape and adversary tactics.",
    icon: "🔍",
    gradient: "from-slate-800 to-slate-900",
    accent: "#06b6d4",
    category: "THREAT INTELLIGENCE",
    features: [
      "Threat intelligence platforms",
      "IOC management",
      "Threat hunting",
      "Incident response"
    ]
  }
];

const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl mr-4"
                  style={{ backgroundColor: `${service.accent}15` }}
                >
                  {service.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-400 mb-1">{service.category}</div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Overview</h4>
              <p className="text-gray-300 leading-relaxed mb-6">{service.detailedDescription}</p>
              
              <h4 className="text-lg font-semibold text-white mb-4">Key Capabilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-2 h-2 rounded-full mr-3"
                      style={{ backgroundColor: service.accent }}
                    />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300"
                style={{
                  backgroundColor: service.accent,
                  boxShadow: `0 4px 14px ${service.accent}40`
                }}
                onClick={() => {
                  // Add contact/consultation logic here
                  alert(`Contact us about ${service.title}`);
                }}
              >
                Request Consultation
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl font-medium text-gray-300 border border-slate-600 hover:border-slate-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ServiceCard = ({ service, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className="relative mb-24 last:mb-0"
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 100
        }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: index * 0.1
        }}
      >
        <motion.div
          className={`relative bg-gradient-to-br ${service.gradient} border border-slate-700/50 rounded-2xl overflow-hidden group`}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3, type: "spring", stiffness: 300 }
          }}
          style={{
            boxShadow: isHovered 
              ? `0 25px 50px -12px ${service.accent}20, 0 0 0 1px ${service.accent}10`
              : '0 8px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: `linear-gradient(135deg, ${service.accent}40 0%, transparent 70%)`
            }}
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="relative p-8 lg:p-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <motion.div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl mr-6 border border-slate-600/50"
                  style={{ 
                    backgroundColor: `${service.accent}08`,
                    borderColor: `${service.accent}20`
                  }}
                  animate={isHovered ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-gray-400 mb-2">
                    {service.category}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>
              
              <motion.div
                className="text-gray-500"
                animate={isHovered ? { rotate: 15 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-8 leading-relaxed text-base lg:text-lg">
              {service.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {service.features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0,
                      x: isVisible ? 0 : -20
                    }}
                    transition={{ 
                      delay: (index * 0.1) + (i * 0.05),
                      duration: 0.5
                    }}
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                      style={{ backgroundColor: service.accent }}
                    />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => setShowModal(true)}
              className="group flex items-center px-6 py-3 text-sm font-medium text-white rounded-xl transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundColor: `${service.accent}15`,
                border: `1px solid ${service.accent}30`,
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: `0 8px 25px ${service.accent}25`
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Learn More</span>
              <motion.svg 
                className="w-4 h-4 ml-2 relative z-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
              
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ backgroundColor: service.accent }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: 1, 
                  opacity: 0.1,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <ServiceModal 
        service={service}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

const EnhancedServices = () => {
  const containerRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Handle scroll-based card visibility
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;
      const windowCenter = window.innerHeight / 2;
      
      // Calculate how far we've scrolled through the container
      const scrollProgress = Math.max(0, Math.min(1, (windowCenter - containerRect.top) / containerRect.height));
      
      // Show cards progressively based on scroll
      const newVisibleCards = [];
      services.forEach((_, index) => {
        const cardThreshold = (index + 1) / services.length;
        if (scrollProgress >= cardThreshold * 0.3) {
          newVisibleCards.push(index);
        }
      });
      
      setVisibleCards(newVisibleCards);
      
      // Update active index based on scroll
      const newActiveIndex = Math.min(
        services.length - 1,
        Math.floor(scrollProgress * services.length * 1.2)
      );
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-32 overflow-hidden bg-slate-950"
    >
      {/* Professional background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-24 bg-slate-700 relative">
            <motion.div
              className="absolute top-0 left-0 w-px bg-gradient-to-b from-cyan-400 to-blue-500"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
              }}
            />
          </div>
          <div className="flex flex-col space-y-2">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  visibleCards.includes(index) 
                    ? 'bg-cyan-400 scale-125' 
                    : 'bg-slate-600'
                }`}
                onClick={() => {
                  document.querySelector(`#service-${index}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-cyan-400 bg-cyan-900/10 border border-cyan-500/20 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2" />
            PROFESSIONAL SECURITY SERVICES
          </motion.div>
          
          <h1 className="text-4xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Enterprise-Grade
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cybersecurity Solutions
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Protecting your digital infrastructure with military-grade security protocols, 
            advanced threat detection, and comprehensive risk management strategies.
          </p>
        </motion.div>
        
        {/* Services */}
        <div className="relative">
          {services.map((service, index) => (
            <div key={index} id={`service-${index}`}>
              <ServiceCard 
                service={service} 
                index={index} 
                isVisible={visibleCards.includes(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;