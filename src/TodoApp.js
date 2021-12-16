
import React, {Component} from 'react';

// import TodoList from './TodoListXXX';

import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

import './TodoApp.css';



// --------------------------------------------------------------------------
const API_URL = 'http://10.60.42.5:8123/api/todos';
// const API_URL_GET = 'todos';



/*
// --------------------------------------------------------------------------
ALL THE FOLLOWING CAN BE SCRAPPED, BECAUSE THE CHANGE MUST OCCUR ON SERVER
IN FILE /index.js
THIS CHANGE MAKES IT WORK:
    res.header('Access-Control-Allow-Origin', 'http://10.60.42.5:3003');
AND, FOR "PUT" METHOD:
		res.header('Access-Control-Allow-Methods', '*');
// --------------------------------------------------------------------------

const myHeaders = new Headers();

/* The following appends give weird result!
myHeaders.append( "Access-Control-Allow-Origin", "*");
myHeaders.append( "X-WTF", "WTF?");
myHeaders.append( 'WTF-YOU-BASTARDS', "TWF YOU BASTARDS");

// THIS IS WHAT WAS SENT:
// Access-Control-Request-Headers
//	access-control-allow-origin,wtf-you-bastards,x-wtf


// myHeaders.append('Access-Control-Request-Headers', '*');
// THIS GOES ON SERVER SIDE:
// myHeaders.append( "Access-Control-Allow-Origin", "*");
myHeaders.append( 'Referrer-Policy', 'no-referrer');
myHeaders.append( 'Sec-Fetch-Mode', 'no-cors');
myHeaders.append( 'Referrer-Policy', 'no-referrer');

const requestOptions = {
	method: 'GET',
//	headers: myHeaders,
	// mode: 'no-cors' PREVENTS SUCCESS!
	// mode: 'no-cors',
	};
*/
// --------------------------------------------------------------------------





// --------------------------------------------------------------------------
class TodoApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
				todoList: [{name: "...waiting...", _id: 0}],
				inputValue: '',
				isLoaded: false
				};

		this.textInputTextRef = React.createRef();
		this.blankInputField = this.blankInputField.bind(this);

/*
		this.handleToggleCompleted =
			this.handleToggleCompleted.bind(
				this
*/
/*
				,
				this.id,
				this.name,
//				this.completed ? 'true' : 'false',
				this.completed,
				this.created_date
*/
/*
			);
*/
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		}





	// --------------------------------------------------------------------------
	// Colt put state handling in TodoForm, not TodoApp: WTF?
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
	// ALSO: he put state handling in TodoForm, not TodoApp: WTF?
	handleFormSubmit(e) {
		e.preventDefault();

		console.log(`handleFormSubmit() this.state.inputValue: ${this.state.inputValue}`);

		// Skip zero-length, empty strings:
		if (this.state.inputValue.length > 0) {
			// Add the item to the DB:
			this.addTodo( this.state.inputValue);
			}
		document.getElementById('inputTextField').value = '';
		// this.inputTextRef.current.value('!');
		// this.blankInputField();
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
					item._id === id ? false : true ) );
				this.setState( {
					todoList: [...updatedTodoList],
					inputValue: ''
					}); // end setState
				console.log(`DELETE: JUST SET STATE, HERE IS this.state.inputValue: `
					+ `${this.state.inputValue}`);
				return;
				}) // end .then
			.catch( err => {
				console.log(`ERROR FETCHING DATA: ${err.message}`, err)
				return err; // "?"
				}) // end catch

		} // end deleteTodo




	// --------------------------------------------------------------------------
	handleToggleCompleted( todoItem ) {
//	handleToggleCompleted( id, name, completed, created_date) {

console.log(`handleToggleCompleted() todoItem:`, todoItem);
//		let [_id, name, completed, created_date] = [...more];
		let {_id, completed} = todoItem;
console.log(`handleToggleCompleted() _id: ${_id} completed: ${completed}`);

		// Invert completion status of this item:
		// Damn, it's string and JS is stupid with Bool <--> String:
		// Boolean("false") === true!
		// console.log(`typeof completed:`, typeof completed);
		// completed = !Boolean(completed);

		// Manually cast "false" to false, invert it inside JSON.stringify:
		// ALL KINDS of stupid "no" becoming true FFS:
		// completed = (completed === ('false' || false || "no")) ? false : true;
		// NOPE: completed = completed === ("no" || "false" || false) ? false : true;
//		completed = completed === "no" || "false" || false ? 'true' : 'false';
		// Eff it, toggle here:
		// completed = !completed;


//		console.log( `handleToggleCompleted() more/rest:`, more);

//		const updatedItem = fetch( `${API_URL}/todos/${[e.target.id]}`,
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
//						new: false
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
/*
			.then( xyz => {
				console.log(`xyz:`, xyz);
				return xyz;
				} )
*/
			.catch( err => {
				console.log( `ERROR PUTting (updating) data: `, err)
				return err;
				})
		}



	// --------------------------------------------------------------------------
	// Add new item to DB (val comes from TodoForm):
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
	fetchList() {
		const retVal = fetch(
					`${API_URL}`
//					,
//					requestOptions
					)

			.then( resp => {
				console.log( `first .then after fetch()`);
				if ( ! resp.ok ) {
					console.log( `ERROR IN FETCH: response NOT OK: `
						+ `${resp.status} ${resp.statusText}`);
					throw Error( `ERROR IN FETCH: response NOT OK: `
						+ `${resp.status} ${resp.statusText}`);
					}
				return resp;
				})
			.then( resp => resp.json() )
			.then( data => Promise.all(data) )
//			.then( data => this.setState( {todoList: data, isLoaded: true} ))
			.then( data => this.setState( {todoList: data, isLoaded: true} ))
			.catch( err => {
				console.log( `ERROR: ${err}`);
				return [{name: err, id: 0}, {name: 'PROXY?', id: 1}];
				})

console.log( `retVal: ${retVal}`);
		return retVal;
		}

	// --------------------------------------------------------------------------
	componentDidMount() {
		let x = [];
		// x = [ {name: 'this.fetchList();', id: 1} ];
		x = this.fetchList();

		console.log( `fetchList() returned x=${x}`, x);
		}




	// --------------------------------------------------------------------------
	blankInputField() {
		this.inputTextRef.current.value('!?!');
		}



	// --------------------------------------------------------------------------
	render() {
		let myList;
/*
		// WHY?
		if ( this.state.isLoaded ) {
			myList = this.fetchList();
			}
		else
			{
			myList = this.state.todoList;
			}
*/
		myList = this.state.todoList;
		let addClasses = '';
		let todoItems = '...WAIT...';
if (this.state.isLoaded)
	{
		todoItems = myList.map( item => {
			// Add class containing text-decoration: line-through if completed:
			addClasses = item.completed ? 'completed' : '';

			// Complains about values of true for completed being written to DOM:
			// Warning: Received `true` for a non-boolean attribute `completed`.
			// If you want to write it to the DOM, pass a string instead:
			// completed="true" or completed={value.toString()}.
//			const completedState = item.completed.toString();
/*
			const completedState = "completed='"
				+ (item.completed === false) ? "false" : "true"
				+ "'";
*/
//			const completedState = item.completed ? 'true' : 'false';
//			const completedState = item.completed ? 'yes' : 'no';
//			const completedState = item.completed ? 1 : 0;
/*
console.log(`completedState: ${item.name} ${completedState}`
	+ ` ORIG value: ${item.completed}`, typeof item.completed);
*/
			return <TodoItem
				key={item._id}
				// Some of these attributes are placed on <li> in TodoItem:
				// i.e. title= ONLY works on <li>
				//
				// NOTE: className= ONLY works on BOTH <li> and <TodoItem />
				// DUH, because having it HERE passes it as a "props" to <li>,
				// without it here, <li> has no className defined!
				className={addClasses}
				title={item.name}
/*
				id={item._id}
*/
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
			}); // end map
	} // end if isLoaded


		return (
			<div className='App'>
				<h1>Todo App</h1>
				<TodoForm
					inputValueText={this.state.inputValue}
					addTodo={this.addTodo}
					handleFormSubmit={this.handleFormSubmit}
					handleInputChange={this.handleInputChange}
					inputTextRef={this.inputTextRef}
					/>
				<ul>
					{todoItems}
				</ul>
			</div>
			);
		} // end render
	} // end class TodoApp

export default TodoApp;

// 					<TodoList list={[{name: 'one', id: 1}, {name: 'two', id: 2}]} />

