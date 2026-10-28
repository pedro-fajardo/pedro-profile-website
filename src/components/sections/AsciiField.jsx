import { useEffect, useRef } from 'react';

// Hero background: a full-screen grid of monospace characters driven by
// interfering waves. Crests turn red and become code glyphs; the cursor lights
// up the field, and clicks, taps and terminal commands send ripples through it.

const RAMP = '·:+*'; // dim → bright, for the zinc levels
const CODE = '{}<>/=;()$#01'; // glyphs used on the red crests
// colour per brightness bucket (0 = not drawn)
const COLORS = [null, 'rgb(82 82 92 / 0.55)', 'rgb(113 113 123 / 0.7)', '#82181a', '#c10007', '#ff6467', '#ffe2e2'];
const THRESHOLDS = [0.3, 0.42, 0.54, 0.67, 0.83, 1];

const FPS = 30;
const BOOT_MS = 1700;
const RIPPLE_SPEED = 0.45; // px per ms
const RIPPLE_LIFE = 2400;
const IDLE_RIPPLE_MS = 3800;

function bucketOf(level) {
	let b = 0;
	while (b < THRESHOLDS.length && level >= THRESHOLDS[b]) b++;
	return b;
}

export default function AsciiField() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let width = 0;
		let height = 0;
		let cellW = 0;
		let cellH = 0;
		let fontSize = 14;
		let cells = { x: [], y: [], center: [], seed: [] };
		const batches = COLORS.map(() => []);

		const pointer = { x: -1e4, y: -1e4 };
		const ripples = [];
		const startedAt = performance.now();
		let lastInput = startedAt;
		let lastIdleRipple = startedAt;
		let frame = 0;
		let lastDraw = 0;
		let onScreen = true;

		const setFont = () => {
			ctx.font = `500 ${fontSize}px "Source Code Pro Variable", ui-monospace, monospace`;
			ctx.textBaseline = 'top';
		};

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			fontSize = width < 640 ? 12 : 15;
			cellW = fontSize * 0.8;
			cellH = fontSize * 1.35;
			setFont();

			const cols = Math.ceil(width / cellW);
			const rows = Math.ceil(height / cellH);
			const n = cols * rows;
			cells = { x: new Float32Array(n), y: new Float32Array(n), center: new Float32Array(n), seed: new Uint8Array(n) };
			const cx = width / 2;
			const cy = height * 0.45;
			for (let r = 0, i = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++, i++) {
					const x = c * cellW;
					const y = r * cellH;
					cells.x[i] = x;
					cells.y[i] = y;
					cells.center[i] = Math.hypot(x - cx, y - cy);
					cells.seed[i] = (c * 73 + r * 151) & 255;
				}
			}
			if (reduceMotion) draw(startedAt + 9000);
		};

		const addRipple = (x, y, now = performance.now()) => {
			ripples.push({ x, y, t: now });
			if (ripples.length > 6) ripples.shift();
		};

		function draw(now) {
			const t = (now - startedAt) / 1000;
			const boot = reduceMotion ? Infinity : ((now - startedAt) / BOOT_MS) * Math.max(width, height);
			const tick = Math.floor(t * 3);
			const { x: xs, y: ys, center, seed } = cells;

			for (const b of batches) b.length = 0;
			for (let r = ripples.length - 1; r >= 0; r--) if (now - ripples[r].t > RIPPLE_LIFE) ripples.splice(r, 1);

			for (let i = 0; i < xs.length; i++) {
				const x = xs[i];
				const y = ys[i];
				const dc = center[i];
				if (dc > boot) continue; // not switched on yet

				// interfering waves, normalised to 0..1 and sharpened so most of the field stays dim
				let v =
					Math.sin(x * 0.009 + y * 0.004 + t * 0.55) +
					Math.sin(y * 0.012 - x * 0.005 - t * 0.4) +
					Math.sin((x - y) * 0.006 + t * 0.25) +
					Math.sin(dc * 0.016 - t * 1.0);
				v = (v + 4) / 8;
				let level = v ** 2.6 * 1.35;

				// boot shock-wave front
				const front = boot - dc;
				if (front < 90) level += (1 - front / 90) * 0.9;

				// cursor spotlight
				const dp = Math.hypot(x - pointer.x, y - pointer.y);
				if (dp < 170) {
					const k = 1 - dp / 170;
					level += k * k * 0.95;
				}

				// ripples
				for (let r = 0; r < ripples.length; r++) {
					const rp = ripples[r];
					const age = now - rp.t;
					const band = Math.abs(Math.hypot(x - rp.x, y - rp.y) - age * RIPPLE_SPEED);
					if (band < 46) level += (1 - band / 46) * (1 - age / RIPPLE_LIFE) * 1.1;
				}

				const bucket = bucketOf(level);
				if (bucket === 0) continue;
				const char =
					bucket <= 2
						? RAMP[(seed[i] + bucket) % RAMP.length]
						: CODE[(seed[i] + tick * (1 + (seed[i] & 3))) % CODE.length];
				batches[bucket].push(x, y, char);
			}

			ctx.clearRect(0, 0, width, height);
			for (let b = 1; b < batches.length; b++) {
				const batch = batches[b];
				if (!batch.length) continue;
				ctx.fillStyle = COLORS[b];
				for (let k = 0; k < batch.length; k += 3) ctx.fillText(batch[k + 2], batch[k], batch[k + 1]);
			}
		}

		const loop = (now) => {
			frame = 0;
			if (!onScreen || document.hidden) return;
			frame = requestAnimationFrame(loop);
			if (now - lastDraw < 1000 / FPS) return;
			lastDraw = now;

			// keep the field alive when nobody is interacting (and on touch screens)
			if (now - lastInput > 3000 && now - lastIdleRipple > IDLE_RIPPLE_MS) {
				lastIdleRipple = now;
				addRipple(width * (0.15 + Math.random() * 0.7), height * (0.15 + Math.random() * 0.7), now);
			}
			draw(now);
		};
		const start = () => {
			if (!reduceMotion && !frame) frame = requestAnimationFrame(loop);
		};

		const rectOf = () => canvas.getBoundingClientRect();
		const onMove = (e) => {
			if (e.pointerType !== 'mouse') return;
			const rect = rectOf();
			pointer.x = e.clientX - rect.left;
			pointer.y = e.clientY - rect.top;
			lastInput = performance.now();
		};
		const onLeave = () => {
			pointer.x = pointer.y = -1e4;
		};
		const onDown = (e) => {
			const rect = rectOf();
			addRipple(e.clientX - rect.left, e.clientY - rect.top);
			lastInput = performance.now();
		};
		const onCommand = () => {
			const input = document.getElementById('terminal-input')?.getBoundingClientRect();
			const rect = rectOf();
			if (input) addRipple(input.left - rect.left + 40, input.top - rect.top + input.height / 2);
			lastInput = performance.now();
		};
		const onVisibility = () => (document.hidden ? null : start());

		const hero = canvas.parentElement;
		const resizeObserver = new ResizeObserver(resize);
		const visibilityObserver = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			if (onScreen) start();
		});
		resizeObserver.observe(canvas);
		visibilityObserver.observe(canvas);
		hero.addEventListener('pointermove', onMove);
		hero.addEventListener('pointerleave', onLeave);
		hero.addEventListener('pointerdown', onDown);
		window.addEventListener('terminal-command', onCommand);
		document.addEventListener('visibilitychange', onVisibility);
		// the web font may arrive after the first frame
		document.fonts?.ready.then(() => (setFont(), reduceMotion && draw(startedAt + 9000)));
		start();

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			visibilityObserver.disconnect();
			hero.removeEventListener('pointermove', onMove);
			hero.removeEventListener('pointerleave', onLeave);
			hero.removeEventListener('pointerdown', onDown);
			window.removeEventListener('terminal-command', onCommand);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
		/>
	);
}
