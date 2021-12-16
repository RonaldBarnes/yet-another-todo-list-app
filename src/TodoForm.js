
import React, {Component} from 'react';



// --------------------------------------------------------------------------
class TodoForm extends Component {

	constructor(props) {
		super(props);

		console.log( `TodoForm() props:`, props);

		/*
			WHY DOES COLT PUT STATE HANDLING IN THIS COMPONENT?!?

			I MOVED IT TO TodoApp.js
		*/
		this.state = {inputValue: 'DO NOT USE THIS COMPONENT STATE'};
		// this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputChange = props.handleInputChange;
		// this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleFormSubmit = props.handleFormSubmit;
console.log(`TodoForm(): this.handleFormSubmit:`, typeof this.handleFormSubmit);
		this.addTodo = props.addTodo;
		// this.inputValueText = props.inputValueText;
		this.inputTextRef=props.inputTextRef;
		} // end constructor



	// --------------------------------------------------------------------------
	// Colt does NOT use (e) on his submit
	// ALSO: he put state handling in TodoForm, not TodoApp: WTF?
	handleFormSubmitX(e) {
		e.preventDefault();

		console.log(`this.state.inputValue: ${this.state.inputValue}`);

		// Skip zero-length, empty strings:
		if (this.state.inputValue.length > 0) {
			// Add the item to the DB:
			this.addTodo( this.state.inputValue);
			// this.setState( {inputValue: ''});
			}
		this.setState( {inputValue: ''} );
		} // end handleFormSubmit





	// --------------------------------------------------------------------------
	handleInputChangeXXX(e) {
		this.setState({
			inputValue: e.target.value
			}); // end setState
		} // end handleInputChange


	// --------------------------------------------------------------------------
	render() {
		return (
			<div>
				<form
					onSubmit={ () => {
						this.handleFormSubmit();
						this.inputTextField.value('');
						return true;
						}
//, this.inputTextRef.current.value('?D?D?')
//, () => ( this.setState( {inputValue: '!_!'}))
//,							() => ( console.log('TodoForm() formSubmit callback') )
						}

					>
					<input
						type="text"
//						value={this.inputValueText}
						placeholder="Enter new Todo item"
						onChange={this.handleInputChange}
						id='inputTextField'
						ref={this.inputTextRef}
						/>
					<button onClick={this.handleFormSubmit
//,							() => (this.setState( {inputValue: '__!!__'}) )
//,							() => ( console.log('TodoForm() buttonClick callback') )
						}>Add Todo</button>
				</form>
			</div>
			); // end return
		} // end render


	} // end TodoForm


export default TodoForm;

