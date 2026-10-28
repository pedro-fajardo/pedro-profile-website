// Renders dictionary text where `*word*` marks a highlighted word.
export default function Rich({ text, className = 'font-semibold text-red-400' }) {
	return text.split(/\*([^*]+)\*/).map((part, i) =>
		i % 2 ? (
			<span key={i} className={className}>
				{part}
			</span>
		) : (
			part
		),
	);
}
