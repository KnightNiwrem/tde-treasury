const fs = require('fs');
const repl = require('repl');
const r = repl.start('> ');

r.context._ = require('lodash');
r.context.nodeEnv = process.env.NODE_ENV;

r.context.DatabaseService = require('./services/database');
r.context.databaseService = new r.context.DatabaseService();

const modelsPath = './models';
fs.readdirSync(modelsPath).filter((fileName) => {
  return fileName.endsWith('.js');
}).map((fileName) => {
  const fileRegex = /^(.+?)\.js$/;
  return fileName.match(fileRegex);
}).forEach(([fileName, modelName, ...rest]) => {
  const properModelName = r.context._.capitalize(modelName);
  r.context[properModelName] = require(`${modelsPath}/${modelName}`);
});