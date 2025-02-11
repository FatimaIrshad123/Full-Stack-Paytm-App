/** @type {import("eslint").Linter.Config} */
module.exports = {
  "rules": {
    "no-unused-vars": "warn"
  },
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
