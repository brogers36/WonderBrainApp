'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');

const PLACEHOLDER = '__RELEASE_VERSION__';
const APP_FILES = [
  'index.html', 'manifest.webmanifest', 'icons/icon-192.png',
  'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];

// Paths and exact byte lengths separate each input unambiguously. No clock,
// network, dependencies, or changing version string participates in this hash.
function releaseVersion(inputs) {
  const hash = crypto.createHash('sha256');
  for (const [name, content] of [...inputs].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) {
    const nameBytes = Buffer.from(name, 'utf8');
    const contentBytes = Buffer.isBuffer(content) ? content : Buffer.from(content);
    hash.update(`${nameBytes.length}:`);
    hash.update(nameBytes);
    hash.update(`${contentBytes.length}:`);
    hash.update(contentBytes);
  }
  return 'v3.1-' + hash.digest('hex');
}

function stampWorker(source, inputs) {
  const assignment = /^const VERSION = '[^'\r\n]+';$/gm;
  if ([...source.matchAll(assignment)].length !== 1) throw Error('Expected exactly one service worker VERSION assignment');
  const template = source.replace(assignment, `const VERSION = '${PLACEHOLDER}';`);
  if (template.split(PLACEHOLDER).length !== 2) throw Error('Expected exactly one service worker version placeholder');
  const version = releaseVersion([...inputs, ['sw-template.js', Buffer.from(template, 'utf8')]]);
  const worker = template.replace(PLACEHOLDER, version);
  new vm.Script(worker);
  return {version, worker};
}

function prepareRelease(root = path.resolve(__dirname, '..')) {
  // Read every required file before modifying sw.js; missing assets fail early.
  const inputs = APP_FILES.map(name => [name, fs.readFileSync(path.join(root, name))]);
  const workerPath = path.join(root, 'sw.js');
  const source = fs.readFileSync(workerPath, 'utf8');
  const {version, worker} = stampWorker(source, inputs);
  const updated = worker !== source;
  if (updated) fs.writeFileSync(workerPath, worker);
  return {version, updated};
}

if (require.main === module) console.log(JSON.stringify(prepareRelease()));
module.exports = {releaseVersion, stampWorker, prepareRelease};
