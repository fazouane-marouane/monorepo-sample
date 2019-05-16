const spawn = require("cross-spawn");
const mkdirp = require("mkdirp");
const uuidv4 = require("uuid/v4");
const uniq = require("lodash/uniq");
const trim = require("lodash/trim");
const size = require("lodash/size");

const hash = `/${uuidv4()}`;

function getPathName(env) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(env)) {
    if (key.toLocaleLowerCase() === "path") {
      return key;
    }
  }
  return "Path";
}

function getPathContent(env) {
  return env[getPathName(env)];
}

function normalizedEnvPath(pathContent) {
  const isWin = process.platform === "win32";
  const separator = isWin ? ";" : ":";
  return uniq((pathContent || "").split(separator).map(trim)).join(separator);
}

const oldEnvPathContent = getPathContent(process.env);
const newEnvPathContent = normalizedEnvPath(oldEnvPathContent);

console.log(
  `Spawning a process, old env's path size = ${size(
    oldEnvPathContent
  )}, new env's path size = ${size(newEnvPathContent)}`
);

const cp = spawn(process.argv[2], process.argv.slice(3), {
  stdio: "inherit",
  env: {
    ...process.env,
    // Without this, each time we call "yarn sth" the env's path will keep growing until causing issues on Windows
    [getPathName(process.env)]: newEnvPathContent,
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
