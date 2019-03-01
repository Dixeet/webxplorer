const fs = require('fs-extra');
const AdmZip = require('adm-zip');
const services = require('../../../services');

function toBuff(zip) {
  return new Promise((resolve, reject) => {
    zip.toBuffer(
      buff => {
        resolve(buff);
      },
      err => {
        reject(err);
      }
    );
  });
}

function getZipName(path) {
  const lastPart = path.split('/').splice(-1, 1)[0];
  return `${lastPart.split('.')[0]}.zip`;
}

module.exports = function() {
  return async function zipMiddleware(ctx) {
    const path = services.decodePath(ctx.params.path);
    const fullPath = services.resolve(services.config.rootDir, path);
    const stat = await fs.stat(fullPath);
    const zip = new AdmZip();
    let buff = null;
    if (stat.isFile()) {
      zip.addLocalFile(fullPath);
      buff = await toBuff(zip);
    }
    if (stat.isDirectory()) {
      zip.addLocalFolder(fullPath);
      buff = await toBuff(zip);
    }
    const date = new Date();
    ctx.set('Date', date.toUTCString());
    ctx.set('Content-Length', buff.length);
    ctx.set(
      'Content-Disposition',
      `attachment; filename="${getZipName(path)}"`
    );
    ctx.body = buff;
  };
};
