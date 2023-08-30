// https://nuxt.com/docs/api/configuration/nuxt-config
import dynamicImport from 'vite-plugin-dynamic-import';
import eslint from 'vite-plugin-eslint';

const VUE_APP_ENDPOINT = process.env.VUE_APP_ENDPOINT || '';

export default defineNuxtConfig({
	devtools: { enabled: true },

	runtimeConfig:
	{
		public:
		{
			API_URL: VUE_APP_ENDPOINT,
		}
	},

	css: ['~/assets/scss/style.scss'],

	vite:
	{
		LintOnStart: false,

		plugins: [dynamicImport(), eslint({ lintOnStart: false, failOnError: false, failOnWarning: false })],

		css:
		{
			preprocessorOptions:
			{
				scss:
				{
					additionalData: `
						@import "~/assets/scss/base/variables.scss";
					`,
				},
			},
		},
	},
});
