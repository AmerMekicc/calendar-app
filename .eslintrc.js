module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json"],
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: [],
      rules: {
        "@angular-eslint/component-selector": [
          "error",
          {
            prefix: "app",
            style: "kebab-case",
            type: "element",
          },
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            prefix: "app",
            style: "camelCase",
            type: "attribute",
          },
        ],
        "no-restricted-globals": [
          "error",
          {
            name: "fdescribe",
            message: "Do not commit 'fdescribe'. Use 'describe' instead.",
          },
          {
            name: "fit",
            message: "Do not commit 'fit'. Use 'it' instead.",
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
        "@typescript-eslint/no-misused-promises": ["warn"],
        "@typescript-eslint/no-unsafe-argument": ["warn"],
        "@typescript-eslint/no-unsafe-assignment": ["warn"],
        "@typescript-eslint/no-unsafe-member-access": ["warn"],
        "@typescript-eslint/unbound-method": ["warn"],
        "no-console": [
          "error",
          {
            allow: ["error", "warn"],
          },
        ],
      },
    },
    {
      files: ["*.spec.ts"],
      rules: {
        "@typescript-eslint/no-floating-promises": ["off"],
      },
    },
    {
      files: ["*.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {},
    },
  ],
  extends: [],
};
