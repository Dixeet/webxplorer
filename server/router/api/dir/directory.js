const fs = require('fs-extra');
const services = require('../../../services');

async function getFiles(path) {
  const dirFiles = await fs.readdir(
    services.resolve(services.config.get('server:rootDir'), path),
    { withFileTypes: true }
  );
  const files = [];
  for (const file of dirFiles) {
    if (file.name[0] !== '.') {
      const filePath = services.join(path, file.name);
      const fullPath = services.join(
        services.config.get('server:rootDir'),
        filePath
      );
      const { mtimeMs, size, mtime } = await fs.stat(fullPath);
      files.push({
        name: file.name,
        mtimeMs,
        size,
        mtime,
        fullPath,
        path: filePath,
        encodedPath: services.encodePath(filePath),
        isDirectory: file.isDirectory()
      });
    }
  }
  return files;
}

module.exports = function() {
  return async function dirMiddleware(ctx) {
    ctx.params.path = ctx.params.path || '';
    ctx.body = await getFiles(services.decodePath(ctx.params.path));
  };
};
