// config/database.js
const knex = require('knex');

const db = knex({
    client: 'mysql2', // یا pg / sqlite3
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node'
    },
    pool: { min: 0, max: 10 }
});

module.exports = db;
