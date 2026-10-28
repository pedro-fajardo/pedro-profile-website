// Month names come from the locale dictionary (not Intl), so server and
// client output are always identical.
export function formatMonth(yyyyMm, dates) {
	if (!yyyyMm) return dates.present;
	const [year, month] = yyyyMm.split('-');
	return `${dates.months[Number(month) - 1]} ${year}`;
}

export function formatRange(start, end, dates) {
	return `${formatMonth(start, dates)} – ${formatMonth(end, dates)}`;
}

export function yearsSince(year) {
	return new Date().getFullYear() - year;
}
