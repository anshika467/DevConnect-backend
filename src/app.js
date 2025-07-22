const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validate the data
    validateSignUpData(req);

    // Encrypt the password
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    //returns a promise
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Invalid credentials!!!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();

      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid credentials!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionrequest", userAuth, async (req, res) => {
  // Sending a connection request

  const user = req.user;
  console.log("Request sent!!!");

  res.send(user.firstName + " Connection request sent successfully!");
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
