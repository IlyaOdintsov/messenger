import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist']),

	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		extends: [
			js.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
			jsxA11y.configs.recommended,
			'plugin:prettier/recommended',
		],
		plugins: {
			prettier,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			'prettier/prettier': 'error',
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'react/react-in-jsx-scope': 'off',

			'no-console': 'warn',
			eqeqeq: ['warn', 'smart'],
			curly: ['warn', 'multi-line'],
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'react/prop-types': 'off',
			'no-empty-function': 'warn',
			semi: ['warn', 'always'],
			'react/react-in-jsx-scope': 'off',
		},
	},
]);
