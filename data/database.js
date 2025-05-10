require("dotenv").config();

const mongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log("database already exists");
        return callback(null, database);
    }
    mongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((error) => {
            callback(error);
        });
}

const getDatabase = () => {
    if (!database) {
        throw Error("database not initialized");
    }
    return database;
}

module.exports = { initDb, getDatabase };