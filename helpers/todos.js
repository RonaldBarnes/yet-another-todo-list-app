var db = require('../models');

exports.getTodos = function( req, res){
	db.Todo.find()
	.then( function(todos){
		res.json(todos);
		})
	.catch( function( err){
		res.send(err);
		})
//	res.send( "Hi from routes/todos.js");
	};


exports.createTodo = function( req, res){
	console.log( req.body);
	db.Todo.create(req.body)
	.then( function( newTodo){
		res.json(newTodo);
		// alternately, a 201 "Created" http code instead of 200 Success:
		// THIS DID NOT WORK ("Unexpected token '(' " before newTodo):
		// res.status(201).(newTodo);
		})
	.catch( function( err){
		res.send(err);
		})
	};


// Next one only called when ID passed (see ../routes/todos.js),
// so "ById" is redundant:
// exports.getTodoById = function( req,res){
exports.getTodo = function( req,res){
	// req.params is parameter(s) passed to this (:todoId):
	db.Todo.findById( req.params.todoId )
	.then( function(foundTodo){
		res.json(foundTodo);
		})
	.catch( function( err){
		res.send(err);
		})
	};

// exports.updateTodoById = function( req,res){
exports.updateTodo = function( req,res){
	db.Todo.findOneAndUpdate( {_id: req.params.todoId}, req.body, {new: true})
	.then( function( updatedTodo){
		res.send( updatedTodo);
		})
	.catch( function( err){
		res.send(err);
		});
	};


// exports deleteTodoById = function( req, res){
exports.deleteTodo = function( req, res){
	db.Todo.remove( {_id: req.params.todoId})
	.then( function(){
		res.json( {message: "Deleted"} );
		})
	.catch( function( err){
		res.send(err);
		});
	};

