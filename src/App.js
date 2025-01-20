import './App.css';
import { useState } from 'react';
import IntroductionComponent from './components/IntroductionComponent';
import LandingPage from './components/LandingPage';
import ProfessionalExperienceComponent from './components/ProfessionalExperienceComponent';
import FloatingHamburgerMenu from './components/FloatingHamburguerMenu';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Copyright from './components/Copyright';

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
          <div id="professionalExperience">
            <ProfessionalExperienceComponent></ProfessionalExperienceComponent>
          </div>
          <div id="skills">
            <Skills></Skills>
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
