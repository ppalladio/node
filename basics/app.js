//> event driven programming

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('res',()=>{
	console.log( 'event registered' );
})

//@ only the ones with parameters will output the values
emitter.on('res',(name,id)=>{
	console.log( `event registered with ${name} and ${id}` );
})

emitter.emit('res','poo','123');

