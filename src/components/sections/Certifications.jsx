import Section from '../ui/Section';
import { useLocale } from '../../i18n';

const LOGOS = {
	OutSystems: '/images/certifications/outsystems-160.webp',
	Udemy: '/images/certifications/udemy-160.webp',
};

const fileName = (title) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '') + '.cert';

export default function Certifications() {
	const { certifications: t, data } = useLocale();
	const { CERTIFICATIONS } = data;

	return (
		<Section id="certifications" title={t.title} command="ls -l ~/certificates">
			<ul data-reveal className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 sm:gap-4">
				{CERTIFICATIONS.map((cert) => (
					<li
						key={cert.id}
						className="flex min-w-0 items-center gap-3 rounded-xl sm:gap-4 border border-zinc-700/70 bg-zinc-900/60 p-4 transition hover:border-red-500/50"
					>
						<img src={LOGOS[cert.provider]} alt="" width="56" height="56" loading="lazy" className="size-12 shrink-0 rounded-lg bg-white object-contain p-1 sm:size-14" />
						<div className="min-w-0">
							<p className="truncate text-xs text-zinc-400">
								-r--r--r-- {cert.year} {fileName(cert.title)}
							</p>
							<h3 className="mt-1 font-semibold text-zinc-100">{cert.title}</h3>
							<p className="text-sm">
								<span className="text-zinc-400">{cert.provider}</span> · <span className="text-red-400">{cert.year}</span>
							</p>
						</div>
					</li>
				))}
			</ul>
		</Section>
	);
}
