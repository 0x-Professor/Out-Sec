import React from 'react';

// Background 3D Model Component with Auto-play and Proper Sizing
const HackerScene3D = () => {
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