const name = 'Tommy'


const hi = (name)=>{
	console.log(`hello from ${name} `);
}
module.exports = {name,hi}

module.exports.lastName = 'Chen' //> has to be declared after module.exports 