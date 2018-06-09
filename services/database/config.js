const convict = require('convict');
const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'DEVELOPMENT';

// Define a schema
const config = convict({
  database: {
    doc: 'The database for the TDE Treasury bot',
    default: 'tde',
    env: 'TDE_DB_NAME',
  },
  host: {
    doc: 'The host for postgres database connection',
    default: '127.0.0.1',
    env: 'TDE_DB_HOST',
  },
  password: {
    doc: 'The password for the postgres database connection',
    default: 'tde',
    env: `TDE_DB_PASSWORD_${nodeEnv}`
  },
  port: {
    doc: 'The port for the postgres database connection',
    format: 'port',
    default: 5432,
    env: 'TDE_DB_PORT',
  },
  username: {
    doc: 'The username for the postgres database connection',
    default: 'tde',
    env: `TDE_DB_USERNAME_${nodeEnv}`
  },
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
