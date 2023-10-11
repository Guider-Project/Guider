const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bus_number: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports.Bus = Bus;
