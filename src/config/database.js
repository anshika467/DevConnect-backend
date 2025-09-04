const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@namastenode.bwcu78w.mongodb.net/devTinder`
  );
};

module.exports = connectDB;