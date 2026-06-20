import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "@/FSD_shared/styles/variables" as *;
					@use "@/FSD_shared/styles/mixins" as *;
                `,
			},
		},
	},
});
