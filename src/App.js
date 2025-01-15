import './App.css';
import { useState } from 'react';
import IntroductionComponent from './components/IntroductionComponent';
import LandingPage from './components/LandingPage';
import ProfessionalExperienceComponent from './components/ProfessionalExperienceComponent';

function App() {
  const [loading, setLoading] = useState(true); // State for the loading bar
  
  return (
    <div className='overflow-x-hidden'>
      <LandingPage loading={loading} setLoading={setLoading}></LandingPage>
      {!loading &&
        <>
          <IntroductionComponent></IntroductionComponent>
          <ProfessionalExperienceComponent></ProfessionalExperienceComponent>
        </>
      }
    </div>
  );
}

export default App;
