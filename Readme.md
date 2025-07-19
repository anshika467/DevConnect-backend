# NODE SEASON 2

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

`package-lock.json` : Locks down the exact versions of all installed packages (including nested ones). <br>
`package.json` : Defines project metadata, scripts, and lists of dependencies (with version ranges).

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

### Creating a server - Listening to Port 7777
```
const express = require('express');
const app = express();

app.listen(7777, () => {
  console.log('Server is successfully running on port 7777');
});

```

### Ordering of the routes matters a lot.
  - This will match all the HTTP method API calls to /hello
```
app.use("/hello", (req, res) => {
  res.send("hello hello hello!!!);
});

app.use("/", (req, res) => {
  res.send("Welcome to the Dashboard!!!");
});
```

### REST API CALLS
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

### Expressions in the routes

`* -> matches zero or more characters` <br>
`+ -> one or more characters` <br>
`? -> optional` <br>
`(bc) -> The whole chunk within ()` <br>
`$ -> End of the string` <br>
`/a/ -> Regex expression - If the string contains 'a' anywhere, it will match`

*Paths: "/ab?c" , "/ab+cd" , "/ab\*cd " , "/a(bc)?cd", /a/ , /.\*fly$/*

### Dynamic Routing
 - URL to Console => Path: `http://localhost:7777/user?userID=777` <br>
   Method to use = `req.query`
   ```
   app.get("/user", (req, res) => {});
   ```
   
 - The path is: `/:userID/:....` and so on - using `req.params`
   ```
   app.get("/user/:userID/:name/:password", (req, res) => {
     // console.log(req.query);
     console.log(req.params);
     
     res.send({ firstName: "Anshika", lastName: "Saxena" });
   });
   ```

**Node - 5**
------------

 - Handling multiple route handlers
 - next()
 - next function and errors along with res.send()
 - app.use("/route", rH, [rH2, rH3], rH4, rH5);
 - What is a middleware? Why do we need it?
 - How express JS basically handles quests behind the scenes.
 - GET /users => middleware cahin => request handlers
 - Difference between app.use and app.all.
 - Write a dummy auth middleware for admin
 - Write a dummy auth middleware for all user routes, except /user/login
 - Error Handling using app.use("/", (err, req, res, next) => {});


### Multiple Route Handlers - MIDDLEWARE

  - ***Middleware*** are functions that have access to the *request object* (`req`), *response object* (`res`) and the next middleware function in the app's request-response cycle. (`next`)
  - If the middleware does not end the req.-res. cycle, it must call the ` next() ` to pass control to the next middleware function.

```
app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user");
    res.send("Response!!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    // res.send("2nd Response!!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3");
    // res.send("3rd Response!!!");
    // next();
  },
);
```

The same way - seperate route handlers:

```
app.use("/user", (req, res, next) => {
    console.log("Handling the route user");
    res.send("Response!!!");
    next();
});

app.use("/user", (req, res, next) => {
    console.log("Handling the route user 2");
    res.send("2nd Route Handler!!!");
});
```

### Authentication - MIDDLEWARE
  - Before getting to the path of "/admin/getAlldata", it goes through the "/admin" middleware.
  - Creating a seperate file for authentication reduces redundancy.
  - Using Middleware, We don't need to write the logic for auth. again and again for each handler.
```
// in middlewares/auth.js
const adminAuth = (req, res, next) => {
  console.log("Admin Auth is getting checked!!");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

// in app.js
app.use("/admin", adminAuth);
app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});
```

### Wildcard Error Handling
  - Two ways of Error handling: ***Try-catch*** (Recommended) & ***app.use("/")***
  - **The order of the params: `(err, req, res, next)` is very important.**

  1. **Try-catch method**:
  ```
  app.get("/getUserData", (req, res) => {
    //Logic of DB call and get user Data
    try {
      throw new Error("Database connection failed");
      res.send("User data Sent");
    }
    catch {
      res.status(500).send("Some Error occurred while fetching user data");
    }
  });
  ```

  2. **Wildcard - app.use("/)**
     - This method is used for the corner case if occured and can be resolved gracefully.
  ```
  app.use("/", (err, req, res, next) => {
    if(err) {
      // Log your error
      res.status(500).send("Something went wrong" );
    }
  });
  ```