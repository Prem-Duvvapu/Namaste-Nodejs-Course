const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// middleware to parse JSON request body
app.use(express.json());

// POST /signup - create user
app.post("/signup", async (req, res) => {
    const userObj = req.body;

    try {
        // Creating a new instance of the User model
        const user = new User(userObj);
        await user.save();
    } catch (err) {
        res.status(400).send("Error saving the user: "+err.message);
    }
    

    res.send("User added successfully!");
});

// GET /user - get user by emailId
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.findOne({emailId : userEmail});

        if (users.length === 0)
            res.status(404).send("User not found");
        else
            res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// GET - /allUsers - get all users
app.get("/allUsers", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// DELETE - /user - delete user by id
app.delete("/user", async (req, res) => {
    console.log(req.body);
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        console.log(user);
        if (user)
            res.send("Deleted: "+user);
        else
            res.send("No user found with that ID");
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["userId","photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed!");
        }

        if (data?.skills.length > 10) {
            throw new Error("Skills can't be more than 10.");
        }

        const updatedUser =  await User.findByIdAndUpdate(userId, data, { new: true });
        res.json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (err) {
        res.status(400).send("Update failed: "+ err.message);
    }
});

connectDB()
.then(() => {
    console.log("Database connection established...");

    app.listen(7777, () => {
        console.log("Server is listening on port 7777...");
    });
})
.catch((err) => {
    console.error("Database connection failed!!!");
});