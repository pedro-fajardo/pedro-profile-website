// Per-language <head> tags, schema.org JSON-LD and the sitemap, all built from
// the same content the page renders, so search engines and the visible page
// can never disagree. Used by scripts/prerender.mjs at build time.
import { getLocale, LANGS } from './i18n';
import { PROFILE } from './data/profile';

const SITE = PROFILE.url; // English home = site root
const abs = (path) => new URL(path, SITE).href;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** hreflang alternates: every language plus x-default (English). */
function alternates() {
	return [
		...LANGS.map((lang) => ({ hreflang: getLocale(lang).htmlLang, href: getLocale(lang).url })),
		{ hreflang: 'x-default', href: getLocale('en').url },
	];
}

export function headTags(lang) {
	const locale = getLocale(lang);
	const { meta } = locale;
	const others = LANGS.filter((l) => l !== lang).map(getLocale);
	const image = abs(meta.ogImage);

	return [
		`<title>${esc(meta.title)}</title>`,
		`<meta name="description" content="${esc(meta.description)}" />`,
		`<link rel="canonical" href="${locale.url}" />`,
		...alternates().map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
		`<meta property="og:type" content="profile" />`,
		`<meta property="profile:first_name" content="Pedro" />`,
		`<meta property="profile:last_name" content="Fajardo" />`,
		`<meta property="og:site_name" content="${esc(PROFILE.name)}" />`,
		`<meta property="og:title" content="${esc(meta.ogTitle)}" />`,
		`<meta property="og:description" content="${esc(meta.ogDescription)}" />`,
		`<meta property="og:url" content="${locale.url}" />`,
		`<meta property="og:locale" content="${locale.ogLocale}" />`,
		...others.map((o) => `<meta property="og:locale:alternate" content="${o.ogLocale}" />`),
		`<meta property="og:image" content="${image}" />`,
		`<meta property="og:image:type" content="image/jpeg" />`,
		`<meta property="og:image:width" content="1200" />`,
		`<meta property="og:image:height" content="630" />`,
		`<meta property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${esc(meta.ogTitle)}" />`,
		`<meta name="twitter:description" content="${esc(meta.ogDescription)}" />`,
		`<meta name="twitter:image" content="${image}" />`,
		`<meta name="twitter:image:alt" content="${esc(meta.imageAlt)}" />`,
	].join('\n\t\t');
}

export function structuredData(lang, buildDate = new Date()) {
	const locale = getLocale(lang);
	const { PROFILE: P, EXPERIENCE, SKILLS, PROJECTS, CERTIFICATIONS } = locale.data;
	const page = locale.url;
	const person = `${SITE}#person`; // one person, shared by every language
	const current = EXPERIENCE[0].roles.find((r) => r.end === null);

	const graph = [
		{
			'@type': 'WebSite',
			'@id': `${SITE}#website`,
			url: SITE,
			name: P.name,
			inLanguage: LANGS.map((l) => getLocale(l).htmlLang),
			publisher: { '@id': person },
		},
		{
			'@type': 'ProfilePage',
			'@id': `${page}#profile`,
			url: page,
			name: locale.meta.title,
			description: locale.meta.description,
			inLanguage: locale.htmlLang,
			isPartOf: { '@id': `${SITE}#website` },
			mainEntity: { '@id': person },
			primaryImageOfPage: abs(locale.meta.ogImage),
			dateModified: buildDate.toISOString(),
		},
		{
			'@type': 'Person',
			'@id': person,
			name: P.name,
			givenName: 'Pedro',
			familyName: 'Fajardo',
			alternateName: P.fullName,
			url: SITE,
			image: abs(P.photo),
			email: `mailto:${P.email}`,
			jobTitle: current?.title ?? P.role,
			description: P.summary,
			worksFor: { '@type': 'Organization', name: EXPERIENCE[0].company },
			alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade de Aveiro', sameAs: 'https://www.ua.pt' },
			address: { '@type': 'PostalAddress', addressLocality: 'Figueira da Foz', addressRegion: 'Coimbra', addressCountry: 'PT' },
			knowsLanguage: ['pt', 'en'],
			knowsAbout: [...SKILLS.map((s) => s.name), '.NET', 'Tailwind CSS', 'Frontend development', 'Low-code development'],
			hasCredential: CERTIFICATIONS.map((c) => ({
				'@type': 'EducationalOccupationalCredential',
				name: c.title,
				credentialCategory: 'certificate',
				dateCreated: String(c.year),
				recognizedBy: { '@type': 'Organization', name: c.provider },
			})),
			sameAs: Object.values(P.links),
		},
		...PROJECTS.map((p) => ({
			'@type': 'CreativeWork',
			'@id': `${page}#project-${p.id}`,
			name: p.name,
			description: p.description,
			inLanguage: locale.htmlLang,
			image: abs(`${p.image}-1200.webp`),
			keywords: p.stack.join(', '),
			author: { '@id': person },
			...(p.link && { url: p.link }),
			...(p.github && { codeRepository: p.github }),
		})),
	];

	return { '@context': 'https://schema.org', '@graph': graph };
}

export function sitemap(buildDate = new Date()) {
	const lastmod = buildDate.toISOString().slice(0, 10);
	const links = alternates()
		.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
		.join('\n');
	const { PROJECTS } = getLocale('en').data;
	const images = [PROFILE.photo, ...PROJECTS.map((p) => `${p.image}-1200.webp`)]
		.map((src) => `    <image:image><image:loc>${abs(src)}</image:loc></image:image>`)
		.join('\n');

	const urls = LANGS.map(
		(lang) => `  <url>
    <loc>${getLocale(lang).url}</loc>
    <lastmod>${lastmod}</lastmod>
${links}
${images}
  </url>`,
	).join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}
