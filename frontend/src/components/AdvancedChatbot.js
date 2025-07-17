import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Shield, Zap, Lock, Settings } from 'lucide-react';

const AdvancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm OutSecure AI Assistant. I can help you with cybersecurity questions, explain our services, and provide security recommendations. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('general');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses = {
    // General responses
    general: [
      "OutSecure provides cutting-edge cybersecurity solutions to protect your digital assets. Would you like to know more about our specific services?",
      "I can help you understand various cybersecurity concepts. What specific area are you interested in?",
      "Our team of security experts is ready to assist you with any cybersecurity concerns. What would you like to know?",
    ],
    
    // Service-related responses
    services: [
      "Our core services include: 1) Penetration Testing 2) Malware Analysis 3) Security Operations Center (SOC) 4) Blockchain Security 5) IoT Security 6) Forensics Analysis. Which one interests you most?",
      "We offer comprehensive cybersecurity solutions including threat detection, incident response, security audits, and compliance assessments.",
      "Our Security Operations Center provides 24/7 monitoring and threat response. Would you like to schedule a demo?",
    ],

    // Technical responses
    technical: [
      "Our CynsesAI tool uses advanced machine learning algorithms to analyze network traffic and identify potential threats in real-time.",
      "We employ various cybersecurity frameworks including NIST, ISO 27001, and OWASP guidelines to ensure comprehensive protection.",
      "Our malware analysis involves static and dynamic analysis techniques, sandbox environments, and behavioral monitoring.",
    ],

    // Security tips
    security_tips: [
      "🔒 Always use strong, unique passwords for each account. Consider using a password manager.",
      "🛡️ Enable two-factor authentication (2FA) on all your important accounts.",
      "🔄 Keep your software and systems updated with the latest security patches.",
      "📧 Be cautious with email attachments and links, especially from unknown senders.",
    ],

    // Threat information
    threats: [
      "Current major threats include ransomware, phishing attacks, supply chain attacks, and zero-day exploits.",
      "Our threat intelligence shows increased activity in social engineering and AI-powered attacks.",
      "We're tracking emerging threats in cloud security, IoT vulnerabilities, and cryptocurrency-related scams.",
    ]
  };

  const quickActions = [
    { id: 'services', label: 'Our Services', icon: Shield },
    { id: 'security-tips', label: 'Security Tips', icon: Lock },
    { id: 'threats', label: 'Current Threats', icon: Zap },
    { id: 'contact', label: 'Contact Us', icon: Settings }
  ];

  const detectIntent = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do')) {
      return 'services';
    }
    if (lowerMessage.includes('malware') || lowerMessage.includes('technical') || lowerMessage.includes('how')) {
      return 'technical';
    }
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('secure')) {
      return 'security_tips';
    }
    if (lowerMessage.includes('threat') || lowerMessage.includes('attack') || lowerMessage.includes('danger')) {
      return 'threats';
    }
    return 'general';
  };

  const generateResponse = (intent) => {
    const responses = mockResponses[intent] || mockResponses.general;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const intent = detectIntent(input);
      const response = generateResponse(intent);
      
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'message',
        intent: intent
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setCurrentTopic(intent);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickAction = (actionId) => {
    let response = '';
    
    switch(actionId) {
      case 'services':
        response = generateResponse('services');
        break;
      case 'security-tips':
        response = generateResponse('security_tips');
        break;
      case 'threats':
        response = generateResponse('threats');
        break;
      case 'contact':
        response = "You can reach us at info@outsecure.com or schedule a consultation through our contact form. Our team is available 24/7 for urgent security matters.";
        break;
      default:
        response = generateResponse('general');
    }

    const botMessage = {
      id: messages.length + 1,
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      type: 'message',
      intent: actionId
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg max-w-xs">
      <Bot className="w-5 h-5 text-cyan-400" />
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">OutSecure AI</h3>
                  <p className="text-cyan-100 text-sm">Cybersecurity Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-100 text-xs">Online</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-gray-800 border-b border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    <action.icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about cybersecurity..."
                  className="flex-1 bg-gray-800 text-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded-full hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedChatbot;