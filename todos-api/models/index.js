var mongoose = require('mongoose');
mongoose.set('debug', true);

// With node v 16.x (via snap), {useNewUrlParse: true} else
// Error: Cannot read property 'find' or something:
mongoose.connect('mongodb://localhost/todos-api', {useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");

