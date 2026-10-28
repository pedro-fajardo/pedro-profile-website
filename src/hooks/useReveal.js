import { useEffect } from 'react';

// Fades [data-reveal] elements in as they scroll into view. Anything already
// on screen is marked visible first, so prerendered content never flashes.
export default function useReveal() {
	useEffect(() => {
		if (!('IntersectionObserver' in window)) return;

		const elements = [...document.querySelectorAll('[data-reveal]')];
		const viewport = window.innerHeight;
		for (const el of elements) {
			if (el.getBoundingClientRect().top < viewport) el.classList.add('is-visible');
		}
		document.documentElement.classList.add('js-reveal');

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: '0px 0px -10% 0px' },
		);
		elements.filter((el) => !el.classList.contains('is-visible')).forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);
}
