const fs = require("fs");
const https = require("https");

console.log("Hello World");

var a = 12345;
var b = 67890;

https.get("https://dummyjson.com/products/1", (res) => {
    console.log("Fetched data successfully");
});

setTimeout(() => {
    console.log("setTime called after 5 seconds");
}, 5000);

//Synchronous - This will block the main thread and this will be also moved to libuv. This is not recommended.
const dataSync = fs.readFileSync("./file.txt", "utf8");
console.log("File data sync : ", dataSync);

//Asynchronous
fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log("File Data async : ", data);
});

function multiplyFn(x, y) {
    const result = x * y;
    return result;
}

var c = multiplyFn(a, b);
console.log("Multiplication result is : ", c);