import Section from '../ui/Section';
import { useLocale } from '../../i18n';

export default function Skills() {
	const { skills: t, data } = useLocale();
	const { SKILLS } = data;

	return (
		<Section id="skills" title={t.title} command="npm ls --depth=0 pedro">
			<div data-reveal className="rounded-xl border border-zinc-700/70 bg-zinc-900/80 p-5 md:p-8">
				<p suppressHydrationWarning className="mb-5 text-sm text-zinc-400">pedro@{new Date().getFullYear() - 1998}.0.0 ~/skills</p>
				<ul className="space-y-3">
					{SKILLS.map((skill, i) => (
						<li key={skill.name} className="grid grid-cols-[minmax(0,8.5rem)_1fr_3rem] items-center gap-3 sm:grid-cols-[11rem_1fr_3.5rem] sm:gap-5">
							<span className="truncate text-zinc-200">
								<span className="text-zinc-400 select-none">{i === SKILLS.length - 1 ? '└── ' : '├── '}</span>
								{skill.name}
							</span>
							<span className="h-3.5 bg-zinc-800" role="presentation">
								<span className="bar-fill block h-full" style={{ width: `${skill.pct}%` }} />
							</span>
							<span className="text-right text-red-400 tabular-nums" aria-label={t.percent(skill.pct)}>
								{skill.pct}%
							</span>
						</li>
					))}
				</ul>
				<p className="mt-6 text-sm text-zinc-400">
					{t.audited(SKILLS.length)} <span className="text-green-400">{t.noVulns}</span>
				</p>
			</div>
		</Section>
	);
}
