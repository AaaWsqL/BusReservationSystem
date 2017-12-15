// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ticketSchema = new Schema({
  bus_id: { type: Schema.Types.ObjectId, ref: 'buses'},
  owner_id: { type: Schema.Types.ObjectId, ref: 'users'},
  bus_name:String,
  seat_no:Number,
  source:String,
  destination:String
});

// make this available to our users in our Node applications
module.exports = mongoose.model('tickets', ticketSchema);
