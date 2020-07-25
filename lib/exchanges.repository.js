const Exchange = require('../models/exchange.model');

class ExchangesRepository {

  getExchanges(callback) {
    Exchange.find({}, (err, exchanges) => {
      if (err) {
        console.log(`*** ExchangesRepository.getExchanges error: ${err}`); 
        return callback(err);
      }

      callback(null, exchanges);
    });
  }

  insertExchanges(exchanges, callback) {
    Exchange.insertMany(exchanges, (err) => {
      if (err){
        console.log(`*** ExchangesRepository.insertExchanges error: ${err}`); 
        return callback(err);
      }
    }, {  })
  }
}

module.exports = new ExchangesRepository();