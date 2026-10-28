import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { langFromPath } from './i18n';
import './index.css';

const container = document.getElementById('root');
const app = (
	<StrictMode>
		<App lang={langFromPath(window.location.pathname)} />
	</StrictMode>
);

// Production HTML is prerendered per language (see scripts/prerender.mjs); dev starts empty.
if (container.firstElementChild) {
	hydrateRoot(container, app);
} else {
	createRoot(container).render(app);
}
