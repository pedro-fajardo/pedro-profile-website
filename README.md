# pedrofajardodev.com

Personal site of Pedro Fajardo — React 19, Vite and Tailwind CSS 4, prerendered to static HTML in English (`/`)
and European Portuguese (`/pt/`).

## Scripts

| Command           | What it does                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `npm run dev`     | Local dev server (`/` English, `/pt/` Portuguese)                     |
| `npm run build`   | Client build + one prerendered page per language + `sitemap.xml`      |
| `npm run preview` | Serves the production build                                           |
| `npm run images`  | Regenerates WebP images, icons and Open Graph cards from `assets/originals/` |

## Where things live

- `src/data/profile.js` — all content in English: experience, skills, projects, certifications.
- `src/i18n/en.js`, `src/i18n/pt.js` — UI strings and SEO metadata per language. `pt.js` also translates the
  content by `id` (`content.roles['itglee-genai']`, `content.projects.crm`, …); anything not translated falls
  back to English. When you add a role or project to `profile.js`, add its Portuguese text to `pt.js` too.
- `src/components/sections/` — one component per page section (`Terminal.jsx` holds the hero commands,
  `AsciiField.jsx` the background animation).
- `src/index.css` — fonts, theme and animation styles.
- `assets/originals/` — full-size source images. Add an image here, run `npm run images`, then reference
  `/images/<folder>/<name>-<width>.webp` from the data file.

## SEO

- The canonical origin is `PROFILE.url` in `src/data/profile.js` (production serves `www`); keep
  `public/robots.txt` in sync if the domain changes.
- `npm run build` writes `build/index.html` and `build/pt/index.html`, each with its own `lang`, title, description,
  canonical, `hreflang` alternates (en, pt-PT, x-default), Open Graph and JSON-LD (`WebSite`, `ProfilePage`,
  `Person` with credentials, one `CreativeWork` per project), plus `build/sitemap.xml` listing both languages —
  all from the same data the page renders (`src/seo.js`, `scripts/prerender.mjs`).
- `public/404.html` is served by Vercel for unknown paths (`noindex`).
