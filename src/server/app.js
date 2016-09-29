var app = require('express')(),
	db = require('./db')	

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
		branches = []

	whereClause = Object.keys(req.query).map(function(key){
		return key + "='" + req.query[key] + "'"
	}).join(" AND ")

	sql = "SELECT ifsc, bank_id, branch, address, city, district, state, bank_name FROM bank_branches WHERE " + whereClause
	db.executeQuery(sql, function(err, result){
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
app.listen(3000, function(){console.log("Server started")})