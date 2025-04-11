import { createPool } from 'mariadb';
import db from './db.js';

export class Database {
    constructor() {
        this.pool = createPool({
            user: db.db.user,
            password: db.db.pass,
            database: db.db.name,
            host: db.db.host,
            connectionLimit: 500
        });
    }

    async query(queryParam, params = []) {
        let connection;
        let result;

        try {
            connection = await this.pool.getConnection();
            result = await connection.query(queryParam, params);
        } catch (e) {
            console.error('[Database Error]', e);

        } finally {
            connection?.release();
        }

        return result || [];
    }

    async queryOne(queryStr, params = [], addLimit = true) {
        const result = await this.query(`${queryStr}${addLimit ? ' LIMIT 1' : ''}`, params);
        return result?.[0] || false;
    }

    async entryExists(queryStr, params = [], addLimit = true) {
        const rows = await this.query(`${queryStr}${addLimit ? ' LIMIT 1' : ''}`, params);
        return rows.length > 0;
    }
}