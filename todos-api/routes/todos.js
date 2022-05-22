var express = require('express');
var router = express.Router();
// Will auto-load index.js:
var db = require('../models');

var helpers = require('../helpers/todos');


// Now, with helpers loaded:
router.route('/')
	.get(helpers.getTodos)
	.post(helpers.createTodo)
	;

router.route('/:todoId')
	.get(helpers.getTodo)
	.put(helpers.updateTodo)
	.delete(helpers.deleteTodo)
	;

// /api/todos is handled in ../index.js app.use('/api/todos', todoRoutes);
// router.get('/api/todos', function( req, res){
/*
router.get('/', getTodos);

router.post('/', createTodo);

router.get('/:todoId', getTodoById);

router.put('/:todoId', updateTodoById);

router.delete('/:todoId', deleteTodoById);
*/

module.exports = router;


/*
My UNposted comment on lecture 162:

It's a tricky thing to follow, but it makes sense. BUT, it'd be a lot 
easier if we could at least track which "todo[s].js] file Colt's editing.  
The editor's tabs only show the file name, no path, and the folder tree 
view doesn't seem to sync highlighted entry with file being worked on 
(video artifact?).

At 02:32, for example, he's adding the line:

var helpers = require('../helpers/todos');

YET, the folder panel shows todos_api/helpers/todos.js highlighted (current).

So, he's requiring the file he's editing into the file he's editing (it looks like).

Viewing at 720p for clarity while discouraging video artifacting.

*/

