const config = require('./services/database/config');
const { database, host, password, port, username } = config.getProperties();

module.exports = {
  development: {
    client: 'postgresql',
    connection: { database, host, password, port, user: username }
  },
  staging: {
    client: 'postgresql',
    connection: { database, host, password, port, user: username },
    pool: { min: 2, max: 10 },
  },
  production: {
    client: 'postgresql',
    connection: { database, host, password, port, user: username },
    pool: { min: 2, max: 10 },
  }
};
