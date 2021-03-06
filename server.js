var express = require('express');
var pg = require('pg');
var app = express();
var bodyParser = require('body-parser');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public_html'));

app.listen(2000);

app.listen(app.get('port'), function() {
    console.log('Dream Dash is running on port', app.get('port'));
});

//==================================================//
//router to database          						//
//==================================================//
// these will be moved to router file. 
var pg = require('pg');
var connectionString = "postgres://mzrywechfymqij:sQfZ_XE1k6enGY5RnyTnNkLD7j@ec2-54-204-39-67.compute-1.amazonaws.com:5432/d9q2fvfchkasav";
var pgp = require('pg-promise')();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/highscores', function(req, res){
	// res.send('Get request to server');
	console.log('im inside of app.post');
	// console.log('this is req.body["playerName"]', req.body['playerName']);

	var results = [];

	pg.connect(connectionString + '?ssl=true', function(err, client, done) {
  		if (err) throw err;
  		console.log('Connected to postgres! Lets insert something');

  		//make insert to database
  		client.query("INSERT INTO highscores(name, score) values('" + req.body['playerName'] + "', " + req.body['score'] + ")", function(err, result){
  			done();
  			if(err) throw err;
  			res.send()
  		});
  	})

  	pg.end();
});

app.get('/highscores', function(req, res){
	// res.send('Get request to server');
	console.log('im inside of app.get');

	var results = [];

	pg.connect(connectionString + '?ssl=true', function(err, client) {
  		if (err) throw err;
  		console.log('Connected to postgres! Getting schemas...');

  		//make get request to database
	   	client
	    	.query('SELECT * FROM highscores ORDER BY score DESC')
	    	.on('row', function(row) {
	      		results.push(row);
	    	})
	    	.on('end', function(){
            	return res.json(results);
	    	})
	});
});


