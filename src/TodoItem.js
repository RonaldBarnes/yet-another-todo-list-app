
import React from 'react';



// const TodoItem = (props) => (
const TodoItem = ({_id, name, completed, onClick, onDelete, className}) => (
/*
	constructor(props) {
		super(props);
		}
*/
/*
console.log(`TodoItems() id: ${_id}, name: ${name}, completed: ${completed},`
	+ ` handleToggleCompleted: ${onClick},`
	+ ` className: ${className}`),
*/
// 	console.log( `TodoItem() props:`, props);
/*
	const handleToggleCompleted = props.handleToggleCompleted;
	const completedTrueFalse = props.completed ? 'true' : 'false';
console.log( `completedTrueFalse: ${completedTrueFalse}`,
	typeof completedTrueFalse);
*/
//	return (
		<li><span
			// Some of these attributes are placed on TodoItem in TodoApp:
			// BUT, they do NOT work there.
			// NOTE: key= is required to be set in TodoItem inside TodoApp!
			// NOTE: className= ONLY works on BOTH <li> and <TodoItem />
			// NOTE: title= ONLY works on <li>
			className={className}
			title={name}
			id={_id}

/*
			key={props._id}
			id={props._id}
			onClick={props.handleToggleCompleted}
*/
/*
			_id={props._id}
			title={props.name + " TodoItem"}
			completed={props.completed}

			{...props}
			onClick={handleToggleCompleted}
*/
			onClick={onClick}
			>
				{name}</span>
<span
	style={{float: 'right'}}
	onClick={onDelete}
	> X </span>
		</li>
//		); // end return
//	} // end TodoItem
	) // end TodoItem











export default TodoItem;
