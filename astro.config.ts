import type { defineConfig } from "astro/config";

export default (await import("astro/config")).defineConfig({
	srcDir: "./Source",
	publicDir: "./Public",
	outDir: "./Target",
	site: "HTTPS://Souq.Dev",
	compressHTML: true,
	prefetch: true,
	build: {
		concurrency: 9999
	},
	integrations: [
		// @ts-ignore
		import.meta.env.MODE === "production"
			? (await import("astrojs-service-worker")).default()
			: null,
		(await import("@astrojs/sitemap")).default(),
		(await import("@playform/inline")).default({ Logger: 1 }),
		(await import("@playform/format")).default({ Logger: 1 }),
		(await import("@playform/compress")).default({ Logger: 1 }),
	],
	experimental: {
		directRenderScript: true,
		clientPrerender: true,
		globalRoutePriority: true,
		serverIslands: true,
	},
	vite: {
		build: {
			sourcemap: true,
		},
		resolve: {
			preserveSymlinks: true,
		},
		css: {
			devSourcemap: true,
			transformer: "postcss",
		},
	},
}) as typeof defineConfig;
