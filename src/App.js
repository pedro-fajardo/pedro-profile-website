import './App.css';
import { useState } from 'react';
import IntroductionComponent from './components/IntroductionComponent';
import LandingPage from './components/LandingPage';
import Experience from './components/experience/experience';
import FloatingHamburgerMenu from './components/FloatingHamburguerMenu';
import Skills from './components/skills/Skills';
import Contact from './components/Contact';
import Copyright from './components/Copyright';
import Certifications from './components/certifications/Certifications';
import ProjectList from './components/projects/ProjectList';

function App() {
	const [loading, setLoading] = useState(true);

	return (
		<div className='overflow-x-hidden bg-zinc-800'>
			<LandingPage loading={loading} setLoading={setLoading}></LandingPage>
			{!loading &&
				<>
					<FloatingHamburgerMenu />
					<div id="introduction">
						<IntroductionComponent />
					</div>
					<div id="experience">
						<Experience />
					</div>
					<div id="skills">
						<Skills />
					</div>
					<div id="projects">
						<ProjectList />
					</div>
					<div id="certifications">
						<Certifications />
					</div>
					<div id="contact">
						<Contact />
					</div>
					<Copyright />
				</>
			}
		</div>
	);
}

export default App;
