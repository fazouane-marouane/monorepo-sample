/**
 * TODO try to find what's worng with eslint-config-react-app
 * It gives
 * ESLint: Error while loading rule 'react/jsx-no-bind': You cannot require
 * a package ("react") that is not declared in your dependencies
 */
module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb" /*, "react-app"*/],
  plugins: ["react", "import"],
  env: {
    browser: true,
    jest: true
  },
  settings: {
    "import/resolver": {
      [require.resolve("./scripts/eslint-resolver.js")]: {}
    },
    react: {
      version: "16.8.4"
    }
  }
};
