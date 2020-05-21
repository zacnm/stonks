const stocksService = require('../services/stocksService');

class StocksController {

  constructor(router) {
    console.log('stonko');

    router.get('/healthcheck', (req, res) => { 
      res.send('Healthy')
    });

    router.get('/exchanges', this.getExchanges.bind(this));
    router.get('/symbols/:exchange', this.getSymbols.bind(this));
    router.post('/candles', this.getCandles.bind(this));
  }

  getExchanges(req, res) {
    stocksService.getExchanges().then(response => {
      res.json(response.data);
    }, err => {
      console.log(err);
    });
  }

  async getSymbols(req, res) {
    stocksService.getSymbols(req.params.exchange).then(response => {
      res.json(response.data);
    }, err => {
      console.log(err);
    });  
  }

  async getCandles(req, res) {
    stocksService.getCandles(req.body).then(response => {
      res.json(response.data);
    }, err => {
      console.log(err);
    }); 
  }
}

module.exports = StocksController;