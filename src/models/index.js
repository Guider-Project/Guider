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
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

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
  seats: {
    type: Number,
    default: 0,
  },
  maxSeats: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const reservationSchema = new mongoose.Schema({
  busTime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusTime",
  },
  seats: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  remarks: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports.User = User;

const Bus = mongoose.models.Bus || mongoose.model("Bus", busSchema);
module.exports.Bus = Bus;

const BusTime = mongoose.models.BusTime || mongoose.model("BusTime", butTimeSchema);
module.exports.BusTime = BusTime;

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
module.exports.Reservation = Reservation;
