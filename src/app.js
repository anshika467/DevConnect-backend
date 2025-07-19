const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User({
    firstName: "Virat",
    lastName: "Kolhi",
    emailID: "virat@gmail.com",
    password: "virat123",
  });

  //returns a promise
  try {
    await user.save();
    res.send("User added successfully!");
  }
  catch (err) {
    res.status(400).send("Error adding user: " + err.message);
  }
});


connectDB()
  .then(() => {
    console.log("Database connection established!!!");
    app.listen(7777, () => {
      console.log("Server is successfully running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });