import { ChevronDown } from 'lucide-react';
import AsciiField from './AsciiField';
import Terminal from './Terminal';
import { useLocale } from '../../i18n';

export default function Hero() {
	const { hero: t } = useLocale();

	return (
		<section
			id="top"
			className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-black to-zinc-800 px-3 pt-20 pb-28 sm:px-4"
		>
			<AsciiField />
			{/* red glow that seats the terminal on the field */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgb(231_0_11/0.16),transparent_70%)]"
			/>

			<div className="relative z-10 flex w-full justify-center">
				<Terminal />
			</div>

			<a
				href="#about"
				className="appear absolute bottom-8 z-10 flex flex-col items-center gap-2 text-zinc-300 transition hover:text-red-400"
				style={{ '--delay': '3s' }}
			>
				<ChevronDown className="size-9 animate-bounce rounded-full border-2 p-1.5 motion-reduce:animate-none" aria-hidden="true" />
				<span className="text-sm">{t.scrollDown}</span>
			</a>
		</section>
	);
}
