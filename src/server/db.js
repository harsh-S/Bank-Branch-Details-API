var pg = require('pg'),
	constants = require('./constants')

pg.defaults.poolSize = constants.poolSize

function executeQuery(query, cb){	
    pg.connect(constants.connString, function(err, client, done) {
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