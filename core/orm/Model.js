const db = require('../../config/database');

class Model {
    constructor() {
        this.query = db(this.constructor.table);
    }

    static get table() {
        throw new Error('You must define static table name in model');
    }

    // ---------- Query Builder ----------
    static query() {
        return db(this.table);
    }

    static where(column, operator, value = null) {
        if (value === null) {
            value = operator;
            operator = '=';
        }
        const instance = new this();
        instance.query = instance.query.where(column, operator, value);
        return instance;
    }

    limit(n) {
        this.query = this.query.limit(n);
        return this;
    }

    orderBy(column, direction = 'asc') {
        this.query = this.query.orderBy(column, direction);
        return this;
    }

    async get() {
        return await this.query.select('*');
    }

    async first() {
        return await this.query.first();
    }

    // ---------- CRUD ----------
    static async all() {
        return await db(this.table).select('*');
    }

    static async find(id) {
        return await db(this.table).where({ id }).first();
    }

    static async create(data) {
        return await db(this.table).insert(data);
    }

    static async update(id, data) {
        return await db(this.table).where({ id }).update(data);
    }

    static async delete(id) {
        return await db(this.table).where({ id }).del();
    }
}

module.exports = Model;
