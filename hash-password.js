#!/usr/bin/env node
/* eslint-disable no-console */
const program = require('commander');
const bcrypt = require('bcrypt');
const config = require('./server/services/config');

const saltRounds = 10;

function exit() {
  process.exit(1);
}

program
  .command('generate <password>')
  .description('| Generate the hash of a given password')
  .option('-s, --save', 'Save password to config.json')
  .action((password, cmd) => {
    console.log('generating hash...');
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error(`Error : ${err}`);
        exit();
      }
      console.log(`Hash : ${hash}`);
      if (cmd.save) {
        console.log('Saving newly generate hash to config.json');
        config.set('server:auth:password', hash);
        config.save(err => {
          if (err) {
            console.error('Error saving to config.json', err);
            exit();
          }
        });
      }
    });
  });

program
  .command('compare <password>')
  .description('| Compare a password with the hash in config.json file')
  .action(password => {
    bcrypt.compare(password, config.get('server:auth:password'), (err, res) => {
      if (err) {
        console.error(`Error : ${err}`);
        exit();
      }
      console.log(res ? 'Password matches' : 'Password doesnt match');
    });
  });

program.parse(process.argv);
