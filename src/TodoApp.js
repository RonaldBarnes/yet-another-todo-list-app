
import React, {Component} from 'react';

// Deprecated:
// import TodoList from './TodoList';

import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

import './TodoApp.css';



// --------------------------------------------------------------------------
const API_URL = 'http://10.60.42.5:8123/api/todos';



/*
// --------------------------------------------------------------------------
ALL THE FOLLOWING CAN BE SCRAPPED, BECAUSE THE CHANGE MUST OCCUR ON SERVER
IN FILE /index.js
THIS IS THE MAIN CHANGE MAKES IT WORK:
    res.header('Access-Control-Allow-Origin', 'http://10.60.42.5:3003');
AND, FOR "PUT" METHOD:
		res.header('Access-Control-Allow-Methods', '*');
ALSO:
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,FETCH,HEAD');
	res.header("Access-Control-Allow-Headers", "Content-Type,
		Access-Control-Allow-Headers, Authorization, X-Requested-With");
// --------------------------------------------------------------------------
*/





// --------------------------------------------------------------------------
class TodoApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
//				todoList: [{name: "...waiting...", _id: 0}],
				todoList: [{name: "...waiting...", _id: 0}],
				inputValue: '',
				isLoaded: false
				};
/*
		// Did not need refs to blank input field upon submit:
		this.textInputTextRef = React.createRef();
		this.blankInputField = this.blankInputField.bind(this);
*/
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		}





	// --------------------------------------------------------------------------
	// Colt put state handling in TodoForm, not TodoApp: Why?
	// Store every keystroke entered into Add Todo input field into state as
	// they occur:
	handleInputChange(e) {
		e.preventDefault();
		e.stopPropagation();

		console.log( `handleInputChange(e): e.target.value: ${e.target.value}`);
		this.setState({
			inputValue: e.target.value
			}); // end setState
		} // end handleInputChange




	// --------------------------------------------------------------------------
	// Colt does NOT use (e) on his submit
	// ALSO: he put state handling in TodoForm, not TodoApp: Why?
	// --------------------------------------------------------------------------
	handleFormSubmit(e) {
		e.preventDefault();

		console.log(`handleFormSubmit() this.state.inputValue:`
			+ ` ${this.state.inputValue}`);

		// Skip zero-length, empty strings:
		if (this.state.inputValue.length > 0) {
			// Add the item to the DB:
			this.addTodo( this.state.inputValue);
			document.getElementById('inputTextField').value = '';
			document.getElementById('inputTextField').focus();
			} // end if length > 0
		} // end handleFormSubmit





	// --------------------------------------------------------------------------
	deleteTodo( id, e ) {
		e.preventDefault();


		const delURL = `${API_URL}/${id}`;

		console.log(`deleteTodo(id) id: ${id}`);

		fetch( `${delURL}`,
			{
			method: "DELETE"
			})
			.then( resp => {
				if (!resp.ok) {
					if ( resp.status >= 400 && resp.status < 500) {
						throw Error( `ERROR fetching data: ${resp.status} ${resp.statusText}`);
						} // end if >= 400 && < 500
					} // end if !resp.ok
				return resp;
				}) // end .then
			.then( () => {
				const updatedTodoList = this.state.todoList.filter( (item) => (
					item._id === id ? false : true
					) ); // end filter
				this.setState( {
					todoList: [...updatedTodoList],
					inputValue: ''
					}); // end setState
				return;
				}) // end .then
			.catch( err => {
				console.log(`ERROR FETCHING DATA: ${err.message}`, err)
				return err; // "?"
				}) // end catch

		} // end deleteTodo




	// --------------------------------------------------------------------------
	handleToggleCompleted( todoItem ) {
	// --------------------------------------------------------------------------
//	handleToggleCompleted( id, name, completed, created_date) {

// console.log(`handleToggleCompleted() todoItem:`, todoItem);
//		let [_id, name, completed, created_date] = [...more];
		let {_id, completed} = todoItem;
console.log(`handleToggleCompleted() _id: ${_id} completed: ${completed}`);



		// const updatedItem = fetch( `${API_URL}/todos/${[e.target.id]}`,
		fetch( `${API_URL}/${_id}`,
					{
					method: 'PUT',
					headers: { 'Content-type': 'application/json; charset=UTF-8'},
					body: JSON.stringify({
						id: todoItem._id,
//						name: name,
						completed: !todoItem.completed,
//						created_date: created_date,
						// There's a snippet of code in the todos-api that has
						// new: true, I forget where, but for now, see what this does:
						// new: false
						})
					}
				)
			.then( resp => {
				if (!resp.ok) {
					if (resp.status >= 400 && resp.status < 500) {
						throw Error( `ERROR UPDATING data: ${resp.status} ${resp.statusText}`);
						} // end status >= 400 && < 500
					} // end !resp.ok
				return resp;
				}) // end .then
			.then( resp => resp.json() )
			.then( data => {
				// Remove existing todo item, add the returned "completed" one:
				// NO! map over todoList, where current record's id matches, choose
				// fetch-PUT return value since todos-api returns updated data:
				const newList = this.state.todoList.map( (item) => (
					(item._id === _id) ? data : item
					) ); // end .filter
				this.setState( { todoList: [...newList] });
				return data;
				})
			.catch( err => {
				console.log( `ERROR PUTting (updating) data: `, err)
				return err;
				})
		}



	// --------------------------------------------------------------------------
	// Add new item to DB (val comes from TodoForm):
	// --------------------------------------------------------------------------
	addTodo(val) {
		console.log(`addTodo(val) val: ${val}`);

		fetch( `${API_URL}`,
			{
			method: "POST",
			headers: { 'Content-type': 'application/json; charset=UTF-8'},
			body: JSON.stringify( {name: val} )
			})
			.then( resp => {
				if (!resp.ok) {
					if ( resp.status >= 400 && resp.status < 500) {
						throw Error( `ERROR fetching data: ${resp.status} ${resp.statusText}`);
						} // end if >= 400 && < 500
					} // end if !resp.ok
				return resp;
				}) // end .then
			.then( resp => resp.json() )
			.then( data => {
				this.setState( {
					todoList: [...this.state.todoList, data],
					inputValue: ''
					}); // end setState
				console.log(`addTodo() JUST SET STATE, HERE IS this.state.inputValue: `
					+ `${this.state.inputValue}`);
					return data;
				}) // end .then
			.catch( err => {
				console.log(`ERROR FETCHING DATA: ${err.message}`, err)
				return err; // "?"
				}) // end catch
		return true;
		} // end addTodo




	// --------------------------------------------------------------------------
	// Get / fetch list of all todo items from api:
	// --------------------------------------------------------------------------
	fetchList() {
		fetch(
					`${API_URL}`
//					,
//					requestOptions
					) // end fetch

			.then( resp => {
				console.log( `fetchList() first .then after fetch()`);
				if ( ! resp.ok ) {
					console.log( `ERROR IN FETCH: response NOT OK: `
						+ `${resp.status} ${resp.statusText}`);
					throw Error( `ERROR IN FETCH: response NOT OK: `
						+ `${resp.status} ${resp.statusText}`);
					}
				return resp;
				}) // end .then
			.then( resp => resp.json() )
			.then( data => Promise.all(data) )
			.then( data => this.setState( {todoList: data, isLoaded: true} ))
			.catch( err => {
				console.log( `ERROR: ${err}`);
				return [{name: err, id: 0}, {name: 'PROXY?', id: 1}];
				}) // end catch
		} // end fetchList



	// --------------------------------------------------------------------------
	// Only runs once loaded, i.e. fetch data only at page (re-)load:
	// --------------------------------------------------------------------------
	componentDidMount() {
		console.log(`componentDidMount() - calling fetchList() for todo list:`);

		this.fetchList();
		}




	// --------------------------------------------------------------------------
	render() {
		let myList;
		myList = this.state.todoList;
		let addClasses = '';
		let todoItems = '...WAIT...';

		// Display message while waiting for data to load:
		if (!this.state.isLoaded) {
			return (
				<div className='App'>
					<h1>Todo App</h1>
					<p>Please wait...</p>
					<p>Fetching list of todo items</p>
				</div>
				); // end return
			} // end if not isLoaded



		todoItems = myList.map( item => {
			// Add class containing text-decoration: line-through if completed:
			addClasses = item.completed ? 'completed' : '';

			// Complains about values of true for completed being written to DOM:
			// Warning: Received `true` for a non-boolean attribute `completed`.
			// If you want to write it to the DOM, pass a string instead:
			// completed="true" or completed={value.toString()}.
			//
			// Fixed by binding param's (I think - it was a long slog debugging)


			const todoItem = <TodoItem
				key={item._id}
				// Some of these attributes are placed on <li> in TodoItem:
				// i.e. title= ONLY works on <li>
				//
				// NOTE: className= ONLY works on BOTH <li> and <TodoItem />
				// DUH, because having it HERE passes it as a "props" to <li>,
				// without it here, <li> has no className defined!
				className={addClasses}
				title={item.name}
				// <li><span> gets the id:
				// id={item._id}

				onClick={this.handleToggleCompleted.bind(this, item)}
/*
				onClick={this.handleToggleCompleted.bind(this,
					item._id,
//					item.name,
					item.completed,
//					completedState,
//					item.created_date
					)}
*/
				onDelete={this.deleteTodo.bind(this,item._id)}
				{...item}
				/>

				return todoItem;
			}); // end myList.map




		return (
			<div className='App'>
				<h1>Todo App</h1>
				<TodoForm
					inputValueText={this.state.inputValue}
					addTodo={this.addTodo}
					handleFormSubmit={this.handleFormSubmit}
					handleInputChange={this.handleInputChange}
					/>
				<ul>
					{todoItems}
				</ul>
			</div>
			);
		} // end render
	} // end class TodoApp

export default TodoApp;
