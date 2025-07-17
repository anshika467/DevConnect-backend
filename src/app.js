const express = require('express');

const app = express();

// This will only handle get call to the user
app.get("/user", (req, res) => {
  res.send({ firstName: "Anshika", lastName: "Saxena" });
});

app.post("/user", (req, res) => {
  // saving to the DB
  res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully!");
});

// This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(7777, () => {
  console.log('Server is successfully running on port 7777');
});

