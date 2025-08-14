const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
    // res.send("1st response");
    next();
}, (req, res) => {
    res.send("2nd response");
});

app.listen(7777, () => {
    console.log("Server is listening on port 7777...");
});