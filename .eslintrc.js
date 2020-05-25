module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "react/prop-types": "off",
  },
};
