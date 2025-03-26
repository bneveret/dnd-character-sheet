const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

let mongoServer;
let connection;
let db;

const initDb = async (callback) => {
  if (db) return callback(null, db);

  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    connection = new MongoClient(uri);
    await connection.connect();
    db = connection.db();

    console.log("Connected to in-memory MongoDB");
    callback(null, db);
  } catch (error) {
    callback(error);
  }
};

const getDb = () => {
  if (!db) throw new Error("Db not initialized");
  return db;
};

const closeDb = async () => {
  if (connection) await connection.close();
  if (mongoServer) await mongoServer.stop();
  db = null;
};

module.exports = { initDb, getDb, closeDb };