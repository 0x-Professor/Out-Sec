import React from 'react';
import { motion } from 'framer-motion';

// Professional 3D Earth Background Component for Hero Section
const HackerScene3D = ({ isProfessionalBackground = false }) => {
  if (isProfessionalBackground) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* 3D Earth Model Container */}
        <div className="absolute inset-0 w-full h-full">
          <div className="sketchfab-embed-wrapper w-full h-full">
            <iframe 
              title="Professional Earth Security Visualization" 
              frameBorder="0" 
              allowFullScreen 
              mozallowfullscreen="true" 
              webkitallowfullscreen="true" 
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true" 
              web-share="true"
              src="https://sketchfab.com/models/17cf917d160645b6a57a09c420ed647d/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&camera=0&preload=1&transparent=1"
              className="w-full h-full scale-150 transform origin-center"
              style={{ 
                border: 'none',
                minWidth: '150%',
                minHeight: '150%',
                objectFit: 'cover',
                filter: 'brightness(0.6) contrast(1.3) saturate(1.2) hue-rotate(10deg)',
                opacity: 0.7
              }}
            />
          </div>
        </div>

        {/* Professional Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/50 to-purple-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40"></div>
        
        {/* Animated Security Grid Overlay */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.4)_1px,transparent_1px)] bg-[size:80px_80px]">
            <motion.div
              className="w-full h-full"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
        
        {/* Floating Security Nodes */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.9, 0.2]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 4
              }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/60"></div>
                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
                {/* Connection lines */}
                <div className="absolute top-1/2 left-1/2 w-20 h-px bg-gradient-to-r from-cyan-400/60 to-transparent transform -translate-y-px rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-px bg-gradient-to-r from-cyan-400/40 to-transparent transform -translate-y-px -rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 w-12 h-px bg-gradient-to-r from-blue-400/50 to-transparent transform -translate-y-px rotate-12"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Scan Lines Effect */}
        <motion.div
          className="absolute inset-0 opacity-8"
          style={{
            background: 'linear-gradient(90deg, transparent 96%, rgba(59, 130, 246, 0.6) 98%, transparent 100%)',
            backgroundSize: '100px 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Digital Rain Effect */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent"
              style={{
                left: `${15 + i * 15}%`,
                height: '100px'
              }}
              animate={{
                y: [-100, window.innerHeight + 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Security Status Indicators */}
        <div className="absolute top-8 right-8 flex flex-col space-y-2 z-10">
          <motion.div 
            className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-400/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-mono font-semibold">SECURE</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-400/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-xs font-mono font-semibold">MONITORING</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-400/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-xs font-mono font-semibold">PROTECTED</span>
          </motion.div>
        </div>

        {/* Professional Data Stream */}
        <div className="absolute bottom-8 left-8 max-w-sm z-10">
          <motion.div 
            className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-mono font-semibold">GLOBAL SECURITY STATUS</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-gray-300">
                <span>Threats Blocked:</span>
                <motion.span 
                  className="text-green-400 font-semibold"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  1,247,893
                </motion.span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Systems Protected:</span>
                <span className="text-blue-400 font-semibold">150+</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Uptime:</span>
                <span className="text-purple-400 font-semibold">99.9%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <motion.div 
                  className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 h-1 rounded-full"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 3, delay: 3, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Original HackerScene3D for other uses
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="sketchfab-embed-wrapper w-full h-full">
        <iframe 
          title="The sky from the center of the earth" 
          frameBorder="0" 
          allowFullScreen 
          mozallowfullscreen="true" 
          webkitallowfullscreen="true" 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true" 
          web-share="true"
          src="https://sketchfab.com/models/17cf917d160645b6a57a09c420ed647d/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&camera=0&preload=1"
          className="w-full h-full scale-110 transform origin-center"
          style={{ 
            border: 'none',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Overlay to ensure content is visible over the background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-transparent to-gray-900/40 pointer-events-none" />
    </div>
  );
};

export default HackerScene3D;