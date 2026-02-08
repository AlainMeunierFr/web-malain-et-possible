import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Scripts, tests, configs, utils, components : éviter de bloquer le pre-commit (dette à résorber)
  {
    files: [
      "scripts/**/*.ts",
      "tests/bdd/**/*.ts",
      "tests/integration/**/*.ts",
      "tests/unit/**/*.ts",
      "tests/unit/**/*.tsx",
      "utils/backoffice/**/*.ts",
      "utils/vitrine/**/*.ts",
      "playwright*.config.ts",
      "components/**/*.tsx",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
