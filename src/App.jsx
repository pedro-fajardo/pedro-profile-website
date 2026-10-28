import FloatingMenu from './components/layout/FloatingMenu';
import LangSwitch from './components/layout/LangSwitch';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import useReveal from './hooks/useReveal';
import { getLocale, LocaleContext } from './i18n';

export default function App({ lang }) {
	useReveal();

	return (
		<LocaleContext.Provider value={getLocale(lang)}>
			<FloatingMenu />
			<LangSwitch />
			<main id="main">
				<Hero />
				<About />
				<Experience />
				<Skills />
				<Projects />
				<Certifications />
				<Contact />
			</main>
			<Footer />
		</LocaleContext.Provider>
	);
}
