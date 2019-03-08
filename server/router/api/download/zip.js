const fs = require('fs-extra');
const archiver = require('archiver');
const services = require('../../../services');

function getZipName(path) {
  const lastPart = path.split('/').splice(-1, 1)[0];
  return `${lastPart.split('.')[0]}.zip`;
}

async function zippify(
  ctx,
  entries,
  options = { name: 'selection.zip', asRoot: true },
) {
  const zip = archiver('zip', {
    zlib: { level: 3 },
  });
  ctx.body = zip;
  const date = new Date();
  ctx.set('Date', date.toUTCString());
  ctx.set('Content-Disposition', `attachment; filename="${options.name}"`);
  for (const entry of entries) {
    const path = services.decodePath(entry.path);
    const fullPath = services.resolve(
      services.config.get('server:rootDir'),
      path,
    );
    const stat = await fs.stat(fullPath);
    let name = '';
    if (typeof entry.asRoot === 'undefined') {
      name = options.asRoot ? path.split('/').splice(-1, 1)[0] : path;
    } else {
      name = entry.asRoot ? path.split('/').splice(-1, 1)[0] : path;
    }
    if (stat.isDirectory()) {
      zip.directory(fullPath, name);
    }
    if (stat.isFile()) {
      zip.file(fullPath, { name: name });
    }
  }
  zip.finalize();
}

module.exports = function() {
  return async function zipMiddleware(ctx) {
    await zippify(
      ctx,
      [
        {
          path: ctx.params.path,
        },
      ],
      {
        name: getZipName(services.decodePath(ctx.params.path)),
        asRoot: true,
      },
    );
  };
};
