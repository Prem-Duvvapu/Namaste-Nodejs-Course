const adminAuth = (req, res, next) => {
    console.log("Admin authentication");
    const token = "xyz";
    const authorizedUser = (token === "xyz");

    if (!authorizedUser)
        res.status(401).send("Unauthorized User!");
    else
        next();
}

const userAuth = (req, res, next) => {
    console.log("User authentication");
    const token = "xyz";
    const authorizedUser = (token === "xyz");

    if (!authorizedUser)
        res.status(401).send("Unauthorized User!");
    else
        next();
}

module.exports = {
    adminAuth,
    userAuth,
}