const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

// middleware to parse JSON request body
app.use(express.json());
app.use(cookieParser());

// POST /signup - create user
app.post("/signup", async (req, res) => {
    try {
        // validate the data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();

        res.send("User added successfully!");
    } catch (err) {
        res.status(400).send("ERROR : "+err.message);
    }
});

// POST /login - user login
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid email format!");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentails!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // Create a JWT Token
            const token = await jwt.sign({ _id: user._id}, "devTender@123SECRET");
            console.log(token);

            // Add the token to cookie
            res.cookie("token",token);

            res.send("Login Successful!");
        } else {
            throw new Error("Invalid credentails!");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;

        if (!token) {
            throw new Error("Invalid token!");
        }

        // Validate the token
        const decodeMsg = await jwt.verify(token, "devTender@123SECRET");
        // console.log(decodeMsg);
        // console.log(cookies);

        const { _id } = decodeMsg;
        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User does not exist");
        }

        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + e.message);
    }
})

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