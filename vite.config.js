import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	// absolute paths: pages live at / and /pt/, so relative asset URLs would break
	base: '/',
	plugins: [react(), tailwindcss()],
	build: {
		// keep CRA's output folder so the existing Vercel settings keep working
		outDir: 'build',
		assetsInlineLimit: 0,
	},
});
