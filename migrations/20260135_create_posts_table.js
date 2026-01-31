const db = require('../config/database');

async function up() {
    const exists = await db.schema.hasTable('posts');
    if (!exists) {
        return db.schema.createTable('posts', table => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description').unique().notNullable();
            table.timestamps(true, true);
        });
    }
}

async function down() {
    return db.schema.dropTableIfExists('posts');
}

module.exports = { up, down };
