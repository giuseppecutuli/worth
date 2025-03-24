import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  {
    ignores: [
      'eslint.config.mjs',
      'eslint.config.js',
      'prettier.config.mjs'
    ],
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "semi": ["error", "never"],
      "quotes": ["error", "single"],
      "object-curly-spacing": ["error", "always"],
      "no-multiple-empty-lines": "error",
      "no-multi-spaces": "error",
      "prettier/prettier": ["error", { "semi": false }],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
]
