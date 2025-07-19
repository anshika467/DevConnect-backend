const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastenodejs:dSTSsfetqZP0xg4a@namastenode.bwcu78w.mongodb.net/devTinder"
  );
};

module.exports = connectDB;