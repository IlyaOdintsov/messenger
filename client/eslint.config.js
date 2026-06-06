import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

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
			'@typescript-eslint': tsPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},

		rules: {
			'import/no-relative-packages': 'error',
			'import/no-relative-parent-imports': 'error',
			'prettier/prettier': 'error',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'no-console': 'warn',
			eqeqeq: ['warn', 'smart'],
			curly: ['warn', 'multi-line'],
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'react/prop-types': 'off',
			'no-empty-function': 'warn',
			semi: ['warn', 'always'],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
		},
	},
]);
