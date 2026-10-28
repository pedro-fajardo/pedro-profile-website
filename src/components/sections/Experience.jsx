import Section from '../ui/Section';
import { useLocale } from '../../i18n';
import { formatMonth, formatRange } from '../../utils/dates';
import { shortHash } from '../../utils/hash';

// Graph gutter: one continuous red line with a node per commit.
function Gutter({ children, last }) {
	return (
		<div className="relative flex w-8 shrink-0 justify-center">
			<span aria-hidden="true" className={`absolute top-0 w-px bg-red-500/40 ${last ? 'h-6' : 'h-full'}`} />
			{children}
		</div>
	);
}

function Commit({ role, company, head }) {
	const { experience: t, dates } = useLocale();
	const hash = shortHash(role.id);

	return (
		<li className="flex">
			<Gutter>
				<span
					aria-hidden="true"
					className={`relative mt-[1.15rem] size-3 rounded-full border-2 border-red-500 ${head ? 'bg-red-500 shadow-[0_0_0_5px_rgb(239_68_68/0.2)]' : 'bg-zinc-800'}`}
				/>
			</Gutter>
			<details open={head} className="group mb-2 min-w-0 flex-1 rounded-lg transition-colors open:bg-zinc-900/70">
				<summary className="flex cursor-pointer flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg px-3 py-3 hover:bg-zinc-700/30 sm:gap-y-1">
					<span className="text-sm text-red-400">{hash}</span>
					{head && (
						<span className="text-sm text-zinc-400">
							(<span className="font-semibold text-red-400">HEAD → {company.id}</span>)
						</span>
					)}
					<h4 className="basis-full text-base font-semibold text-zinc-100 sm:basis-auto sm:text-lg">{role.title}</h4>
					{role.client && <span className="text-sm text-zinc-400">@ {role.client}</span>}
					<span className="text-sm text-zinc-400 sm:ml-auto">{formatRange(role.start, role.end, dates)}</span>
				</summary>

				<div className="space-y-4 px-3 pb-5 text-sm md:text-[15px]">
					<div className="text-zinc-400">
						<p>{t.author}: Pedro Fajardo · {company.company}</p>
						<p>{t.date}:&nbsp;&nbsp; {formatMonth(role.start, dates)}</p>
					</div>
					<p className="max-w-3xl leading-relaxed text-zinc-200 sm:pl-[2ch]">{role.summary}</p>
					<ul className="space-y-1 rounded-md bg-black/30 p-3 leading-relaxed">
						{role.highlights.map((item) => (
							<li key={item} className="flex gap-2 text-zinc-300">
								<span className="text-green-400 select-none">+</span>
								{item}
							</li>
						))}
					</ul>
					<p className="flex flex-wrap gap-1.5">
						<span className="mr-1 text-zinc-400">stack:</span>
						{role.stack.map((tech) => (
							<span key={tech} className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-xs text-red-400">
								{tech}
							</span>
						))}
					</p>
				</div>
			</details>
		</li>
	);
}

export default function Experience() {
	const { experience: t, dates, data } = useLocale();
	const { EXPERIENCE } = data;
	const roles = EXPERIENCE.flatMap((c) => c.roles);

	return (
		<Section id="experience" title={t.title} command='git log --graph --author="Pedro"'>
			<p data-reveal className="mb-6 text-sm text-zinc-400">
				{t.intro(roles.length)}
			</p>
			<ol data-reveal>
				{EXPERIENCE.map((company, ci) => {
					const first = company.roles.at(-1);
					const last = company.roles[0];
					return (
						<li key={company.id}>
							{/* branch label */}
							<div className="flex">
								<Gutter>
									<img
										src={company.logo}
										alt=""
										width="28"
										height="28"
										loading="lazy"
										className="relative mt-2 size-7 rounded-md bg-white object-contain p-0.5 ring-4 ring-zinc-800"
									/>
								</Gutter>
								<div className="flex flex-wrap items-baseline gap-x-3 px-3 pt-2.5 pb-4">
									<span className="text-xs tracking-wider text-zinc-400 uppercase">{t.branch}</span>
									<h3 className="text-xl font-bold text-zinc-100">{company.company}</h3>
									<span className="text-sm text-zinc-400">{formatRange(first.start, last.end, dates)}</span>
								</div>
							</div>
							<ol>
								{company.roles.map((role, ri) => (
									<Commit key={role.id} role={role} company={company} head={ci === 0 && ri === 0} />
								))}
							</ol>
						</li>
					);
				})}
				<li className="flex">
					<Gutter last>
						<span aria-hidden="true" className="relative mt-[1.15rem] size-3 rounded-full border-2 border-zinc-500 bg-zinc-800" />
					</Gutter>
					<p className="flex flex-wrap items-baseline gap-x-3 px-3 py-3">
						<span className="text-sm text-red-400">{shortHash('init')}</span>
						<span className="text-lg font-semibold text-zinc-300">{t.initialCommit}</span>
						<span className="text-sm text-zinc-400">{t.education}</span>
					</p>
				</li>
			</ol>
		</Section>
	);
}
