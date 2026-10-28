import { getLocale, LANGS, useLocale } from '../../i18n';

// Plain links (not a toggle) so crawlers also follow them to the other language.
export default function LangSwitch() {
	const { lang } = useLocale();

	return (
		<nav aria-label="Language / Idioma" className="fixed top-4 right-4 z-50">
			<ul className="flex rounded-xl border border-zinc-700/60 bg-zinc-800/70 p-1 text-xs shadow-lg backdrop-blur-md">
				{LANGS.map((code) => {
					const target = getLocale(code);
					const current = code === lang;
					return (
						<li key={code}>
							<a
								href={target.path}
								hrefLang={target.htmlLang}
								lang={target.htmlLang}
								aria-current={current ? 'page' : undefined}
								aria-label={current ? undefined : getLocale(lang).langSwitch.label}
								className={`grid min-h-10 min-w-10 place-items-center rounded-lg px-2.5 font-semibold uppercase transition pointer-fine:min-h-8 ${
									current ? 'bg-red-500/15 text-red-400' : 'text-zinc-300 hover:bg-zinc-700/70 hover:text-white'
								}`}
							>
								{code}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
