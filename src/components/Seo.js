import { useEffect } from 'react';

const DEFAULT = {
  title: "Pedro Fajardo — Frontend Developer",
  description: "Pedro Fajardo — Frontend Developer specializing in React, TailwindCSS and modern web apps. Portfolio, projects, experience and contact.",
  url: typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://pedrofajardodev.com/',
  image: `${process.env.PUBLIC_URL || ''}/images/PedroFajardo.jpg`,
  author: "Pedro Fajardo",
  lang: "en-GB",
  twitterHandle: "@pedrofajardo",
  siteName: "Pedro Fajardo Portfolio",
  keywords: "Pedro Fajardo, Frontend Developer, React, TailwindCSS, portfolio, Web Developer, JavaScript"
};

function upsertMeta(attrName, attrValue, content) {
  let sel = `meta[${attrName}="${attrValue}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo(props = {}) {
  const meta = { ...DEFAULT, ...props };

  useEffect(() => {
    // title + lang
    document.title = meta.title;
    if (meta.lang) document.documentElement.lang = meta.lang;

    // Basic / SEO meta
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'keywords', meta.keywords);
    upsertMeta('name', 'author', meta.author);
    upsertMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    upsertMeta('name', 'theme-color', '#111827');

    // Open Graph
    upsertMeta('property', 'og:locale', meta.lang || 'en_US');
    upsertMeta('property', 'og:site_name', meta.siteName);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', meta.url);
    upsertMeta('property', 'og:image', meta.image);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', meta.image);
    if (meta.twitterHandle) upsertMeta('name', 'twitter:creator', meta.twitterHandle);

    // Canonical
    upsertLink('canonical', meta.url);

    // JSON-LD (Website + Person)
    const ldId = 'seo-jsonld';
    let ld = document.getElementById(ldId);
    const jsonld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": meta.url + "#website",
          "url": meta.url,
          "name": meta.siteName,
          "description": meta.description,
          "publisher": {
            "@type": "Person",
            "name": meta.author
          }
        },
        {
          "@type": "Person",
          "@id": meta.url + "#person",
          "name": meta.author,
          "url": meta.url,
          "sameAs": [
            "https://github.com/pedro-fajardo",
            "https://www.linkedin.com/in/pedro-fajardo-a54767161/"
            // add other profiles if needed
          ],
          "jobTitle": "Frontend Developer"
        }
      ]
    };

    if (!ld) {
      ld = document.createElement('script');
      ld.setAttribute('id', ldId);
      ld.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonld);

    return () => {
      // do not remove tags on unmount (keeps metadata for multi-page routes)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.title, meta.description, meta.url, meta.image, meta.keywords]);

  return null;
}