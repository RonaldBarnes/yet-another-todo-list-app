var express = require('express'),
	app = express(),
	bodyParser = require('body-parser')
	;

// See models/index.js:
// var mongodb = require('mongoose');
// NOTE: mongodb uses todo-api  NOT todoS-api

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views") );
// app.use(express.static(__dirname + "/css") );
app.use(express.static(__dirname + "/public") );

app.get('/', function(req, res){
	res.sendFile("index.html");
	// res.send("This is res.send() ROOT route");
	});

// Fix CORS issue on React TodoList app (I hope):
let allowCrossOriginRequests = function( req, res, next) {
	// WILDCARD IS BAD IDEA™, at least restrict to LAN:
	// fails (Reason: CORS header ‘Access-Control-Allow-Origin’ does not match ‘10.60.42.0/24’):
	// res.header('Access-Control-Allow-Origin', '10.60.42.0/24');
	// fails (CORS again/still):
	// res.header('Access-Control-Allow-Origin', 'origin');
	// fails CORS: (Reason: CORS header ‘Access-Control-Allow-Origin’ does not match ‘10.60.42.69’)
	// res.header('Access-Control-Allow-Origin', '10.60.42.69');
	res.header('Access-Control-Allow-Origin', 'http://10.60.42.5:3003');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	// The following OUGHT to be client-side, I think:
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	// res.header('Referrer-Policy', 'no-referrer');
	next();
	}
app.use(allowCrossOriginRequests);



// Turn request for / to /api/todos:
app.use('/api/todos', todoRoutes);


app.get('/test', function(req, res){
	res.json( {message: "THIS IS TEST via res.send()"} );
//	res.send( {} );
	});


app.listen(8123, function(){
	console.log( "APP IS RUNNING!");
	});


