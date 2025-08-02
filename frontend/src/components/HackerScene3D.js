import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Clean 3D Earth Background Component with Smooth Animation
const HackerScene3D = ({ isProfessionalBackground = false }) => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const autoRotation = useRef(0);

  useEffect(() => {
    let animationId;
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        };
      }
    };

    const animate = () => {
      // Much slower auto-rotation
      autoRotation.current += 0.00005;
      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  if (isProfessionalBackground) {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        {/* Clean 3D Earth Model Container */}
        <motion.div 
          className="absolute inset-0 w-full h-full "
          animate={{
            rotateY: [0, 360]
          }}
          transition={{
            rotateY: {
              duration: 4000, // Much slower rotation
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <div className="sketchfab-embed-wrapper w-full h-full">
            <iframe 
              title="Clean Earth Visualization" 
              frameBorder="0" 
              allowFullScreen 
              mozallowfullscreen="true" 
              webkitallowfullscreen="true" 
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true" 
              web-share="true"
              src="https://sketchfab.com/models/17cf917d160645b6a57a09c420ed647d/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&camera=0&preload=1&transparent=1&autospin=0.2"
              className="w-full h-full transform origin-center"
              style={{ 
                border: 'none',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'contain', // Changed from cover to contain to prevent compacting
                filter: 'brightness(0.9) contrast(1.2) saturate(1.2)',
                opacity: 0.65,
                transform: 'scale(1.2)' // Prevent the Earth from being too large/compact
              }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // Clean version for other uses
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <motion.div 
        className="sketchfab-embed-wrapper w-full h-full flex items-center justify-center"
        animate={{
          rotateY: [0, 360]
        }}
        transition={{
          duration: 180, // Slower rotation
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <iframe 
          title="Clean Earth Background" 
          frameBorder="0" 
          allowFullScreen 
          mozallowfullscreen="true" 
          webkitallowfullscreen="true" 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true" 
          web-share="true"
          src="https://sketchfab.com/models/17cf917d160645b6a57a09c420ed647d/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&camera=0&preload=1&autospin=0.15"
          className="w-full h-full transform origin-center"
          style={{ 
            border: 'none',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'contain',
            filter: 'brightness(1.1) contrast(1.2) saturate(1.4)',
            opacity: 0.8,
            transform: 'scale(0.75)' // Smaller scale to prevent compacting
          }}
        />
      </motion.div>
      
      {/* Minimal overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/20 pointer-events-none" />
    </div>
  );
};

export default HackerScene3D;