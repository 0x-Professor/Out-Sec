import { useEffect } from 'react';

const GalaxyBackground = () => {
  useEffect(() => {
    // Create stars
    const stars = document.querySelector('.stars');
    if (!stars) return;
    
    // Clear any existing stars
    stars.innerHTML = '';
    
    // Number of stars
    const starCount = 200;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size between 1-3px
      const size = Math.random() * 2 + 1;
      
      // Random animation duration between 2-6s
      const duration = Math.random() * 4 + 2;
      
      // Random delay
      const delay = Math.random() * 5;
      
      // Apply styles
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.setProperty('--twinkle-duration', `${duration}s`);
      star.style.setProperty('--twinkle-delay', `${delay}s`);
      
      // Add some variety to star colors
      const colorVariant = Math.random();
      if (colorVariant > 0.8) {
        star.style.background = 'rgba(255, 255, 180, 0.8)'; // Yellowish
      } else if (colorVariant > 0.6) {
        star.style.background = 'rgba(200, 200, 255, 0.8)'; // Bluish
      } else {
        star.style.background = '#fff'; // White
      }
      
      stars.appendChild(star);
    }
    
    return () => {
      // Clean up
      if (stars) stars.innerHTML = '';
    };
  }, []);
  
  return <div className="stars"></div>;
};

export default GalaxyBackground;
