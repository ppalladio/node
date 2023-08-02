// > global
// console.log("dirname", __dirname); 
// console.log("filename", __filename);
// console.log(require);
// console.log(module);
// console.log(process);
// setInterval(() => {
// 	console.log(__dirname);
// }, 1000);


//> module
// const data = require("./module");
// const {name,hi,lastName} = require('./module');
// console.log(data);
// hi(name)
// console.log(lastName);

//> built in
// const os = require('os')
// console.log(os.userInfo());
// console.log(os.uptime());

// const path = require('path')

//*separators
// console.log(path.sep);

// const filePath = path.join('/content', 'hello.txt');
// const base = path.basename(filePath);
// //*absolute path
// const absolutePath = path.resolve(__dirname, 'content', 'hello.txt');


// console.log(absolutePath);
// console.log(base);
// console.log(filePath);

//> file system

const fs = require('fs')
fs.writeFileSync('./first.txt', 'first file');
fs.writeFileSync('./second.txt', 'second file');
const first = fs.readFileSync('./first.txt','utf8')
const second = fs.readFileSync('./second.txt','utf8')

//*overwrite/create the file
fs.writeFileSync('./result.txt',`${first}\n${second}`);

//* concat instead of overwrite
fs.writeFileSync('./result_concat.txt',`${first}\n${second}`,{flag:'a'});

//> read/writing using callbacks
fs.readFile('./first.txt', 'utf8', (err, data) => {
	if(err){
		throw err;
	}
	console.log(data);
})