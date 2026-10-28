// Stable 7-char "commit hash" for a string (FNV-1a), so git-log rows look real
// and render identically on the server and in the browser.
export function shortHash(input) {
	let h = 0x811c9dc5;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 0x01000193);
	}
	return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

