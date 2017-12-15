// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var busSchema = new Schema({
  bus_name:String,
  agency:String,
  tot_seats:Number,
  seats_available:Number,
  source:String,
  destination:String,
  stops:[String],
});

// make this available to our users in our Node applications
module.exports=mongoose.model('buses', busSchema);