const Path = require('path');
const fs = require('fs-extra');
const mime = require('mime-types');
const readdirp = require('readdirp');
const config = require('./config');

function find(options) {
  return new Promise((resolve, reject) => {
    const files = [];
    readdirp(options)
      .on('data', entry => {
        files.push(entry);
      })
      .on('error', err => {
        reject(err);
      })
      .on('warn', err => {
        reject(err);
      })
      .on('end', () => {
        resolve(files);
      });
  });
}

function nconfify(obj, currentKey = '', keyValues = []) {
  for (const entry of Object.entries(obj)) {
    const key = currentKey + entry[0];
    if (typeof entry[1] !== 'object') {
      keyValues.push([key, entry[1]]);
    } else {
      nconfify(entry[1], key + ':', keyValues);
    }
  }
  return keyValues;
}

async function getDownloadHeaders(options) {
  let headers = [];
  if (options.path) {
    const stat = await fs.stat(
      resolve(config.get('server:rootDir'), options.path),
    );
    headers = [
      {
        header: 'Last-Modified',
        value: stat.mtime.toUTCString(),
      },
      {
        header: 'Date',
        value: stat.birthtime.toUTCString(),
      },
      {
        header: 'Content-Length',
        value: stat.size,
      },
      {
        header: 'Content-Type',
        value: mime.contentType(options.path),
      },
      {
        header: 'Content-Disposition',
        value: `attachment; filename="${options.name ||
          options.path.split('/').splice(-1, 1)[0]}"`,
      },
    ];
  }
  return headers;
}

function resolve() {
  return Path.resolve(...arguments);
}

function join() {
  return Path.join(...arguments);
}

function encodePath(path) {
  return path
    .split('/')
    .map(partialPath => encodeURIComponent(partialPath))
    .join('/');
}

function decodePath(path) {
  return path
    .split('/')
    .map(partialPath => decodeURIComponent(partialPath))
    .join('/');
}

module.exports = {
  config: config,
  resolve,
  join,
  encodePath,
  decodePath,
  find,
  getDownloadHeaders,
  nconfify,
};
