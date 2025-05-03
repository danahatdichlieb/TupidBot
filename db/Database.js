import { createPool } from 'mariadb';
import db from '../db/db.js';

class Database {
    static pool;

    constructor() {
        if (!Database.pool) {
            Database.pool = createPool({
                user: db.db.user,
                password: db.db.pass,
                database: db.db.name,
                host: db.db.host,
                connectionLimit: 500
            });
        }
    }

    async query(queryParam, params = []) {
        let connection;
        let result;

        try {
            connection = await Database.pool.getConnection();
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

    async addTimer(username, channel, message, fireAt) {
        const result = await this.query(
            `INSERT INTO timers (username, channel, message, fireAt) VALUES (?, ?, ?, ?)`,
            [username, channel, message, fireAt]
        );
        return result.insertId;
    }

    async getActiveTimers() {
        const now = Math.floor(Date.now() / 1000);
        return await this.query(`SELECT * FROM timers WHERE fireAt > ?`, [now]);
    }

    async deleteTimer(id) {
        await this.query(`DELETE FROM timers WHERE id = ?`, [id]);
    }
}

export default Database;
