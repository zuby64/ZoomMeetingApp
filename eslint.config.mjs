// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "babel.config.js", // Ignore babel config file
      "metro.config.js", // Ignore metro config file
      "eslintrc.js", // Ignore eslint config file itself
      "remove-console.js", // Ignore script to remove console logs
      "node_modules/**", // Ignore node_modules
      "dist/**", // Ignore dist folder
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], 
    languageOptions: { globals: globals.browser }, // Allow browser globals
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // Allow `module` and `process` globals for config files
    languageOptions: {
      globals: {
        ...globals.browser, // Keep browser globals
        module: "readonly", // Define module as readonly global
        process: "readonly", // Define process as readonly global
      },
    },
  },
]);
