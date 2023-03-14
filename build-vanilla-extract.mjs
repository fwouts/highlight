import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import chokidar from 'chokidar'
import esbuild from 'esbuild'
import * as path_ from 'node:path'
import readdirp from 'readdirp'
import * as fs from 'node:fs'

// Uncomment for cleanup
// TODO: automate this by checking for css.ts next to each
// const removals = []
// for await (const entry of readdirp('.', {
// 	fileFilter: '**.css.generated.js',
// 	directoryFilter: ['!.git', '!node_modules'],
// })) {
// 	const { path } = entry
// 	removals.push(fs.promises.rm(path))
// }

// await Promise.all(removals)

const watchedFiles = ['**.css.ts']
const outputFiles = ['**.css.generated.js']

const build = async (path) => {
	console.log('building', path)
	await esbuild.build({
		entryPoints: [path_.join(process.cwd(), path)],
		entryNames: '[name].generated',
		bundle: true,
		// TODO: support user supplied sourcemaps
		// sourcemap: true,
		format: 'esm',
		platform: 'browser',
		outdir: path_.dirname(path_.join(process.cwd(), path)),
		minify: true,
		splitting: false,
		target: 'esnext',
		// Working directory apparently affects vanilla extract's hashes?
		// Using frontend to stay consistent with vite setup
		absWorkingDir: path_.join(process.cwd(), 'frontend'),
		plugins: [
			vanillaExtractPlugin({
				// We don't output css here, only the js modules for each stylesheet entrypoint
				outputCss: false,
				identifiers: 'short',
			}),
		],
		external: [],
		logLevel: 'warning',
	})
	console.log('built', path)
	return
}

const removeBuildOutput = async (path) => {
	console.log('removing', path)
	await fs.promises.rm(path, { force: true })
}

await Promise.all(
	(
		await readdirp.promise('.', {
			fileFilter: outputFiles,
			directoryFilter: ['!.git', '!node_modules'],
		})
	).map(({ path }) => removeBuildOutput(path)),
)

await Promise.all(
	(
		await readdirp.promise('.', {
			fileFilter: watchedFiles,
			directoryFilter: ['!.git', '!node_modules'],
		})
	).map(({ path }) => build(path)),
)

chokidar
	.watch(watchedFiles, {
		// not sure why this doesn't seem to work?
		// cwd: workingDirectory,
		// Also not working? using a manual readdirp pass instead
		// ignoreInitial: false,
		ignoreInitial: true,
		ignored: ['**/.git/**', '**/node_modules/**'],
	})
	.on('add', build)
	.on('change', build)
	.on('unlink', (path) =>
		removeBuildOutput(path.slice(0, -3) + '.generated.js'),
	)
	.on('ready', () => console.log('ready'))
