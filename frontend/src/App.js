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

// Enhanced Research Section
const ResearchSection = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    // Mock research papers data
    const mockPapers = [
      {
        id: 1,
        title: "Advanced Persistent Threats in IoT Networks: Detection and Mitigation",
        authors: "Mohsin Mukhtiar, Khizar Ali Shah",
        abstract: "This paper presents a comprehensive analysis of APT attacks targeting IoT infrastructures...",
        date: "2024-12-15",
        category: "IoT Security",
        downloads: 1250
      },
      {
        id: 2,
        title: "Blockchain-based Identity Management for Zero-Trust Architecture",
        authors: "Ali Ejaz, Mazhar Saeed",
        abstract: "We propose a novel blockchain-based identity management system for zero-trust environments...",
        date: "2024-11-20",
        category: "Blockchain Security",
        downloads: 980
      },
      {
        id: 3,
        title: "AI-Powered Malware Detection Using Deep Learning",
        authors: "Talha Bilal, Wahab Khan",
        abstract: "This research explores the application of deep learning techniques for malware detection...",
        date: "2024-10-10",
        category: "AI Security",
        downloads: 1560
      }
    ];
    setPapers(mockPapers);
  }, []);

  return (
    <section id="research" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Research & Publications</h2>
          <p className="text-xl text-gray-300">Cutting-edge research in cybersecurity and emerging technologies</p>
        </motion.div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
          {papers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-cyan-400 mb-2">By {paper.authors}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{paper.abstract}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm mb-2">
                    {paper.category}
                  </div>
                  <div className="text-gray-400 text-sm">{paper.downloads} downloads</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{paper.date}</span>
                <div className="flex space-x-3">
                  <motion.button 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm hover:from-cyan-600 hover:to-blue-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download PDF
                  </motion.button>
                  <motion.button 
                    className="border border-cyan-400 text-cyan-400 px-4 py-2 rounded-full text-sm hover:bg-cyan-400 hover:text-gray-900 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Blog Section with Firebase Integration
const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(6));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
      // Fallback to mock data
      setPosts([
        {
          id: 1,
          title: "The Future of Cybersecurity: AI and Machine Learning",
          excerpt: "Exploring how AI and ML are revolutionizing cybersecurity defense mechanisms...",
          author: "Mohsin Mukhtiar",
          category: "AI Security",
          readTime: "5 min read",
          date: "2024-12-20",
          image: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
        },
        {
          id: 2,
          title: "Zero-Trust Architecture: Implementation Best Practices",
          excerpt: "A comprehensive guide to implementing zero-trust security models in enterprise environments...",
          author: "Ali Ejaz",
          category: "Enterprise Security",
          readTime: "8 min read",
          date: "2024-12-18",
          image: "https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
        },
        {
          id: 3,
          title: "Blockchain Security: Challenges and Solutions",
          excerpt: "Addressing the security challenges in blockchain technology and DeFi applications...",
          author: "Khizar Ali Shah",
          category: "Blockchain",
          readTime: "6 min read",
          date: "2024-12-15",
          image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI3MzY4NDd8MA&ixlib=rb-4.1.0&q=85"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        ...newPost,
        createdAt: new Date(),
        readTime: `${Math.floor(Math.random() * 10) + 3} min read`
      });
      setNewPost({ title: '', excerpt: '', content: '', author: '', category: '' });
      setShowAddForm(false);
      loadPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <section id="blog" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Latest from Our Blog</h2>
          <p className="text-xl text-gray-300">Stay updated with the latest cybersecurity trends and insights</p>
          
          <motion.button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAddForm ? 'Cancel' : 'Add New Post'}
          </motion.button>
        </motion.div>

        {/* Add Post Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
            >
              <form onSubmit={handleAddPost} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={newPost.author}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Category"
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <textarea
                  placeholder="Content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={6}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Publish Post
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">Loading posts...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all group"
                whileHover={{ scale: 1.02 }}
              >
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {post.author?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">{post.author}</p>
                        <p className="text-gray-400 text-xs">{post.date}</p>
                      </div>
                    </div>
                    
                    <motion.button 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Read More →
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Rest of the components remain the same but with enhanced animations
const ThreatMap = () => {
  const [threats, setThreats] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    critical: 3,
    high: 7,
    medium: 12,
    total: 22
  });

  useEffect(() => {
    const mockThreats = [
      { id: 1, location: 'New York', type: 'Malware', severity: 'High', x: 20, y: 30, country: 'USA' },
      { id: 2, location: 'London', type: 'Phishing', severity: 'Medium', x: 50, y: 20, country: 'UK' },
      { id: 3, location: 'Tokyo', type: 'DDoS', severity: 'Critical', x: 80, y: 40, country: 'Japan' },
      { id: 4, location: 'Sydney', type: 'Ransomware', severity: 'High', x: 85, y: 70, country: 'Australia' },
      { id: 5, location: 'Berlin', type: 'Data Breach', severity: 'Medium', x: 52, y: 25, country: 'Germany' },
      { id: 6, location: 'Mumbai', type: 'APT', severity: 'Critical', x: 72, y: 50, country: 'India' },
      { id: 7, location: 'São Paulo', type: 'Botnet', severity: 'High', x: 30, y: 65, country: 'Brazil' },
    ];
    setThreats(mockThreats);

    // Update stats periodically
    const interval = setInterval(() => {
      setGlobalStats(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 3) + 1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500 shadow-red-500/50';
      case 'High': return 'bg-orange-500 shadow-orange-500/50';
      case 'Medium': return 'bg-yellow-500 shadow-yellow-500/50';
      default: return 'bg-green-500 shadow-green-500/50';
    }
  };

  return (
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Global Threat Intelligence</h2>
          <p className="text-xl text-gray-300">Real-time monitoring of cybersecurity threats worldwide</p>
        </motion.div>
        
        <motion.div 
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative h-96 bg-gray-800 rounded-xl overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MjczNjg1NHww&ixlib=rb-4.1.0&q=85"
              alt="Global Threat Map"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            
            {threats.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`absolute w-6 h-6 rounded-full ${getSeverityColor(threat.severity)} cursor-pointer shadow-lg group`}
                style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                whileHover={{ scale: 1.5, zIndex: 10 }}
              >
                <div className={`absolute inset-0 rounded-full ${getSeverityColor(threat.severity)} animate-ping`}></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  <div className="font-semibold">{threat.location}, {threat.country}</div>
                  <div className="text-gray-300">{threat.type} - {threat.severity}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-700"
              whileHover={{ scale: 1.05, borderColor: 'rgb(239 68 68 / 0.5)' }}
            >
              <div className="text-3xl font-bold text-red-400 mb-2">{globalStats.critical}</div>
              <div className="text-sm text-gray-300">Critical Threats</div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-700"
              whileHover={{ scale: 1.05, borderColor: 'rgb(249 115 22 / 0.5)' }}
            >
              <div className="text-3xl font-bold text-orange-400 mb-2">{globalStats.high}</div>
              <div className="text-sm text-gray-300">High Priority</div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-700"
              whileHover={{ scale: 1.05, borderColor: 'rgb(234 179 8 / 0.5)' }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">{globalStats.medium}</div>
              <div className="text-sm text-gray-300">Medium Priority</div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-700"
              whileHover={{ scale: 1.05, borderColor: 'rgb(6 182 212 / 0.5)' }}
            >
              <motion.div 
                className="text-3xl font-bold text-cyan-400 mb-2"
                key={globalStats.total}
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {globalStats.total}
              </motion.div>
              <div className="text-sm text-gray-300">Total Detected</div>
            </motion.div>
          </div>
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

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <Navigation />
      <HeroSection />
      <ThreatMap />
      <ServicesSection />
      <ResearchSection />
      <BlogSection />
      <AdvancedChatbot />
    </div>
  );
}

export default App;