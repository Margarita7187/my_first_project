module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './library.db'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  }
};