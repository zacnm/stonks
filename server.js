const express = require('express'),
      bodyParser = require('body-parser'),
      errorHandler = require('errorhandler'),

      app = express(),
      router = require('./routes/router'),
      port = 3000;

class Server {

  constructor() {
    this.initMiddleWare();
    this.initRoutes();
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
  }

  initRoutes() {
    router.load(app, './controllers');

    app.get('/healthcheck', function (req, res) {
      res.send('Healthy')
    });
  }
}

const server = new Server();