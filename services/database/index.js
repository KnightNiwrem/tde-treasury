const { Model } = require('objection');
const Knex = require('knex');
const config = require('./config');

const { database, host, password, port, username } = config.getProperties();

class DatabaseService {
  constructor({ 
    database = DatabaseService.defaultDatabase,
    host = DatabaseService.defaultHost,
    password = DatabaseService.defaultPassword,
    port = DatabaseService.defaultPort,
    username = DatabaseService.defaultUsername
  } = {}) {
    this.model = Model;
    this.connect();
  }

  connect({ 
    database = DatabaseService.defaultDatabase,
    host = DatabaseService.defaultHost,
    password = DatabaseService.defaultPassword,
    port = DatabaseService.defaultPort,
    username = DatabaseService.defaultUsername
  } = {}) {
    this.knex = Knex({
      client: 'pg',
      connection: { database, host, password, port, user: username }
    });
    this.model.knex(this.knex);
  }
}

DatabaseService.defaultDatabase = database;
DatabaseService.defaultHost = host;
DatabaseService.defaultPassword = password;
DatabaseService.defaultPort = port;
DatabaseService.defaultUsername = username;

module.exports = DatabaseService;