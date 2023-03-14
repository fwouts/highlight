import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import esbuild from 'esbuild'
import stylePlugin from 'esbuild-style-plugin'
import * as fs from 'node:fs'
import tailwindcss from 'tailwindcss'

const ignorePlugin = {
	name: 'ignore-imports',
	setup(build) {
		build.onLoad({ filter: /\.(svg|png|gif|jpeg)$/ }, () => ({
			contents: '',
		}))
	},
}

const resultPlugin = {
	name: 'result-plugin',
	setup(build) {
		build.onEnd(async (result) => {
			const cssOutput = result.outputFiles.find(({ path }) =>
				path.endsWith('index.css'),
			)

			await fs.promises.writeFile(
				'./src/bundles/index.css',
				cssOutput.contents,
			)
			console.log('built', cssOutput.path)
		})
	},
}

await fs.promises.mkdir('./src/bundles', { recursive: true })

// const isModule = path.endsWith('.module.scss')
// console.log('building', path)
const context = await esbuild.context({
	entryPoints: ['./src/index.tsx'],
	// entryNames: '[dir]/[name][ext]',
	// outExtension: { '.js': '.scss.js' },
	bundle: true,
	// TODO: support user supplied sourcemaps
	// sourcemap: true,
	format: 'esm',
	allowOverwrite: true,
	platform: 'browser',
	outdir: './src/bundles/built/',
	minify: true,
	splitting: false,
	target: 'esnext',
	plugins: [
		stylePlugin({
			cssModulesOptions: {
				localsConvention: 'camelCaseOnly',
			},
			postcss: {
				plugins: [tailwindcss()],
			},
		}),
		ignorePlugin,
		vanillaExtractPlugin({ identifiers: 'short' }),
		resultPlugin,
	],
	external: [],
	write: false,
	logLevel: 'warning',
})

await context.watch()
