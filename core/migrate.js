const fs = require('fs');
const path = require('path');
const db = require('../config/database');

async function runMigrations() {
    // 1️⃣ ایجاد جدول migrations اگر وجود ندارد
    const hasMigrations = await db.schema.hasTable('migrations');
    if (!hasMigrations) {
        await db.schema.createTable('migrations', table => {
            table.increments('id').primary();
            table.string('name').notNullable().unique();
            table.timestamp('run_at').defaultTo(db.fn.now());
        });
    }

    // 2️⃣ گرفتن همه فایل‌های migration
    const migrationsDir = path.join(__dirname, '../migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    // 3️⃣ اجرا فقط migration های جدید
    for (const file of files) {
        const alreadyRun = await db('migrations').where({ name: file }).first();
        if (alreadyRun) continue;

        const migration = require(path.join(migrationsDir, file));
        console.log(`Running migration: ${file}`);
        if (migration.up) await migration.up();

        // ثبت migration اجرا شده
        await db('migrations').insert({ name: file });
    }

    console.log('All migrations completed.');
    process.exit(0);

}

runMigrations();
