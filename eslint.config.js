// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Global ignores for the whole project
  {
    ignores: ["node_modules/", "dist/"],
  },

  // --- CONFIGURATION FOR YOUR BACKEND (Node.js Server) ---
  {
    files: ["server/**/*.js"], // Apply ONLY to files in the 'server' folder
    languageOptions: {
      globals: {
        ...globals.node, // This is the key: It enables Node.js global variables like 'process'
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "no-unused-vars": "warn",
    },
  },

  // --- CONFIGURATION FOR YOUR FRONTEND (React App) ---
  {
    files: ["src/**/*.{js,jsx}"], // Apply ONLY to files in the 'src' folder
    plugins: {
      'react': pluginReact,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser, // Use browser globals for the frontend
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect", // Automatically detect your React version
      },
    },
  },
];