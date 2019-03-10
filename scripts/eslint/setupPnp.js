const path = require('path');
const Module = require('module');
var parent = new Module('internal/preload', null);
Module._load(path.resolve(__dirname, '../../.pnp.js'), parent, false);
