import fs from 'fs';
import path from 'path';

const config = JSON.parse(fs.readFileSync(path.resolve('config.json'), 'utf-8'));

class Permissions {
    constructor() {
        this.permissionMap = new Map();

        this.everyone = 0;
        this.vip = 1;
        this.mod = 2;
        this.broadcaster = 3;
        this.admin = 4;
        this.superadmin = 5;
        this.owner = 6;

        this.list = {
            everyone: this.everyone,
            vip: this.vip,
            mod: this.mod,
            broadcaster: this.broadcaster,
            admin: this.admin,
            superadmin: this.superadmin,
            owner: this.owner
        };
    }

    async initialize(db) {
        const permissions = await db.query(`SELECT * FROM permissions`);
        for (const { userId, permission } of permissions) {
            this.permissionMap.set(userId, permission);
        }
    }

    async set(userId, permission) {
        this.permissionMap.set(userId, permission);
        await bot.db.query('INSERT INTO permissions (userId, permission) VALUES (?, ?) ON DUPLICATE KEY UPDATE permission = VALUES(permission)', [userId, permission]);
    }

    get(userId, badges = []) {
        const savedPermission = this.permissionMap.get(userId) || this.everyone;
        const userPermissions = [savedPermission];

        for (const badge of badges || []) {
            if (badge.name === 'vip') userPermissions.push(this.vip);
            if (badge.name === 'moderator') userPermissions.push(this.mod);
            if (badge.name === 'broadcaster') userPermissions.push(this.broadcaster);
        }

        if (userId === config.owner) userPermissions.push(this.owner);

        return Math.max(...userPermissions);
    }
}

export default Permissions;
