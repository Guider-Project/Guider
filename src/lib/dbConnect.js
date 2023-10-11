const { mongoose } = require("mongoose");

import { MONGODB_URI } from "@/config";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports.dbConnect = dbConnect;
