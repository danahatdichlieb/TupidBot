class Channels {
    constructor() {
        this.channels = [];
    }

    async initialize(db) {
        const channelsFromDb = await db.query("SELECT name FROM channels");
        this.channels = channelsFromDb.map(channel => channel.name);
    }

    getAll() {
        return this.channels;
    }

    addChannel(channel) {
        if (!this.channels.includes(channel)) {
            this.channels.push(channel);
        }
    }

    removeChannel(channel) {
        this.channels = this.channels.filter(ch => ch !== channel);
    }
}

export default Channels;
