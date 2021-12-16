
import React, {Component} from 'react';



// --------------------------------------------------------------------------
// This probably should be a functional component: no state in my version
class TodoForm extends Component {

	constructor(props) {
		super(props);

		console.log( `TodoForm() props:`, props);

		/*
			WHY DOES COLT PUT STATE HANDLING IN THIS COMPONENT?!?

			I MOVED IT TO TodoApp.js
		*/
		this.state = {inputValue: 'DO NOT USE THIS COMPONENT STATE'};

		this.handleInputChange = props.handleInputChange;
		this.handleFormSubmit = props.handleFormSubmit;

		this.addTodo = props.addTodo;
		} // end constructor



	// --------------------------------------------------------------------------
	render() {
		return (
			<div>
				<form
//					onSubmit={ () => {this.handleFormSubmit()} }
					onSubmit={this.handleFormSubmit}
					>
					<input
						type="text"
//						value={this.inputValueText}
						placeholder="Enter new Todo item"
						onChange={this.handleInputChange}
						id='inputTextField'
						/>
					<button onClick={this.handleFormSubmit}>
						Add Todo
					</button>
				</form>
			</div>
			); // end return
		} // end render
	} // end TodoForm


export default TodoForm;
