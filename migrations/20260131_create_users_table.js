const db = require('../config/database');

async function up() {
    const exists = await db.schema.hasTable('users');
    if (!exists) {
        return db.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').unique().notNullable();
            table.timestamps(true, true);
        });
    }
}

async function down() {
    return db.schema.dropTableIfExists('users');
}

module.exports = { up, down };
