import { createContext, useContext } from 'react';
import { CERTIFICATIONS, EXPERIENCE, FACTS, PROFILE, PROJECTS, SKILLS } from '../data/profile';
import en from './en';
import pt from './pt';

const DICTIONARIES = { en, pt };
export const LANGS = Object.keys(DICTIONARIES);

// Merges a dictionary's content translations (by id) over the English data.
function localizeContent(tr) {
	if (!tr) return { PROFILE, FACTS, EXPERIENCE, SKILLS, PROJECTS, CERTIFICATIONS };
	return {
		PROFILE: { ...PROFILE, ...tr.profile },
		FACTS: tr.facts ?? FACTS,
		EXPERIENCE: EXPERIENCE.map((company) => ({
			...company,
			roles: company.roles.map((role) => ({ ...role, ...tr.roles?.[role.id] })),
		})),
		SKILLS,
		PROJECTS: PROJECTS.map((project) => ({ ...project, ...tr.projects?.[project.id] })),
		CERTIFICATIONS,
	};
}

const LOCALES = Object.fromEntries(
	LANGS.map((lang) => {
		const dict = DICTIONARIES[lang];
		return [lang, { ...dict, url: new URL(dict.path, PROFILE.url).href, data: localizeContent(dict.content) }];
	}),
);

export function getLocale(lang) {
	return LOCALES[lang] ?? LOCALES.en;
}

/** The locale whose page lives at `pathname` (`/pt/...` → pt, anything else → en). */
export function langFromPath(pathname) {
	return pathname === '/pt' || pathname.startsWith('/pt/') ? 'pt' : 'en';
}

export const LocaleContext = createContext(LOCALES.en);
export const useLocale = () => useContext(LocaleContext);
