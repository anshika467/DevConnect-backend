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

` -g ` : installs the package globally on your system rather than in the current project folder.
` ^ `  : ^ allows only the **patch** and **minor** updates.
` ~ `  : ~ allows only the **patch** updates.

`package-lock.json` : Defines project metadata, scripts, and lists of dependencies (with version ranges).

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

* Ordering of the routes matter a lot.
```
app.use("/hello", (req, res) => {
  res.send("hello hello hello!!!);
});

app.use("/", (req, res) => {
  res.send("Welcome to the Dashboard!!!");
});
```

