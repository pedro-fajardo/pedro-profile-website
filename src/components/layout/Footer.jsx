import { useLocale } from '../../i18n';

export default function Footer() {
	const { footer: t, data } = useLocale();

	return (
		<footer className="bg-red-700 py-4 text-center text-white">
			<p>
				© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {data.PROFILE.name} - {t.rights}
			</p>
		</footer>
	);
}
