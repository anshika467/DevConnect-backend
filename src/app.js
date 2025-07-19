const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  //Logic of DB call and get user Data
  // try {

    throw new Error("Database connection failed");
    res.send("User data Sent");
  // }
  // catch {
  //   res.status(500).send("Some Error occurred while fetching user data");
  // }
});

// order of err, req, res, next is important
app.use("/", (err, req, res, next) => {
  if(err) {
    // Log your error
    res.status(500).send("Something went wrong" );
  }
});

app.listen(7777, () => {
  console.log("Server is successfully running on port 7777");
});
