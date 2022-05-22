
import React from 'react';


// Functional component, not react component (because small & simple):
const TodoList = (props) => {
	const todoList = props.list;
console.log( `props:`, props);

	const handleItemClick = props.handleItemClick;


	const todoListItems = todoList.map( (value,idx) => {
		let addClasses = '';

		if ( value.completed ) {
			addClasses += ' completed';
			}
// Barfs on completed={true|false}:
// Warning: Received `true` for a non-boolean attribute `completed`.

		return (<li
							key={value._id}
							id={value._id}
							title={value.name}
							className={addClasses}
							onClick={handleItemClick}
							{...value}
							completed={`${completed}`}
							>
				{value.name}
			</li>
			);
		}); // end map

	return (
		<div>
			{todoListItems}
		</div>
		); // end return
	} // end TodoList

export default TodoList;
