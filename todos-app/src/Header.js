// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './Header.css';



// class Header extends Component {
// Converted to functional component:
function Header(props) {

	return (
		<header className="header">
			<h1><a href='/'>{props.appName}</a></h1>
			<nav>
			<ul>
				<li><a href='http://10.60.42.5:3003'>Todo App ReactJS</a></li>
				<li><a href='http://10.60.42.5:3001'>Memory Game</a></li>
				<li><a href='http://10.60.42.5:3000'>Flag Game</a></li>
				<li><a href='http://10.60.42.5:8123'>Todo App Node.js</a></li>
				<li><a href='mailto:ron@ronaldbarnes.ca?subject=ReactJS'>Contact Us</a></li>
			</ul>
			</nav>
		</header>
		); // end return
	} // end Header

export default Header;

