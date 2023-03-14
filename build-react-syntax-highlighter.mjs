import * as fs from 'node:fs'
import esbuild from 'esbuild'

const packageJson = JSON.parse(
	fs.readFileSync('node_modules/react-syntax-highlighter/package.json'),
)

esbuild.build({
	entryPoints: [
		'node_modules/react-syntax-highlighter/dist/esm/index.js',
		'node_modules/react-syntax-highlighter/dist/esm/styles/prism/index.js',
	],
	bundle: true,
	sourcemap: false,
	format: 'esm',
	platform: 'browser',
	outdir: 'frontend/src/bundles/react-syntax-highlighter',
	minify: true,
	splitting: false,
	target: 'esnext',
	external: [...Object.keys(packageJson.peerDependencies), '@babel/runtime'],
	logLevel: 'info',
})
