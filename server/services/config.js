const path = require('path');
const nconf = require('nconf');

nconf
  .argv()
  .env()
  .file(path.resolve(__dirname, '../../', 'config.json'));

module.exports = nconf;
