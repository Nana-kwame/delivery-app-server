var mongoose = require('mongoose');
var databaseConfig = require('../config/database');

mongoose.connect(databaseConfig.url);

var mongoSchema = mongoose.Schema;

var orderSchema = {
  "userName": String,
  "phoneNumber": String,
  "restuarant": String,
  "order": String,
  "latitude": Number,
  "longitude": Number,
  "status": {
    type: String,
    enum:['processing','en route','completed'],
    default:'processing'
  }
}

module.exports = mongoose.model('orders', orderSchema);
