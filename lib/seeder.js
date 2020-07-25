const mongoose = require('mongoose'),
      Exchange = require('../models/exchange.model'),
      stocksService = require('../services/stocksService'),
      exchangesRepository = require('./exchanges.repository');

class Seeder {

  init () {
    mongoose.connection.db.listCollections({name: 'exchanges'})
      .next((err, coll) => {
        if (!coll) {
          console.log('Seeding exchanges');
          this.seed();
        }
      })
  }

  seed() {
    stocksService.getExchanges().then(response => {
      const exchanges = response.data.map(x => new Exchange(x));

      exchangesRepository.insertExchanges(exchanges, (err) => {
        console.log(err);
      });
    })
  }
}

module.exports = new Seeder();
