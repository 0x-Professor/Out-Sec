import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Header, 
  Hero, 
  About, 
  Services, 
  Team, 
  Projects, 
  Blog, 
  Testimonials,
  Contact, 
  Footer,
  LiveChatWidget
} from "./components";
import BlogPost from "./components/BlogPost";
import GalaxyBackground from "./components/GalaxyBackground";

// Spotlight component for Hero and Footer
const Spotlight = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black/90"></div>
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'team', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section with performance optimizations
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        // Use scrollIntoView with smooth behavior and block start for consistent positioning
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <GalaxyBackground />
              <Header activeSection={activeSection} scrollToSection={scrollToSection} />
              <main role="main">
                <div id="home" className="relative overflow-hidden">
                  <Spotlight>
                    <Hero scrollToSection={scrollToSection} />
                  </Spotlight>
                </div>
                <div id="about">
                  <About />
                </div>
                <div id="services">
                  <Services />
                </div>
                <div id="team">
                  <Team />
                </div>
                <div id="projects">
                  <Projects />
                </div>
                <div id="blog">
                  <Blog />
                </div>
                <div id="testimonials">
                  <Testimonials />
                </div>
                <div id="contact">
                  <Contact />
                </div>
              </main>
              <Spotlight className="bg-black/50">
                <Footer />
              </Spotlight>
              <LiveChatWidget />
            </>
          } />
          <Route path="/blog" element={
            <>
              <Header activeSection="blog" />
              <main role="main">
                <Blog />
              </main>
              <Footer />
            </>
          } />
          <Route path="/blog/:id" element={
            <>
              <Header activeSection="blog" />
              <main role="main">
                <BlogPost />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;