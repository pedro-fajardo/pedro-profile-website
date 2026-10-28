import { useState } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import Section from '../ui/Section';
import { GitHubIcon } from '../ui/BrandIcons';
import { useLocale } from '../../i18n';

// Permissions tell the truth: world-readable = public repo, owner-only = private.
const perms = (project) => (project.github ? 'drwxr-xr-x' : 'drwx------');

// `Heading` lets the inline phone copy avoid duplicating the panel's <h3>.
function Preview({ project, Heading = 'h3' }) {
	const { projects: t } = useLocale();

	return (
		<div className="space-y-4">
			<div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
				<img
					src={`${project.image}-1200.webp`}
					srcSet={`${project.image}-640.webp 640w, ${project.image}-1200.webp 1200w`}
					sizes="(min-width: 1024px) 480px, 100vw"
					alt={t.screenshotAlt(project.name)}
					width="1200"
					height="675"
					loading="lazy"
					decoding="async"
					className="aspect-video w-full object-cover object-top"
				/>
			</div>
			<div>
				<Heading className="text-2xl font-bold text-zinc-100">{project.name}</Heading>
				<p className="mt-2 leading-relaxed text-zinc-300">{project.description}</p>
			</div>
			<p className="flex flex-wrap gap-1.5">
				{project.stack.map((tech) => (
					<span key={tech} className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
						{tech}
					</span>
				))}
			</p>
			<div className="flex flex-wrap gap-3 pt-1">
				{project.link && (
					<a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm pointer-fine:py-2 font-semibold text-white transition hover:bg-red-700"
					>
						{t.visit} <ArrowUpRight className="size-4" aria-hidden="true" />
					</a>
				)}
				{project.github ? (
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg bg-zinc-700 px-4 py-3 text-sm pointer-fine:py-2 font-semibold text-white transition hover:bg-zinc-600"
					>
						<GitHubIcon className="size-4" /> GitHub
					</a>
				) : (
					<a
						href="#contact"
						className="inline-flex items-center gap-2 rounded-lg bg-zinc-700 px-4 py-3 text-sm pointer-fine:py-2 font-semibold text-white transition hover:bg-zinc-600"
					>
						<MessageSquare className="size-4" aria-hidden="true" /> {t.quote}
					</a>
				)}
			</div>
		</div>
	);
}

export default function Projects() {
	const { projects: t, data } = useLocale();
	const { PROJECTS } = data;
	const [selected, setSelected] = useState(PROJECTS[0].id);

	// On phones the preview opens inline, so closing the one above would make
	// the tapped row jump; keep it pinned to the top of the screen instead.
	const choose = (id, row) => {
		setSelected(id);
		if (window.matchMedia('(min-width: 1024px)').matches) return;
		requestAnimationFrame(() => row.scrollIntoView({ behavior: 'smooth', block: 'start' }));
	};

	return (
		<Section id="projects" title={t.title} command="ls -la ~/projects">
			<div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
				<div data-reveal className="self-start rounded-xl border border-zinc-700/70 bg-zinc-900/80 p-2 sm:p-3 md:p-5">
					<p className="px-3 pb-2 text-sm text-zinc-400">total {PROJECTS.length}</p>
					<ul>
						{PROJECTS.map((project) => {
							const isSelected = project.id === selected;
							return (
								<li key={project.id}>
									<button
										type="button"
										onClick={(e) => choose(project.id, e.currentTarget)}
										onMouseEnter={() => window.matchMedia('(min-width: 1024px)').matches && setSelected(project.id)}
										aria-expanded={isSelected}
										className={`grid w-full scroll-mt-20 grid-cols-[auto_1fr] items-baseline gap-x-3 rounded-lg px-3 py-3 text-left text-sm sm:gap-x-4 transition md:text-base ${
											isSelected ? 'bg-red-500/10' : 'hover:bg-zinc-700/30'
										}`}
									>
										<span className="text-zinc-400">{perms(project)}</span>
										<span className="flex min-w-0 flex-col gap-0.5">
											<span className={`font-semibold ${isSelected ? 'text-red-400' : 'text-zinc-100'}`}>
												{project.dir}/
											</span>
											<span className="truncate text-xs text-zinc-400">{project.stack.slice(0, 3).join(' · ')}</span>
										</span>
									</button>
									{isSelected && (
										<div className="px-3 pt-2 pb-6 lg:hidden">
											<Preview project={project} Heading="p" />
										</div>
									)}
								</li>
							);
						})}
					</ul>
					<p className="px-3 pt-3 text-xs text-zinc-400">drwx------ {t.privateNote}</p>
				</div>

				{/* every project is in the HTML (crawlable, no JS needed); only the selected one shows */}
				<div data-reveal className="hidden lg:sticky lg:top-8 lg:block lg:self-start">
					{PROJECTS.map((project) => (
						<article key={project.id} id={`project-${project.id}`} hidden={project.id !== selected}>
							<Preview project={project} />
						</article>
					))}
				</div>
			</div>
		</Section>
	);
}
