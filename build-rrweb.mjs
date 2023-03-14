import * as fs from 'node:fs'
import esbuild from 'esbuild'

const packageJson = JSON.parse(
	fs.readFileSync('node_modules/@highlight-run/rrweb/package.json'),
)

// TODO: use existing build process instead? also copy over css
esbuild.build({
	entryPoints: ['node_modules/@highlight-run/rrweb/' + packageJson.module],
	bundle: true,
	sourcemap: false,
	format: 'esm',
	platform: 'browser',
	outfile: 'frontend/src/bundles/rrweb.js',
	minify: true,
	target: 'esnext',
	// external: Object.keys(packageJson.dependencies).concat(
	//   Object.keys(packageJson.peerDependencies),
	// ),
	logLevel: 'info',
})
