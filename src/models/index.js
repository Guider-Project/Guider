const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports.User = User;

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Bus = mongoose.models.Bus || mongoose.model("Bus", busSchema);
module.exports.Bus = Bus;

const butTimeSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const BusTime = mongoose.models.BusTime || mongoose.model("BusTime", butTimeSchema);
module.exports.BusTime = BusTime;
