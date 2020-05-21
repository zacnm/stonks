const http = require('axios'),
      config = require('../config/config.json').stocksApi;

class StocksService {

  constructor() {}

  async getExchanges() {
    return await http.get(`${config.finnhubUrl}/stock/exchange?token=${config.finnhubToken}`);
  }

  async getSymbols(exchange) {
    return await http.get(`${config.finnhubUrl}/stock/symbol?exchange=${exchange}&token=${config.finnhubToken}`);
  }

  async getCandles(request) {
    return await http.get(`${config.finnhubUrl}/stock/candle?symbol=${request.symbol}&resolution=${request.resolution}&` +
    `from=${new Date(request.from).getTime() / 1000}&to=${new Date(request.to).getTime() / 1000}&token=${config.finnhubToken}`);
  }
}

module.exports = new StocksService();