var pg = require('pg'),
	constants = require('./constants')

pg.defaults.poolSize = constants.poolSize

function executeQuery(query, values, cb){
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if(err) {
        	done()
	    	console.log(err)
	    	cb(err)
	    }
	    client.query(query, values, function(err, result) {
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