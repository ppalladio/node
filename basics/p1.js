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

// const fs = require('fs')
// fs.writeFileSync('./first.txt', 'first file');
// fs.writeFileSync('./second.txt', 'second file');
// const first = fs.readFileSync('./first.txt','utf8')
// const second = fs.readFileSync('./second.txt','utf8')

//*overwrite/create the file
// fs.writeFileSync('./result.txt',`${first}\n${second}`);

//* concat instead of overwrite
// fs.writeFileSync('./result_concat.txt',`${first}\n${second}`,{flag:'a'});

//> read/writing using callbacks
// fs.readFile('./first.txt', 'utf8', (err, data) => {
// 	if(err){
// 		throw err;
// 	}
// 	console.log(data);
// })

//> HTTP

//@ example 1
// const http = require('http');
// http.createServer((req, res) => {
//     res.write('Hello World');
//     res.end();
// }).listen(5000);

//@ example 2
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Hello World');
//         res.end();
//     }
//     if (req.url === '/about') {
//         res.end(`<h1>About</h1>`);
//     }
//     res.end(`<h1>Not Found</h1>
// 	<a href="/">Home</a>`);
// });

// server.listen(5000);

//> promises

const fs = require('fs');
const getText = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// getText('./first.txt')
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
const util = require('util');
//@
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const { readFile } = require('fs').promises;

const start = async () => {
    try {
        const first = await getText('./first.txt');
        console.log(first);

        // @ use .promises method
        const second = await readFile('./second.txt', 'utf8');
        console.log(second);
        writeFilePromise('./result.txt', `${first}\n${second}`);
        const resultPromise = readFilePromise('./result.txt', 'utf8');

        //@ resultPromise is a promise that needs to be resolved
        resultPromise
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
};

start();
