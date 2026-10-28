// Every section opens like a shell command whose output is the content below.
// Font size comes from `className` (or is inherited) so callers never fight a default.
export function Prompt({ children, className = '' }) {
	return (
		<p className={`font-mono break-words text-zinc-400 ${className}`}>
			<span className="text-red-400">pedro@figueira</span>
			<span className="text-zinc-400">:</span>
			<span className="text-zinc-300">~</span>
			<span className="text-zinc-400">$ </span>
			{children}
		</p>
	);
}

export default function Section({ id, title, command, children, className = '' }) {
	return (
		<section id={id} aria-labelledby={`${id}-title`} className={className}>
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-28">
				<header data-reveal className="mb-8 md:mb-14">
					<Prompt className="text-xs sm:text-sm">{command}</Prompt>
					<h2 id={`${id}-title`} className="mt-3 text-[clamp(1.75rem,7vw,3rem)] leading-tight font-bold tracking-tight text-balance text-zinc-100">
						{title}
					</h2>
				</header>
				{children}
			</div>
		</section>
	);
}
