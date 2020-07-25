const express = require('express'),
      bodyParser = require('body-parser'),
      errorHandler = require('errorhandler'),

      app = express(),
      router = require('./routes/router'),
      database = require('./lib/database'),
      seeder = require('./lib/seeder'),
      port = 3000;

class Server {

  constructor() {
    this.initMiddleWare();
    this.initRoutes();
    this.initDatabase();
    this.start();
  }

  start() {
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`)
    });
  }

  initMiddleWare() {
    app.use(bodyParser.json());
    app.use(errorHandler());

    if (process.platform === "win32") {
      require("readline").createInterface({
          input: process.stdin,
          output: process.stdout
      }).on("SIGINT", () => {
          console.log('Closing MongoDB connection');
          // database.close();
      });
    }

    process.on('SIGINT', () => {
        console.log('Closing MongoDB connection');
        // database.close();
    });
  }

  initDatabase() {
      database.open(() => {
          seeder.init();
      });
  }

  initRoutes() {
    router.load(app, './controllers');

    app.get('/healthcheck', function (req, res) {
      res.send('Healthy')
    });
  }
}

const server = new Server();