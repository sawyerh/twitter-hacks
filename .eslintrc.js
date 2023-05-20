module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "@emotion"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  globals: {
    twttr: true,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "react/prop-types": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
};
