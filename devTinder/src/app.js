const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.use("/admin/getAllData", (req, res) => {
    res.send("All data sent");
})

app.use("/user",  userAuth, (req, res, next) => {
    // res.send("1st response");
    next();
}, (req, res) => {
    throw new Error("abcdef");
    res.send("2nd response");
});

app.use("/", (err, req, res, next) => {
    if (err) {
        // Log your error messages
        res.status(500).send("Something went wrong!");
    }
});

app.listen(7777, () => {
    console.log("Server is listening on port 7777...");
});