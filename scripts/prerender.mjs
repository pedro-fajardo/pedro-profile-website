// Post-build step: renders one static HTML page per language (/ and /pt/),
// each with its own <head> (title, description, canonical, hreflang, Open
// Graph, JSON-LD), plus sitemap.xml — so crawlers get everything without JS.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ssrDir = path.resolve('build-ssr');
const buildDir = path.resolve('build');
const buildDate = new Date();

const { render, headTags, structuredData, sitemap, LANGS, getLocale } = await import(
	pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
const template = await readFile(path.join(buildDir, 'index.html'), 'utf8');

// the hero <h1> is set in this font, so fetch it alongside the CSS instead of after it
const latinFont = (await readdir(path.join(buildDir, 'assets'))).find((f) => /^source-code-pro-latin-wght-normal-.*\.woff2$/.test(f));
if (!latinFont) throw new Error('Latin Source Code Pro font not found in build/assets');

function fill(html, placeholder, content) {
	if (!html.includes(placeholder)) throw new Error(`Missing ${placeholder} in index.html`);
	return html.replace(placeholder, content);
}

for (const lang of LANGS) {
	const locale = getLocale(lang);
	const jsonLd = JSON.stringify(structuredData(lang, buildDate)).replace(/</g, '\\u003c');

	let html = template.replace(/<html lang="[^"]*">/, `<html lang="${locale.htmlLang}">`).replace(/<title>.*?<\/title>\s*/s, '');
	html = fill(html, '<!--app-->', render(lang));
	html = fill(
		html,
		'<!--head-->',
		[
			headTags(lang),
			`<link rel="preload" href="/assets/${latinFont}" as="font" type="font/woff2" crossorigin />`,
			`<script type="application/ld+json">${jsonLd}</script>`,
		].join('\n\t\t'),
	);

	const out = path.join(buildDir, locale.path, 'index.html');
	await mkdir(path.dirname(out), { recursive: true });
	await writeFile(out, html);
	console.log(`✓ ${locale.path} (${locale.htmlLang})`);
}

await writeFile(path.join(buildDir, 'sitemap.xml'), sitemap(buildDate));
await rm(ssrDir, { recursive: true, force: true });
console.log('✓ sitemap.xml');
