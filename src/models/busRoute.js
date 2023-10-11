const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

module.exports.BusRoute = BusRoute;
