const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// middleware to parse JSON request body
app.use(express.json());

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Prem",
        lastName: "D",
        emailId: "prem.d@gmail.com",
        password: "Prem@123"
    };

    try {
        // Creating a new instance of the User model
        const user = new User(userObj);
        await user.save();
    } catch (err) {
        res.status(400).send("Error saving the user: "+err.message);
    }
    

    res.send("User added successfully!");
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