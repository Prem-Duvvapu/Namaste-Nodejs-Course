const http = require("node:http");

const server = http.createServer(function (req, res) {
    if (req.url === "/getSecretData")
        res.end("There is no secret data.");
    else
        res.end("Hello World!!!");
});

console.log("Server is listening on 7777....")
server.listen(7777);