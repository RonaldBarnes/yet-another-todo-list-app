// alert( "todos_api/public/todos.js");


// Interesting mix-and-match of .then/.catch and .done/.fail

$(document).ready( function(){
	// Revert to placeholder text if field is populated and page reloaded:
	$("#todoInput").val('');

	$.getJSON("/api/todos")
//	$.get("/api/todos")
	.then( function( data){
		addTodos(data);
		});

	$('#todoInput').keypress( function( event){
		if (event.which == 13){	// 13 = "Enter"
			console.log("Enter pressed");
			createTodo();
			};
		});

	// Listener on <span> is problematic: they don't yet exist when
	// page loads so... not added to our list items:
	// $("span").on("click", function(event){
	// SO, we add to the list (<ul>) sub-elements <span>, so when
	// we add spans, the <ul> will cascade automatically:
	$(".list").on("click", "span", function(event){
		// Stop click on delete from ALSO clicking on this
		event.stopPropagation();
		console.log( "Span (x) clicked (i.e. delete item now)" );
		// $(this).parent().remove() ;
		// deleteTodo( $(this).parent().data('id') );
		deleteTodo( $(this).parent() );
		});

	// Listener on <li>.click, completing the task:
	// Uh-oh, this runs even when clicking on 'x' to delete()
	// Need to add stopPropogation to on.click(span) above
	$(".list").on("click", "li", function(event){
		// alert( "Task <li> clicked: complete the task");
		console.log( "Task <li> clicked: complete the task");
		console.log( $(this) );
		// Need to access "id" and "completed" state in updateTodo
		// updateTodo( $(this).data('id') );
		updateTodo( $(this) );
	});
});


// addTodos ADDS TO PAGE, not to database:
function addTodos( todos){
	// console.log( "All todos: ", todos);
	// add todos to the page
	todos.forEach( function(todo){
		addTodo( todo);
		});
	};

// Singular todo add to page:
function addTodo( todo){
	console.log( "todo: ", todo.name);
	var newTodo = $('<li>' + todo.name + '<span>x</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	newTodo.addClass('task');
	if (todo.completed){
		newTodo.addClass( 'done');
		};
	// Alternately, add "class=task" inside <li ...> above
	$('.list').append(newTodo);
	};


// Create new todo entry in db:
function createTodo( ){
	console.log("createTodo()");
	var userData = $("#todoInput").val();
	console.log("createTodo() data:", userData, " typeof:", typeof(userData) );
	if ( (typeof( userData) !== 'string') || userData.length === 0 ){
		alert( "No empty strings / invalid objects allowed.");
		return;
		};
	// Send request to create new todo:
	$.post('/api/todos', {name: userData } )
		.then( function( newTodo){
			console.log( "newTodo: ", newTodo);
			addTodo( newTodo);
			// Clear input field:
			$("#todoInput").val("");
			})
		// .catch( function( err){
		.fail( function( err){
			console.log(err);
			alert( err);
			});
	};


// Delete a todo from the db:
function deleteTodo( todo){		//clickedId){
	console.log("deleteTodo()");

	$.ajax({
		method: "DELETE",
		// url: "/api/todos/" + clickedId
		url: "/api/todos/" + todo.data('id')
		})
	.done( function( res){
		console.log( res);
		$.getJSON( '/api/todos')
		.then( function( todos){
			clearTodoList();
			addTodos(todos);
			});
		})
	.fail( function(err){
		console.log( err);
		});
	}


// Remove list from page, not db:
function clearTodoList(){
	$("li").remove();
	}

// Complete task (via clicking on it):
function updateTodo( todo){
	console.log( "updateTodo(), id: " + todo.data('id') );
	// Can't seem to extract completed state, SO:
	// modified addTodo() above to include "completed" state in data(id)
	var todoId = todo.data('id');

	var newCompletedStatus = todo.data('completed');
	// Better is to just negate the value of newCompletedStatus
	//if (newCompletedStatus === true){
	//	newCompletedStatus = false;
	//	}
	//else{
	//	newCompletedStatus = true;
	//	};

	$.ajax( {
	 method: 'PUT',
		url: '/api/todos/' + todoId,
		data: {completed: !newCompletedStatus},
		} )
	.done (function( res){
		// results if okay
		// Instead of clearing & reloading list, toggle the class
		// BUT, this doesn't change the data('completed') value,
		// so multiple clicks with a page load in between fails
		todo.toggleClass('done');
		// This will toggle the data('completed') in jQuery memory:
		todo.data('completed', !newCompletedStatus );
		// No need to call back to the server if toggleClass, etc above:
		// $.getJSON('/api/todos/')
		// .then( function( todos){
		//		clearTodoList();
		//		addTodos( todos );
		//	});
		})
	.fail (function( err){
		console.log(err);
		})
	}



/*
$("#todoInput").change( function(){
	alert( "Changed todo input...");
	}

*/

