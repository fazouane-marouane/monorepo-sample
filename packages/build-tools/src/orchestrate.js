const spawn = require("cross-spawn");
const mkdirp = require("mkdirp");
const uuidv4 = require("uuid/v4");

const hash = `/${uuidv4()}`;

const cp = spawn(process.argv[2], process.argv.slice(3), {
  stdio: "inherit",
  env: {
    ...process.env,
    SOME_HASH: hash,
    REACT_APP_BUILD_NUMBER: 42
  }
});

process.on("SIGTERM", () => cp.kill("SIGTERM"));
process.on("SIGINT", () => cp.kill("SIGINT"));
process.on("SIGBREAK", () => cp.kill("SIGBREAK"));
process.on("SIGHUP", () => cp.kill("SIGHUP"));

cp.on("exit", e => {
  if (e) {
    process.exit(e);
  }
  console.info("Finishing build step");
  mkdirp(`build/${hash}`, err => {
    if (err) {
      process.exit(e);
    }
  });
});
