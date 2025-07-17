const express = require('express');

const app = express();

// * -> matches zero or more characters
// + -> one or more characters
// ? -> optional
// /a/ -> Regex expression - If the string contains 'a' anywhere, it will match
// /a(bc)?cd/ -> Matches 'acd' or 'abcd' (bc is optional)
/* $ -> End of the string
  /.*fly$/ -> Matches any string that ends with 'fly' (e.g., 'butterfly', 'dragonfly')
*/

// Dynamic Routing -> /:userID/:name/:password - req.params
app.get("/user/:userID/:name/:password", (req, res) => {
  // console.log(req.query);
  console.log(req.params);

  res.send({ firstName: "Anshika", lastName: "Saxena" });
});

//This will only handle get call to the user
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

