
/*
 * Entry point for todo list app
 *
 * A Web Dev Advanced Boot Camp project on writing APIs
 *
 * Would be written quite differently now, knowing what I've learned.
 *
 * These lectures were absolutely punishing, trying to follow along with
 * a someone speed-typing and auto-completing.
 *
 * Spent a lot of extra time ensuring I could wrap my head around routing.
 */


// Requirements for routing, etc.:
let express = require('express'),
	app = express(),
	bodyParser = require('body-parser')
	;


let PORT = 8123;
// Should the ReactJS frontend be preferred, here's where CORS is allowed:
let reactFrontEndUrl = "10.60.42.5:3003";


// See models/index.js for mongo / DB stuff:
// let mongodb = require('mongoose');
// NOTE: mongodb uses todo-api  NOT todoS-api

let todoRoutes = require('./routes/todos');


// Enable parsing of posted data:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Contains main index.html, which pulls in jQuery and public/todos.{js,css}:
app.use(express.static(__dirname + "/views") );

// Our views/index.html includes this:
// app.use(express.static(__dirname + "/css") );

// Contains todos.js (and todos.css), basically the frontend code:
app.use(express.static(__dirname + "/public") );


app.get('/', function(req, res){
	res.sendFile("index.html");
	// res.send("This is res.send() ROOT route");
	});



/*
 * CORS caused a *lot* of grief during development before the
 * "lightbulb moment" happened.
 *
 * This mess of code will remain (for now) showing the blood, sweat, & tears
 * suffered.  Tough lesson to learn.
 */
// Fix CORS issue on React TodoList app (I hope):
let allowCrossOriginRequests = function( req, res, next) {
	// WILDCARD IS BAD IDEA™, at least restrict to LAN:
	//	res.header('Access-Control-Allow-Origin', '*');
	//	res.header('Access-Control-Allow-Methods', '*');
	//	res.header('Access-Control-Allow-Headers', '*');
	// fails (Reason: CORS header ‘Access-Control-Allow-Origin’ does not match ‘10.60.42.0/24’):
	// res.header('Access-Control-Allow-Origin', '10.60.42.0/24');
	// fails (CORS again/still):
	// res.header('Access-Control-Allow-Origin', 'origin');
	// fails CORS: (Reason: CORS header ‘Access-Control-Allow-Origin’ does not match ‘10.60.42.69’)
	// res.header('Access-Control-Allow-Origin', '10.60.42.69');
	// res.header('Access-Control-Allow-Origin', 'http://10.60.42.5:3003');
	res.header('Access-Control-Allow-Origin', 'http://${reactFrontEndUrl}');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,FETCH,HEAD');
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	// The following OUGHT to be client-side, I think:
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	// res.header('Referrer-Policy', 'no-referrer');
	next();
	}
app.use(allowCrossOriginRequests);



// Turn request for / to /api/todos:
app.use('/api/todos', todoRoutes);


// This is for routing testing: access via http://host:port/test[/]
app.get('/test', function(req, res){
	res.json( {message: "THIS IS TEST via res.send()"} );
	});




// Initialize app and give notice on where it's listening and how to use it:
app.listen(PORT, function(){
	console.log( `APP IS RUNNING on port ${PORT}!`);
	console.log( `CORS is configured for access via http://${reactFrontEndUrl}`);
	console.log( `Ensure mongodb is running (see ./mongod.sh)`);
	});
