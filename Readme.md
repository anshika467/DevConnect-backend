## NODE SEASON 2

**Node - 3**
------------

 - Create a repository
 - Initialize the repository
 - node modules, package.json, package-lock.json
 - Install Express
 - Create a server
 - Listen to port 7777
 - Write request handlers for "/test", "/hello"
 - Install nodemon and update scripts inside package.json
 - What are dependencies   
 - What is the use of "-g" while npm install
 - Difference between caret and tilde ( ^ vs ~ )

` Dependencies ` : Dependencies are external libraries or packages that your project relies on to function properly.

` -g ` : installs the package globally on your system rather than in the current project folder.  <br>
` ^ `  : ^ allows only the **patch** and **minor** updates. <br>
` ~ `  : ~ allows only the **patch** updates.

`package-lock.json` : Defines project metadata, scripts, and lists of dependencies (with version ranges). <br>
`package.json` : Locks down the exact versions of all installed packages (including nested ones).

**Node - 4**
------------

 - initialize git
 - .gitignore
 - Create a remote repo on github
 - Push all code to remote origin
 - Play with Routes and route extensions. /hello & /hello/2
 - Install Postman app and make a workspace/ collection > test API call
 - Write logic to handle GET, POST, Patch, DELETE API Calls and test them on Postman
 - Explore routing and use of ?, +, (), * in the routes
 - Use of Regex in routes /a/ , /.*fly$/
 - Reading the query params in the routes
 - Reading the dynamic routes - req.params

**Ordering of the routes matters a lot.**
  - This will match all the HTTP method API calls to /hello
```
app.use("/hello", (req, res) => {
  res.send("hello hello hello!!!);
});

app.use("/", (req, res) => {
  res.send("Welcome to the Dashboard!!!");
});
```

**REST API CALLS**
  - This will only handle get, post, delete call to the user
```
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
```

**Expressions in the routes**

`* -> matches zero or more characters` <br>
`+ -> one or more characters` <br>
`? -> optional` <br>
`(bc) -> The whole chunk within ()` <br>
`$ -> End of the string` <br>
`/a/ -> Regex expression - If the string contains 'a' anywhere, it will match`

*Paths: "/ab?c" , "/ab+cd" , "/ab\*cd " , "/a(bc)?cd", /a/ , /.\*fly$/*

**Dynamic Routing -> /:userID/:name/:password - req.params**
```
app.get("/user/:userID/:name/:password", (req, res) => {
  // console.log(req.query);
  console.log(req.params);
  
  res.send({ firstName: "Anshika", lastName: "Saxena" });
});
```