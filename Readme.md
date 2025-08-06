# DEVCONNECT PROJECT

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
      res.status(500).send("Some Error occurred while  fetching user data");
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

**Node - 6**
------------

 - Create a free cluster on MongoDB official website (Mongo Atlas)
 - Install Mongoose library - `npm i mongoose`
 - Connect your application to the Database "Connection-url"/devTinder - `/config/database.js`
 - Call the connectDB function and connect the database before starting app on 7777
 - Create a userSchema & user Model
 - Create POST /signup API to add data to database
 - Push some documents using API calls from postman - Error handling using try, catch

### Install Mongoose and set up Connection
  - Set up the cluster in Compass - `NamasteDev` and copy the `connection-string`.
  - Add the name of the database at the end of the Connection-string - `devTinder`.

  ```
  const mongoose = require("mongoose");

  const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://namastenodejs:dSTSsfetqZP0xg4a@namastenode.bwcu78w.mongodb.net/devTinder"
    );
  };

  module.exports = connectDB;
  ```

### Establish Connection with the application
  - Always connect the DB in the `app.js` using try and catch.
  - IMPORTANT => Always `connect the DB first then listen to the requests.`

  ```
  const connectDB = require("./config/database");

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
  ```

### User Model - userSchema, exporting user model
  - `Schema` : Outlines the structure of the DB Document. i.e. the fields / properties
  - `Model`  : interface for interacting with the DB collection based on the defined schema (`"User" model for UserSchema`)

  ```
  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
  });

  module.exports = mongoose.model("User", userSchema);
  ```

### Adding a new user using POST API
  - Using the `User` model a new user instance is created as the document to be added in the collection.
  - `user.save()` saves the data in the collection.
  - ***Error Handling*** : Enclose the `user.save()` within the try-catch block.
  ```
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
  ```

**Node - 7**
------------

 - JS Object vs JSON (difference) - Noticeable => JSON has keys as strings while JS Obj. don't.
 - Add the express.json middleware to your app
 - Make your signup API dynamic to receive data from the end user
 - User.findOne with duplicate emailIds, which object is returned??? Oldest / random ?
 - API - get user by email
 - API - Feed API - GET /feed  - get all the users from the database
 - API - Get user by Id
 - Create the delete user API
 - Difference between Patch and Put
 - API - Update a user
 - Explore the Mongoose Documentation for Model methods
 - What are options in a Model. findOneAndUpdate method, explore more about it
 - API - Update the user with emailID

### GET a User by ID / Email
  - `find` function is used to filter the data based on the selected fields. - `find({ emailID: userEmail })`
  - Multiple functions: `find` , `findOne` , `findById`.
  - `findByID` function can be used by shorthand - `findbyId(userID)`.
  - In case of **duplicate EmailId**, the first one is returned.
  - `find()` returns any arbitrary document.
  ```
  app.get("/userID", async (req, res) => {
    const Id = req.body._id;

    if(!Id) {
      res.status(400).send("User ID is required");
    }
    else {
      try {
        const user = await User.findById(Id);
        if(!user) {
          res.status(404).send("User not present with this ID");
        }
        else {
          res.send(user);
        }
      }
      catch (err) {
        res.status(500).send("Something went wrong");
      }
    }
  })
  ```

### GET All Users
  - In `find`, we just need to pass empty filter. - `find({})`
  ```
  const users = await User.find({});
  ```

### DELETE a User
  - Function used: `findByIdAndDelete` & `findOneAndDelete` and so on.
  ```
  const user = await User.findbyIdAndDelete(userId);
  ```

### UPDATE a User by ID / Email
  - `app.patch` or `app.put` can be used.
  - **By ID**:
    ```
    const userId = req.body.userId;
    const data = req.body;

    const user = await User.findByIdAndUpdate(userId, data);
    ```
  - **By Email**:
    ```
    const user = await User.findOneAndUpdate({emailId: userEmail}, data);
    ```


**Node - 8**
------------

 - Explore schemaType options fromt the documentation
 - add required, unique, lowercase, min, minLength, trim
 - Add default
 - Create a custom validate function for gender, email
 - Improve the DB Schema - PUT all the appropriate validations on each field in Schema
 - Add timestamps to the userSchema
 - Add API level validations on Patch request & signup post api
 - Data Sanitization - Add API validation for each field
 - Install Validator
 - Explore Validator library functions and use Validator functions for password, email
 - NEVER TRUST req.body

-- Different validations in user.js
   Validations in patch - runValidators = U want the `validations` to occur at the time of updation as well not just at creation...
-- In patch, ALLOWED_UPDATES - only certain fields can be changed

### DATA VALIDATION / DATA SANITIZATION
  - In documentation, many `API level` and `Database level` restrictions.

  - **Database Level - Within Schema (SchemaType)**
    ```
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
      trim: true,
    },
    ```
  - **Using Validator function - Within Schema**
    ```
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("EmailId is not valid" + value);
      }
    },
    ```
  - **Validation for specific Value Updates**
    ```
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    ```
  - **runValidators - Update api**
    - In updation, for running the DB level validation not just at creation but also at Updation => `runValidators` is used.
    ```
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    ```

### Timestamps
  - For calculating the `created at` and `updated at` time, Mongo provides the functionality within the Schema only.
  ```
  const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  ```


**Node - 9**
------------

 - Validate data in Signup API
 - Install bcrypt package
 - Create a passwordHash using bcrypt.hash & Save the user with encrypted password
 - Create Login API - compare passwords and throw errors if email and password is invalid

### ENCRYPTION - Signup API
  - `bcrypt package` is installed and the password is encrypted using the `bcrypt.hash(password, 10)` function.
  - `salt` is created and gets more tough with each round (`10`).

  - **SANITIZATION of the SIGNUP data**
    - *Function : validateSignUpData*  
    ```
    const validator = require("validator");

    const validateSignUpData = (req) => {
      const { firstName, lastName, emailID, password } = req.body;

      if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
      } else if (!validator.isEmail(emailID)) {
        throw new Error("Email is not valid!");
      } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a Strong Password!");
      }
    };

    module.exports = {
      validateSignUpData,
    };
    ```
  
  - **ENCRYPTION - PASSWORD HASHING**
    ```
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
    }
    ```

### LOGIN API
  - `EmailID` and `password` is used. 
  - For password comparison, `bcrypt.compare` is used.

  ```
  app.post("/login", async (req, res) => {
    try {
      const { emailID, password } = req.body;

      const user = await User.findOne({ emailID: emailID });
      if (!user) {
        throw new Error("Invalid credentials!!!");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.send("Login Successful!!");
      } else {
        throw new Error("Invalid credentials!!!");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });
  ```

**Node - 10**
-------------

 - Install cookie-parser
 - just send a dummy cookie to user
 - Create a GET /profile API and check if you get the cookie back
 - Install jsonwebtoken as jwt
 - In login API, after email and password validation, create a JWT token and send it to user in cookie.
 - Read the cookies inside your profile API and find the logged in user.

 - Log the userAuth Middleware
 - Add the userAuth middleware in profile API and a new sendConnectionRequest API
 - Set the expiry of the JWT token and cookies to 7 days
 - Create userSchema Method to getJWT()
 - Create userSchema Method to comparePassword(PasswordInputByUser)


### Authentication

### Install Cookie-Parser and SEND A COOKIE to user
  - `res.cookie` is used to send the token packed inside a cookie to the user.

  ```
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());

  // Add the token to cookie and send response back to the user
  res.cookie("token", "hsjubdjdneibdiw");
  ```

### LOGIN API - Install jsonwebsocket and privatise the ID
  - `Token` : The encoded message for the `userID` and its `secret key` created by JWT.
  - Install: `const jwt = require("jsonwebtoken");`
  - API used: `api.post("/login")`

  - After login, `token` is created.


  ```
  if (isPasswordValid) {

    // Create a JWT token
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$467");

    // Add the token to cookie and send response back to the user
    res.cookie("token", token);

    res.send("Login Successful!!");
  }
  ```

### PROFILE API - USING TOKEN VALIDATION
  - `token` is extracted from the `cookies`.
  - If token is invalid => User will login again.
  - `jwt.verify` : Compares the token and the secret key to uncover the `userID`
  - Extract the user from the userID.

  - **Since the token is checked, the profile will only open for the logged-in user.**

  ```
  app.get("/profile", async (req, res) => {
    try {
      const cookies = req.cookies;

      const { token } = cookies;
      if (!token) {
        throw new Error("Invalid Token!");
      }

      // Validate my token
      const decodedMessage = await jwt.verify(token, "DEV@Tinder$467");

      const { _id } = decodedMessage;

      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User does not exist!");
      }

      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });
  ```

### AUTHENTICATION USING MIDDLEWARE
  - **userAuth middleware**
    - In order to seperate the `token validation` of user and using decodedMessage extract the `user`.
    ```
    const jwt = require("jsonwebtoken");
    const User = require("../models/user");

    const userAuth = async (req, res, next) => {
      try {
        const { token } = req.cookies;
        if(!token) {
          throw new Error("Token is not valid!!!!!!");
        }

        const decodedObj = await jwt.verify(token, "DEV@Tinder$467");

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
          throw new Error("User does not exist!");
        }

        req.user = user;
        next();
      } catch (err) {
        res.status(400).send("ERROR : " + err.message);
      }
    };
    ```
  - **PROFILE API**
    - Using the `userAuth` now the user is directly extracted and validated.
    - In the similar way, the `sendConnectionRequest` API is created.

    ```
    app.get("/profile", userAuth, async (req, res) => {
      try {
        const user = req.user;

        res.send(user);
      } catch (err) {
        res.status(400).send("ERROR : " + err.message);
      }
    });
    ```

### Expiry date on token and cookie
  - **Token :**
  ```
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$467", {
    expiresIn: "7d",
  });
  ```
  - **Cookie :**
  ```
  res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
  ```

### USERSCHEMA METHODS
  - **getJWT() method :**
    - Since token generation is `closely related to the user` so we can create the token in the userSchema.
    - We don't use `arrow functions`, instead of `normal functions`.

    ```
    userSchema.methods.getJWT = async function() {
      const user = this;

      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$467", {
        expiresIn: "7d",
      });

      return token;
    };

    // Used as:
    const token = await user.getJWT();
    ```
  - **validatePassword() method :**
    - This takes the input by the user and validates the password by `bcrypt`.
    ```
    userSchema.methods.validatePassword = async function (passwordInputByUser) {
      const user = this;

      const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        user.password
      );

      return isPasswordValid;
    };

    //Used as:
    const isPasswordValid = await user.validatePassword(password);
    ```

**Node - 11**
-------------

 - Explore Tinder APIs
 - Create a list of all API you can think of in Tinder
 - Group mulitple routes under respective routers
 - Read documentation for express.Router 
 - Create router folder for managing auth, profile, request routers
 - Create authRouter, profileRouter, requestRouter
 - Import these routers in app.js
 - Create POST / logout api
 - Create PATCH /profile/edit API
 - Create PATCH / profile/password - FORGOT PASSWORD API
 - Make sure you validate all data in every POST PATCH APIs

### Routing
  - As the appliation grows, maintaining all the routes in a single file will become unmanageable.
  - `express.Router()` provides a way to organize related routes together.

  ```
  const express = require("express");
  const profileRouter = express.Router();

  profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try {

    }
    catch (err) {
      res.status(400).send("Profile Fetched successfully!!!");
    }
  });
  ```

### Logout API
  - You just need to make the current token `null` and expire it `right now`

  ```
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  ```


**Node - 12**
-------------

 - Create ConnectionRequestSchema
 - Send Connection request API
 - Proper Validation of data
 - Think about ALL corner cases
 - $or and $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
 - schema.pre("save") function

 - enum validation
 - Request APIs...
 - Read more about indexes...
 - Why do we need an index. 
 - What are the advantages and disadvantages(if we create a lot of indexes)
 - unique: true on email ID => Automatic index
 - Read the article on Compound Index - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/

### enum 
  - restrict the value to be one of the given list
  ```
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: `{VALUE} is incorrect status type`,
    },
  },
  ```

### pre - schema.pre("save") function
  - This middleware is that runs just before the given method - `save` everytime.
  - `this` keyword: refers to the current instance of the schema.

  ```
  connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error("You cannot send a connection request to yourself");
    }

    next();
  });
  ```

### Indexes
  - It helps to order the fields in a specific way.
  - The values can be: `1` : asc. -- `-1` : desc. -- `2d`, `2dsphere` ...

  - **Why** : With large datasets, find operations can be expensive. Sorted data's retireval is much faster.
  - **Disadv.** : If we create more indexes unnecessarily then it will cause an overhead to sort it in a specific way.
  - **Compound Index** : Combination of fields as an index to sort them efficiently. 

  ```
  schema.index({ field1: 1, field2: 1});
  ```

### Query Operations
  - There are multiple operators for logical query operations: 
  
  - **Comparison Query Operators**: `$eq`, `$gt`, `$lt`, `$gte`, `$lte`, `$in`, `$nin`, `$ne`
  - **Logical Query**: `$and`, `$or`, `$not`, `$nor`

  - `$in` : Documents present inside an array

  ```
  $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
  ```


**Node - 13**
-------------

 - Write code with proper validations for POST /request/review/:status/:requestId
 - Thought Process - POST vs GET
 - Read about ref and populate
 - Create GET /user/requests/recieved with all the checks
 - Create GET /user/connections

### ref - reference
  - It is used to establish a connection between two tables - `collections`
  - **Enables to access the fields and data of another table for a certain field of this table**

  ```
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User collection
    required: true,
  },
  ```

### populate - Accessing details using ref
  - It replaces the `id` with the details of the referenced tables.
  - No manual lookups
  ```
  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: loggedInUser._id,
    status: "interested",
  }).populate("fromUserId", "firstName lastName");
  ```

**Node - 14**
-------------

 - Logic for GET /feed API
 - Explore the $nin, $and, $ne and other query operators
 - pagination
 
/feed?page=1&limit=10 => 1-10  => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

### Set
  - It allows to remove duplicacy from the list of elements.
  ```
  const hideUsersFromFeed = new Set();

  connectionRequests.forEach((req) => {
    hideUsersFromFeed.add(req.fromUserId.toString());
    hideUsersFromFeed.add(req.toUserId.toString());
  });
  ```

### Pagination
  - `skip` : To skip certain docs from the starting of the database.
  - `limit` : To retrict the max. number of elements fetched at a time.
  - `select` : It is used to choose certain fields from the group of fields.

  ```
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  
  const users = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUsersFromFeed) } },
      { _id: { $ne: loggedInUser._id } },
    ],
  })
    .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit);

  res.json({ data: users });
  ```
