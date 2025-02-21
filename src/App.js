import './App.css';
import { useState } from 'react';
import IntroductionComponent from './components/IntroductionComponent';
import LandingPage from './components/LandingPage';
import Experience from './components/Experience/Experience';
import FloatingHamburgerMenu from './components/FloatingHamburguerMenu';
import Skills from './components/skills/Skills';
import Contact from './components/Contact';
import Copyright from './components/Copyright';
import Certifications from './components/certifications/Certifications';

function App() {
  const [loading, setLoading] = useState(true); // State for the loading bar

  return (
    <div className='overflow-x-hidden'>
      <LandingPage loading={loading} setLoading={setLoading}></LandingPage>
      {!loading &&
        <>
          <FloatingHamburgerMenu></FloatingHamburgerMenu>
          <div id="introduction">
            <IntroductionComponent></IntroductionComponent>
          </div>
          <div id="experience">
            <Experience></Experience>
          </div>
          <div id="skills">
            <Skills></Skills>
          </div>
          <div id="certifications">
            <Certifications></Certifications>
          </div>
          <div id="contact">
            <Contact></Contact>
          </div>
          <Copyright></Copyright>
        </>
      }
    </div>
  );
}

export default App;
