// > global
// console.log("dirname", __dirname); 
// console.log("filename", __filename);
// console.log(require);
// console.log(module);
// console.log(process);
setInterval(() => {
	console.log(__dirname);
}, 1000);


//> module
const data = require("./module");
const {name,hi,lastName} = require('./module');
 console.log(data);
hi(name)
console.log(lastName);