var app = require('express')(),
	db = require('./db'),
	constants = require('./constants')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain)

app.get('/api/branch/', function(req, res){	
	var sql = '',
		whereClause = '',
		offset = req.query.offset ? parseInt(req.query.offset) : constants.defaultRecordOffset,
		limit = req.query.limit ? parseInt(req.query.limit) : constants.defaultRecordLimit,
		count = 1,
		queryValues = [],
		filters = [],
		validFilterKeys = ['ifsc','bank_id','branch','address','city','district','state','bank_name']

	Object.keys(req.query)
			.filter(key => validFilterKeys.indexOf(key) !== -1)
			.forEach(key => {
				filters.push(key + '=$' + count++)
				queryValues.push(req.query[key])
			})

	if(filters.length > 0){
		whereClause = " WHERE " + filters.join(' AND ')
	}

	sql = "SELECT ifsc, bank_id, branch, address, city, district, state, bank_name FROM bank_branches " 
			+ whereClause 
			+ " OFFSET $" + count++ 
			+ " LIMIT $" + count++

	queryValues.push(offset)
	queryValues.push(limit)

	// 'pg' module takes care of escaping queryValues, and prevents SQL injection
	db.executeQuery(sql, queryValues, function(err, result){
		if(err){
			res.status(500).json({
				success: false, 
				message: 'Something went wrong. We know about this, and are fixing it. Sorry for the inconvinience.'
			})
		} else {
			res.send({
				branches: result.rows,
				success: true
			})
		}
	})
})

app.listen(process.env.PORT || 3000, function(){console.log("Server started")})