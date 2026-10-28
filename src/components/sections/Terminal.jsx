import { useEffect, useRef, useState } from 'react';
import { Prompt } from '../ui/Section';
import Rich from '../ui/Rich';
import { getLocale, LANGS, useLocale } from '../../i18n';
import { yearsSince } from '../../utils/dates';

function goTo(id) {
	setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 350);
}

function openTab(url) {
	window.open(url, '_blank', 'noopener,noreferrer');
}

// Finds the section a typed name points to, in either language (`cd projetos` and `cd projects` both work).
function resolveSection(name) {
	const wanted = name.toLowerCase();
	for (const lang of LANGS) {
		const match = Object.entries(getLocale(lang).terminal.dirs).find(([, dir]) => dir.startsWith(wanted));
		if (match) return match[0];
	}
	return null;
}

// Returns the output for a command line, or null to clear the screen.
function run(input, locale) {
	const t = locale.terminal;
	const { PROFILE } = locale.data;
	const [cmd = '', ...args] = input.trim().split(/\s+/);
	const arg = args.join(' ').replace(/^~?\/?/, '').replace(/\/$/, '');

	switch (cmd.toLowerCase()) {
		case '':
			return '';
		case 'help':
			return (
				<div className="grid grid-cols-[9rem_1fr] gap-x-4 gap-y-0.5 sm:grid-cols-[11rem_1fr]">
					{t.help.map(([c, d]) => (
						<div key={c} className="contents">
							<span className="text-red-400">{c}</span>
							<span className="text-zinc-400">{d}</span>
						</div>
					))}
				</div>
			);
		case 'ls':
		case 'dir':
			return (
				<p className="flex flex-wrap gap-x-5">
					{Object.values(t.dirs).map((dir) => (
						<span key={dir} className="font-semibold text-red-400">
							{dir}/
						</span>
					))}
				</p>
			);
		case 'cd':
		case 'open':
		case 'cat': {
			if (!arg || arg === '~') return <span className="text-zinc-400">{t.alreadyHome}</span>;
			const id = resolveSection(arg);
			if (!id) return <span className="text-red-400">{t.noDir} {arg}</span>;
			goTo(id);
			return <span className="text-zinc-400">{t.opening} ~/{t.dirs[id]}</span>;
		}
		case 'lang': {
			const target = LANGS.includes(arg) ? arg : LANGS.find((l) => l !== locale.lang);
			if (target === locale.lang) return <span className="text-zinc-400">{t.alreadyHome}</span>;
			setTimeout(() => window.location.assign(getLocale(target).path), 400);
			return <span className="text-zinc-400">{t.switching}</span>;
		}
		case 'whoami':
			return `${PROFILE.name} — ${PROFILE.role}, ${PROFILE.location}`;
		case 'email':
			return (
				<a href={`mailto:${PROFILE.email}`} className="text-red-400 underline underline-offset-4">
					{PROFILE.email}
				</a>
			);
		case 'github':
			openTab(PROFILE.links.github);
			return <span className="text-zinc-400">{t.opening} github.com/pedro-fajardo</span>;
		case 'linkedin':
			openTab(PROFILE.links.linkedin);
			return <span className="text-zinc-400">{t.opening} linkedin</span>;
		case 'sudo':
		case 'hire':
			goTo('contact');
			return <span className="text-green-400">{t.sudo}</span>;
		case 'date':
			return `${new Date().toLocaleString(locale.dateLocale, { timeZone: PROFILE.timeZone, dateStyle: 'full', timeStyle: 'short' })} (${t.lisbon})`;
		case 'echo':
			return args.join(' ');
		case 'clear':
		case 'cls':
			return null;
		case 'rm':
			return <span className="text-red-400">{t.niceTry}</span>;
		default:
			// a bare section name works like `cd <name>`
			if (cmd.length > 2 && resolveSection(cmd)) return run(`cd ${cmd}`, locale);
			return (
				<span className="text-zinc-400">
					{t.notFound} <span className="text-red-400">{cmd}</span> {t.tryHelp} <span className="text-zinc-200">help</span>
				</span>
			);
	}
}

export default function Terminal() {
	const locale = useLocale();
	const t = locale.terminal;
	const { PROFILE } = locale.data;
	const [entries, setEntries] = useState([]);
	const [booted, setBooted] = useState(true); // false after `clear`
	const [value, setValue] = useState('');
	const [cursor, setCursor] = useState(-1); // position while browsing history with ↑/↓
	const inputRef = useRef(null);
	const bodyRef = useRef(null);
	const nextId = useRef(0);

	useEffect(() => {
		const body = bodyRef.current;
		if (body && entries.length) body.scrollTop = body.scrollHeight;
	}, [entries]);

	const submit = (line) => {
		window.dispatchEvent(new Event('terminal-command'));
		const output = run(line, locale);
		setValue('');
		setCursor(-1);
		if (output === null) {
			setEntries([]);
			setBooted(false);
			return;
		}
		setEntries((prev) => [...prev.slice(-7), { id: nextId.current++, line, output }]);
	};

	const onKeyDown = (e) => {
		const past = entries.map((x) => x.line).filter(Boolean);
		if (e.key === 'ArrowUp' && past.length) {
			e.preventDefault();
			const next = cursor === -1 ? past.length - 1 : Math.max(0, cursor - 1);
			setCursor(next);
			setValue(past[next]);
		} else if (e.key === 'ArrowDown' && cursor !== -1) {
			e.preventDefault();
			const next = cursor + 1;
			setCursor(next >= past.length ? -1 : next);
			setValue(next >= past.length ? '' : past[next]);
		}
	};

	const years = yearsSince(PROFILE.careerStart);

	return (
		<div className="w-full max-w-4xl overflow-hidden rounded-xl border border-zinc-700/70 bg-zinc-900/95 shadow-2xl shadow-black/60 md:bg-zinc-900/85 md:backdrop-blur-md">
			{/* window chrome */}
			<div className="relative flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5 sm:py-3">
				<span className="size-3 rounded-full bg-red-500" />
				<span className="size-3 rounded-full bg-zinc-600" />
				<span className="size-3 rounded-full bg-zinc-600" />
				<span className="absolute inset-x-0 text-center text-xs text-zinc-400 pointer-events-none">pedro@figueira: ~</span>
			</div>

			<div
				ref={bodyRef}
				onClick={() => window.matchMedia('(pointer: fine)').matches && inputRef.current?.focus({ preventScroll: true })}
				className="max-h-[64svh] space-y-2 overflow-y-auto overscroll-contain p-4 text-sm sm:p-5 leading-relaxed md:p-8 md:text-base"
			>
				{booted && (
					<>
						<Prompt className="md:text-base">
							<span className="type text-zinc-100" style={{ '--n': 6, '--delay': '0.3s' }}>whoami</span>
						</Prompt>
						<div className="appear pb-3" style={{ '--delay': '0.85s' }}>
							<h1 className="name-caret text-[clamp(2.4rem,11vw,5.5rem)] leading-none font-bold tracking-tight text-zinc-100">
								{PROFILE.name}
							</h1>
							<p className="mt-3 text-zinc-400">
								{PROFILE.role} · <span suppressHydrationWarning>{years}</span>+ {t.years} · {PROFILE.location}
							</p>
						</div>

						<Prompt className="md:text-base">
							<span className="type text-zinc-100" style={{ '--n': 11, '--delay': '1.3s' }}>cat now.txt</span>
						</Prompt>
						<p className="appear max-w-2xl pb-2 text-zinc-300" style={{ '--delay': '2.2s' }}>
							<Rich text={t.now} className="text-red-400" />
						</p>
					</>
				)}

				{entries.map((entry) => (
					<div key={entry.id} className="space-y-1">
						<Prompt className="md:text-base">
							<span className="text-zinc-100">{entry.line}</span>
						</Prompt>
						{entry.output && <div className="text-zinc-300">{entry.output}</div>}
					</div>
				))}

				<form
					className="appear flex min-h-10 items-center"
					style={{ '--delay': booted ? '2.5s' : '0s' }}
					onSubmit={(e) => {
						e.preventDefault();
						submit(value);
					}}
				>
					<label htmlFor="terminal-input" className="shrink-0">
						<Prompt className="md:text-base" />
					</label>
					<input
						ref={inputRef}
						id="terminal-input"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={onKeyDown}
						autoComplete="off"
						autoCapitalize="off"
						spellCheck="false"
						enterKeyHint="go"
						placeholder={t.placeholder}
						aria-label={t.inputLabel}
						className="ml-[1ch] min-w-0 flex-1 bg-transparent py-2 text-base text-zinc-100 caret-red-500 outline-none placeholder:text-zinc-400"
					/>
				</form>
			</div>

			<div className="appear flex gap-2 overflow-x-auto border-t border-zinc-800 px-4 py-3 [scrollbar-width:none] sm:flex-wrap sm:px-5 md:px-8" style={{ '--delay': '2.7s' }}>
				<span className="shrink-0 self-center text-xs text-zinc-400">{t.try}</span>
				{t.suggestions.map((s) => (
					<button
						key={s}
						type="button"
						onClick={() => submit(s)}
						className="min-h-10 shrink-0 rounded-md border border-zinc-700 px-3 text-xs whitespace-nowrap pointer-fine:min-h-0 pointer-fine:px-2.5 pointer-fine:py-1 text-zinc-300 transition hover:border-red-500 hover:text-red-400"
					>
						{s}
					</button>
				))}
			</div>
		</div>
	);
}
