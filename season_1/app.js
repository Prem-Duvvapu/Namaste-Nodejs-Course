// require("./xyz.js"); //one module into another
import { x, calculateSum} from "../sum.js";
var name = "Namaste NodeJS";

// console.log(global);
// console.log(this); //empty object
// console.log(globalThis === global);

var a = 10;
var b = 20;

console.log(name);

// const obj = require("./sum.js");
// obj.calculateSum(a,b);
// console.log(obj.x);

console.log(x);
calculateSum(a,b);



