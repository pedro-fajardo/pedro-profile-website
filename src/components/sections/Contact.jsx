import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prompt } from '../ui/Section';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';
import { useLocale } from '../../i18n';

// EmailJS public identifiers (safe to ship; the template variable names
// firstName, lastName, email, phone and message must match the EmailJS template).
const EMAILJS = {
	serviceId: 'service_6fffpwv',
	templateId: 'template_3uxm2fd',
	publicKey: '43gKPNAqBCiNmW4el',
};

const inputClass =
	'mt-1.5 w-full rounded-md border border-zinc-700 bg-zinc-800/80 px-3 py-2.5 text-base text-zinc-100 caret-red-500 outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/25 user-invalid:border-red-400';

function Field({ label, optional, children }) {
	const { contact: t } = useLocale();

	return (
		<label className="block text-sm text-zinc-300">
			<span className="text-red-400">? </span>
			{label}
			{optional && <span className="text-zinc-400"> {t.optional}</span>}
			{children}
		</label>
	);
}

function CopyEmail() {
	const { contact: t, data } = useLocale();
	const { PROFILE } = data;
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(PROFILE.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			window.location.href = `mailto:${PROFILE.email}`;
		}
	};

	return (
		<button
			type="button"
			onClick={copy}
			className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-white/25 px-3 text-xs text-white transition hover:border-white/60"
		>
			{copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
			<span aria-live="polite">{copied ? t.copied : t.copy}</span>
		</button>
	);
}

export default function Contact() {
	const { contact: t, data } = useLocale();
	const { PROFILE } = data;
	// idle | sending | sent | error
	const [status, setStatus] = useState('idle');
	const [sentTo, setSentTo] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = Object.fromEntries(new FormData(form));
		setStatus('sending');
		try {
			// loaded on demand so it never weighs on the first page load
			const { default: emailjs } = await import('@emailjs/browser');
			await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, data, { publicKey: EMAILJS.publicKey });
			setSentTo(data.email);
			setStatus('sent');
			form.reset();
		} catch {
			setStatus('error');
		}
	};

	return (
		<section id="contact" aria-labelledby="contact-title" className="bg-linear-to-b from-zinc-800 via-zinc-800 to-red-700">
			<div className="mx-auto max-w-4xl px-4 pt-16 pb-14 sm:px-6 md:pt-28">
				<header data-reveal className="mb-10 text-center">
					<Prompt className="inline-block text-xs sm:text-sm">./contact.sh</Prompt>
					<h2 id="contact-title" className="mt-3 text-[clamp(1.75rem,7vw,3rem)] font-bold text-zinc-100">
						{t.title}
					</h2>
					<p className="mt-4 text-zinc-300">{t.intro}</p>
				</header>

				<form
					data-reveal
					onSubmit={onSubmit}
					className="overflow-hidden rounded-xl border border-zinc-700/70 bg-zinc-900/95 shadow-2xl shadow-black/40 md:bg-zinc-900/85 md:backdrop-blur-md"
				>
					<div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3 text-xs text-zinc-400">
						<span className="size-3 rounded-full bg-red-500" />
						<span className="size-3 rounded-full bg-zinc-600" />
						<span className="size-3 rounded-full bg-zinc-600" />
						<span className="ml-2">{t.window}</span>
					</div>

					<div className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5 md:p-8">
						<Field label={t.firstName}>
							<input name="firstName" required autoComplete="given-name" className={inputClass} />
						</Field>
						<Field label={t.lastName}>
							<input name="lastName" required autoComplete="family-name" className={inputClass} />
						</Field>
						<Field label={t.email}>
							<input name="email" type="email" required autoComplete="email" className={inputClass} />
						</Field>
						<Field label={t.phone} optional>
							<input name="phone" type="tel" autoComplete="tel" pattern="[+0-9 \(\)\-]{6,20}" title={t.phoneHint} className={inputClass} />
						</Field>
						<div className="sm:col-span-2">
							<Field label={t.message}>
								<textarea name="message" required minLength={10} rows={5} className={`${inputClass} resize-y`} />
							</Field>
						</div>

						<div className="flex flex-wrap items-center gap-4 sm:col-span-2">
							<button
								type="submit"
								disabled={status === 'sending'}
								className="w-full rounded-md bg-red-600 px-5 py-3 font-semibold sm:w-auto sm:py-2.5 text-white shadow-lg transition hover:bg-red-700 disabled:opacity-60"
							>
								{status === 'sending' ? t.sending : t.send}
							</button>
							<p role="status" className="text-sm">
								{status === 'sent' && <span className="text-green-400">{t.sent(sentTo)}</span>}
								{status === 'error' && (
									<span className="text-red-400">{t.error}</span>
								)}
							</p>
						</div>
					</div>
				</form>

				<div className="mt-12 flex flex-col items-center gap-5">
					<p className="flex flex-wrap items-center justify-center gap-3 text-white">
						<a href={`mailto:${PROFILE.email}`} className="py-2 break-all underline decoration-white/40 underline-offset-4 hover:decoration-white">
							{PROFILE.email}
						</a>
						<CopyEmail />
					</p>
					<div className="flex gap-5">
						<a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-12 place-items-center text-zinc-200 transition hover:text-white">
							<GitHubIcon className="size-9" />
						</a>
						<a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-12 place-items-center text-zinc-200 transition hover:text-white">
							<LinkedInIcon className="size-9" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
