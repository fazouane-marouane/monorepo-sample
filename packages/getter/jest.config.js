module.exports = {
  resolver: require.resolve(`jest-pnp-resolver`),
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": require.resolve("./babelConfig")
  },
  verbose: true
};
