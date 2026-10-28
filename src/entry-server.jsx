import { renderToString } from 'react-dom/server';
import App from './App';

export { LANGS, getLocale } from './i18n';
export { headTags, structuredData, sitemap } from './seo';

export function render(lang) {
	return renderToString(<App lang={lang} />);
}
