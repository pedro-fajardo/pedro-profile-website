import { useEffect, useRef, useState } from 'react';
import { Briefcase, Code, GraduationCap, Info, Mail, Menu, SquareTerminal, X } from 'lucide-react';
import useActiveSection from '../../hooks/useActiveSection';
import { useLocale } from '../../i18n';

const ITEMS = [
	{ id: 'about', icon: Info },
	{ id: 'experience', icon: Briefcase },
	{ id: 'skills', icon: Code },
	{ id: 'projects', icon: SquareTerminal },
	{ id: 'certifications', icon: GraduationCap },
	{ id: 'contact', icon: Mail },
];
const IDS = ITEMS.map((item) => item.id);

// The v1 floating hamburger, now also a keyboard command menu (Ctrl/⌘ + K).
export default function FloatingMenu() {
	const { menu: t, terminal } = useLocale();
	const [open, setOpen] = useState(false);
	const active = useActiveSection(IDS);
	const rootRef = useRef(null);

	useEffect(() => {
		const onKey = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				setOpen((v) => !v);
			} else if (e.key === 'Escape') {
				setOpen(false);
			}
		};
		const onClick = (e) => {
			if (!rootRef.current?.contains(e.target)) setOpen(false);
		};
		window.addEventListener('keydown', onKey);
		window.addEventListener('pointerdown', onClick);
		return () => {
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('pointerdown', onClick);
		};
	}, []);

	useEffect(() => {
		if (open) rootRef.current?.querySelector('nav a')?.focus();
	}, [open]);

	return (
		<div ref={rootRef} className="fixed top-4 left-4 z-50">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-14 focus:w-max focus:rounded-lg focus:bg-zinc-900 focus:px-3 focus:py-3 focus:text-sm"
			>
				{t.skip}
			</a>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				aria-controls="section-menu"
				aria-label={open ? t.close : t.open}
				className="group flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-zinc-800/70 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-zinc-700/80"
			>
				{open ? <X className="size-5" /> : <Menu className="size-5" />}
				<kbd className="hidden rounded border border-zinc-600 px-1.5 text-[10px] text-zinc-400 md:inline">Ctrl K</kbd>
			</button>

			{open && (
				<nav
					id="section-menu"
					aria-label={t.nav}
					className="appear absolute top-16 w-72 rounded-xl border border-zinc-700/60 bg-zinc-900/95 py-2 shadow-2xl shadow-black/60 backdrop-blur-md"
				>
					<p className="px-4 pt-1 pb-2 text-[11px] text-zinc-400">{t.heading}</p>
					<ul>
						{ITEMS.map(({ id, icon: Icon }) => (
							<li key={id}>
								<a
									href={`#${id}`}
									onClick={() => setOpen(false)}
									aria-current={active === id ? 'true' : undefined}
									className={`mx-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition focus:outline-none focus-visible:bg-zinc-700/70 ${
										active === id ? 'bg-red-500/15 text-red-400' : 'text-zinc-200 hover:bg-zinc-700/70'
									}`}
								>
									<Icon className="size-4 shrink-0 opacity-80" aria-hidden="true" />
									<span className="flex-1">{t.items[id]}</span>
									<span className="text-[11px] text-zinc-400">cd {terminal.dirs[id]}</span>
								</a>
							</li>
						))}
					</ul>
				</nav>
			)}
		</div>
	);
}
