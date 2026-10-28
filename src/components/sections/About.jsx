import Section from '../ui/Section';
import Rich from '../ui/Rich';
import { useLocale } from '../../i18n';
import { yearsSince } from '../../utils/dates';

function JsonValue({ value }) {
	if (Array.isArray(value)) {
		return (
			<>
				[
				{value.map((v, i) => (
					<span key={v}>
						<span className="text-green-300">"{v}"</span>
						{i < value.length - 1 && ', '}
					</span>
				))}
				]
			</>
		);
	}
	if (typeof value === 'number') return <span className="text-amber-300">{value}</span>;
	return <span className="text-green-300">"{value}"</span>;
}

export default function About() {
	const { about: t, data } = useLocale();
	const { FACTS, PROFILE } = data;
	const facts = [
		...FACTS.slice(0, 3),
		{ key: t.extraKeys.email, value: PROFILE.email },
		...FACTS.slice(3),
		{ key: t.extraKeys.years, value: yearsSince(PROFILE.careerStart) },
	];

	return (
		<Section id="about" title={t.title} command="cat README.md profile.json">
			<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
				<div data-reveal className="space-y-8">
					{/* v1 portrait with the red glow */}
					<div className="relative mx-auto w-56 sm:w-64 lg:mx-0">
						<div className="absolute -inset-1.5 rounded-full bg-linear-to-r from-red-500 to-zinc-500 blur-md" aria-hidden="true" />
						<img
							src={PROFILE.photo}
							alt={t.photoAlt}
							width="256"
							height="256"
							loading="lazy"
							decoding="async"
							className="relative aspect-square w-full rounded-full border-4 border-zinc-800 object-cover transition duration-300 hover:scale-105"
						/>
					</div>
					<div className="space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
						{t.paragraphs.map((p) => (
							<p key={p}>
								<Rich text={p} />
							</p>
						))}
					</div>
				</div>

				<figure data-reveal className="self-start overflow-hidden rounded-xl border border-zinc-700/70 bg-zinc-900/80">
					<figcaption className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 text-xs text-zinc-400">
						<span>profile.json</span>
						<span>{t.keys(facts.length)}</span>
					</figcaption>
					<pre className="overflow-x-auto p-5 text-sm leading-7 md:text-[15px]">
						<code>
							{'{\n'}
							{facts.map((fact, i) => (
								<span key={fact.key} className="block pl-[2ch] whitespace-pre-wrap">
									<span className="text-red-400">"{fact.key}"</span>: <span suppressHydrationWarning><JsonValue value={fact.value} /></span>
									{i < facts.length - 1 && ','}
								</span>
							))}
							{'}'}
						</code>
					</pre>
				</figure>
			</div>
		</Section>
	);
}
