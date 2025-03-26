const { initDb, closeDb } = require("../config/database");

beforeAll((done) => {
    initDb(done);
});

afterEach(async () => {
    const db = require("../config/database").getDb();
    const collections = await db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await closeDb();
});