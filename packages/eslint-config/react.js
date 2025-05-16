import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import mantine from "eslint-config-mantine";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginTanstackQuery from "@tanstack/eslint-plugin-query";
import { config as baseConfig } from "./base.js";
/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import('eslint").Linter.Config[]}
 * */
export const config = [
  ...baseConfig,
  ...mantine,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.node,
        ...globals.commonjs,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
      "@tanstack/query": pluginTanstackQuery,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginTanstackQuery.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
