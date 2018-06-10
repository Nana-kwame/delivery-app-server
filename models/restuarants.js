var mongoose = require('mongoose');
var databaseConfig = require('../config/database');

mongoose.connect(databaseConfig.url);

//var mongoSchema = mongoose.Schema;
var restuarantSchema = new mongoose.Schema({

  name: {
    type: String

  },
  location: {
    type: String
  },
  menu: [{
    item: [{
        type: String
    }],
    price: [{
        type: Number
    }]
  }]
});

// var restuarantSchema = {
//   "name": String,
//   "location": String,
//   "menu": [{
//     "item": String,
//     "price": Number
//   }]
// }

module.exports = mongoose.model('Resturant', restuarantSchema);
