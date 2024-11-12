const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;
const mongoUrl = `mongodb+srv://mathiasqm:${process.env.MONGODB_PASSWRD}@demo.rnx8c.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=demo`;

let _db;

const initDb = (callback) => {
  console.log("Initializing");
  if (_db) {
    console.log("Database already initialized");
    return callback(null, _db);
  }

  MongoClient.connect(mongoUrl)
    .then((client) => {
      _db = client;
      callback(null, _db);
      console.log("CONNECTED");
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not Initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
