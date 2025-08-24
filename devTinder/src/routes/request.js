const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

// GET /user - get user by emailId
requestRouter.get("/user", async (req, res) => {
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
requestRouter.get("/allUsers", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// DELETE - /user - delete user by id
requestRouter.delete("/user", async (req, res) => {
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
requestRouter.patch("/user/:userId", async (req, res) => {
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

// Send connection request
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;

    console.log(user.firstName + " sending a connection request");

    res.send(user.firstName + " sent the connection request");
});


module.exports = requestRouter;