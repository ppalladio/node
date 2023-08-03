//> event driven programming

// const EventEmitter = require('events');

// const emitter = new EventEmitter();

// emitter.on('res',()=>{
// 	console.log( 'event registered' );
// })

// //@ only the ones with parameters will output the values
// emitter.on('res',(name,id)=>{
// 	console.log( `event registered with ${name} and ${id}` );
// })

// emitter.emit('res','poo','123');

//> http event

// const http = require('http');

// const server = http.createServer()

// //@ server has the method on to listen to event 'request'
// server.on('request', (req, res) => {
// 	res.end('Homepage')
// })

// server.listen(5000)

//> streams

const {createReadStream,createWriteStream } = require('fs');

//@default read size - 64kb
const stream = createReadStream('./first.txt',{highWaterMark:90000,encoding:'utf8'});
stream.on('data', (chunk) => {
	console.log(`${chunk.length} bytes of data`, chunk);
})
stream.on('error', (err) => {
	console.log(err);
})