// Generates web-ready images in public/images from the originals in assets/originals.
// Run with `npm run images` whenever an original is added or replaced.
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/originals';
const OUT = 'public/images';

// width variants per folder; the largest is also the fallback `src`
const VARIANTS = {
	projects: [640, 1200],
	company: [128],
	certifications: [160],
	'.': [480],
};

async function convert(folder, file) {
	const name = path.parse(file).name;
	const input = path.join(SRC, folder, file);
	await mkdir(path.join(OUT, folder), { recursive: true });

	for (const width of VARIANTS[folder]) {
		const target = path.join(OUT, folder, `${name}-${width}.webp`);
		await sharp(input)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: 78, effort: 6 })
			.toFile(target);
		console.log('✓', target);
	}
}

// ICO files may hold PNG images directly (supported by every current browser),
// so a multi-size favicon is just a small header + directory + the PNGs.
async function writeIco(source, sizes, target) {
	const pngs = await Promise.all(
		sizes.map((s) => sharp(source).resize(s, s).png({ compressionLevel: 9, palette: s <= 32 }).toBuffer()),
	);
	const header = Buffer.alloc(6 + 16 * sizes.length);
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(sizes.length, 4);
	let offset = header.length;
	sizes.forEach((s, i) => {
		const e = 6 + 16 * i;
		header.writeUInt8(s, e);
		header.writeUInt8(s, e + 1);
		header.writeUInt16LE(1, e + 4); // colour planes
		header.writeUInt16LE(32, e + 6); // bits per pixel
		header.writeUInt32LE(pngs[i].length, e + 8);
		header.writeUInt32LE(offset, e + 12);
		offset += pngs[i].length;
	});
	await writeFile(target, Buffer.concat([header, ...pngs]));
}

async function icons() {
	const photo = path.join(SRC, 'PedroFajardo.jpg');
	await writeIco(path.join(SRC, 'icons', 'favicon.png'), [16, 32, 48], path.join('public', 'favicon.ico'));
	console.log('✓ favicon.ico');
	for (const [size, file] of [[180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
		await sharp(photo).resize(size, size).png({ palette: true, quality: 85, effort: 10 }).toFile(path.join('public', file));
		console.log('✓', file);
	}

	// Open Graph cards, one per language: photo on the right, name on the left
	const face = await sharp(photo).resize(380, 380).toBuffer();
	const cards = [
		['og-image.jpg', 'Frontend &amp; GenAI developer'],
		['og-image-pt.jpg', 'Programador Frontend &amp; GenAI'],
	];
	for (const [file, role] of cards) {
		const svg = `
			<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
				<rect width="1200" height="630" fill="#18181b"/>
				<rect x="64" y="64" width="12" height="12" fill="#ef4444"/>
				<text x="92" y="76" font-family="Consolas, monospace" font-size="22" fill="#a1a1aa">www.pedrofajardodev.com</text>
				<text x="64" y="300" font-family="Consolas, monospace" font-weight="700" font-size="88" fill="#f4f4f5">Pedro Fajardo</text>
				<text x="64" y="370" font-family="Consolas, monospace" font-size="38" fill="#f87171">${role}</text>
				<text x="64" y="540" font-family="Consolas, monospace" font-size="24" fill="#a1a1aa">React · TypeScript · OutSystems · .NET</text>
			</svg>`;
		await sharp(Buffer.from(svg))
			.composite([{ input: face, left: 756, top: 125 }])
			.jpeg({ quality: 82, mozjpeg: true })
			.toFile(path.join(OUT, file));
		console.log('✓', file);
	}
}

for (const folder of Object.keys(VARIANTS)) {
	const files = await readdir(path.join(SRC, folder), { withFileTypes: true });
	for (const f of files) if (f.isFile()) await convert(folder, f.name);
}
await icons();
