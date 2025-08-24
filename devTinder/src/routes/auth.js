const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");

// POST /signup - create user
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid email format!");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentails!");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJWT();
            // console.log(token);

            // Add the token to cookie
            res.cookie("token",token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });

            res.send("Login Successful!");
        } else {
            throw new Error("Invalid credentails!");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// POST /logout - logout user
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });

    res.send("Logout successful!");
})

module.exports = authRouter;