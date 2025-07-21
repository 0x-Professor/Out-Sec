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
  Contact, 
  Footer,
  LiveChatWidget
} from "./components";
import BlogPost from "./components/BlogPost";
import GalaxyBackground from "./components/GalaxyBackground";

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
      <GalaxyBackground />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header activeSection={activeSection} scrollToSection={scrollToSection} />
              <main role="main">
                <div id="home">
                  <Hero scrollToSection={scrollToSection} />
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
                <div id="contact">
                  <Contact />
                </div>
              </main>
              <Footer />
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