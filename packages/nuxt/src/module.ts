import { resolve } from 'path';
import defu from 'defu';
import type { Module } from '@nuxt/types';
import { DirectusNuxtOptions } from './types';

export * from './types';

const directusModule: Module<DirectusNuxtOptions> = function (moduleOptions) {
	const { nuxt } = this;

	// Merge options from directus in nuxt.config & module options
	const options = defu(nuxt.options.directus, moduleOptions);

	// Transpile and alias runtime
	const runtimeDir = resolve(__dirname, 'runtime');
	this.nuxt.options.alias['~directus'] = runtimeDir;
	this.nuxt.options.build.transpile.push(runtimeDir, '@directus/nuxt');

	// Add directus nuxt plugin
	this.addPlugin({
		src: resolve(__dirname, './templates/plugin.mjs'),
		fileName: 'directus/plugin.js',
		options,
	});
};

export default directusModule;
