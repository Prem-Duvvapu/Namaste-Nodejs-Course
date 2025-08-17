const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 3;

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("1 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("2 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("3 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("4 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("5 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("6 - cryptoPBKDF2 done");
});
