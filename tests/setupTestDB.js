const { initDb, closeDb } = require("../config/database");

beforeAll((done) => {
    initDb(done);
});


afterAll(async () => {
    const db = require("../config/database").getDb();
    const collections = await db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
    await closeDb();
});