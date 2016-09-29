var pg = require('pg'),
	constants = require('./constants')

pg.defaults.poolSize = constants.poolSize

//process.env.DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgres://harsh:hasz@localhost:5432/'

function executeQuery(query, cb){	
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if(err) {
        	done()
	    	console.log(err)
	    	cb(err)
	    }
	    client.query(query, [], function(err, result) {
        	done()
        	if(err){
        		console.log(err)
        		cb(err)
        	} else {
        		cb(err, result)
        	}
        })
    })
}

module.exports = {
	executeQuery: executeQuery
}