// Module dependencies
const mongoose = require("mongoose"),
      config = require("../config/config.json").database,
      connectionString = "mongodb://" + config.host + "/" + config.name;

let connection = null;

class Database {
  open(callback) {
    var options = {
      promiseLibrary: global.Promise,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(connectionString, options, (err) => {
      if (err) {
        console.log("mongoose.connect() failed: " + err);
      }
    });
    connection = mongoose.connection;

    mongoose.connection.on("error", (err) => {
      console.log("Error connecting to mongo: " + err);
      callback(err, false);
    });

    mongoose.connection.once("open", () => {
      console.log("Connected to mongo");
      callback(null, true);
    });
  }

  close() {
    connection.close(() => {
      console.log("Mongo connection closed");
      process.exit(0);
    });
  }
}

module.exports = new Database();
