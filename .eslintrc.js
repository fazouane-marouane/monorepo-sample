/**
 * TODO try to find what's worng with eslint-config-react-app
 * It gives
 * ESLint: Error while loading rule 'react/jsx-no-bind': You cannot require
 * a package ("react") that is not declared in your dependencies
 */
module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/babel", "prettier/react"],
  plugins: ["react", "import", "prettier"],
  plugins: ["prettier"],
  env: {
    browser: true,
    jest: true
  },
  settings: {
    "import/resolver": {
      [require.resolve("./scripts/eslint-resolver.js")]: {}
    }
  },
  rules: {
    "import/prefer-default-export": 0
  }
};
