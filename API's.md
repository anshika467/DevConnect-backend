### Get user by Id
  ```
  app.get("/userID", async (req, res) => {
    const Id = req.body._id;

    if (!Id) {
      res.status(400).send("User ID is required");
    } else {
      try {
        const user = await User.findById(Id);
        if (!user) {
          res.status(404).send("User not present with this ID");
        } else {
          res.send(user);
        }
      } catch (err) {
        res.status(500).send("Something went wrong");
      }
    }
  });
  ```

### Get a user by emailID
```
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;

  //findOne method
  try {
    const user = await User.findOne({ emailID: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }

  // find method

  // try {
  //   const users = await User.find({ emailID: userEmail});
  //   if(users.length === 0) {
  //     res.status(404).send("User not found");
  //   }
  //   else {
  //     res.send(users);
  //   }
  // }
  // catch (err) {
  //   res.status(500).send("Something went wrong");
  // }
});
```

### Feed API - GET /feed - get all users from the database
```
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // Empty filter is used to get all users
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Delete the user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body._id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.send("User not found with this ID");
    } else {
      res.send("User deleted successfully!");
    }
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});
```

### Update the user via ID
```
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      res.status(404).send("User not found with this ID");
    } else {
      res.send("Update successful!");
    }
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);
  }
});
```

### Update the user via emailID
```
app.patch("/userEmail", async (req, res) => {
  const userEmail = req.body.emailID;
  const data = req.body;

  try {
    const user = await User.findOneAndUpdate({ emailID: userEmail }, data);
    if (!user) {
      res.status(404).send("User not found with this emailID");
    } else {
      res.send("User updated successfully!");
    }
  } catch (err) {
    res.status(500).send("Error updating user");
  }
});
```