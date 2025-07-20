import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  SpaceNavigation, 
  SpaceHeroSection, 
  SpaceServicesSection, 
  SpaceTeamSection, 
  SpaceProjectsSection, 
  SpaceContactSection, 
  SpaceFooter
} from "./components";

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'team', 'projects', 'contact'];
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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <SpaceNavigation activeSection={activeSection} />
              <main role="main">
                <SpaceHeroSection />
                <SpaceServicesSection />
                <SpaceTeamSection />
                <SpaceProjectsSection />
                <SpaceContactSection />
              </main>
              <SpaceFooter />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;