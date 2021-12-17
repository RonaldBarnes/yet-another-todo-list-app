import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Header.css';


class Header extends Component {

	constructor( props ) {
		super( props );

		this.handleNewGameClick = this.props.handleNewGameClick;
		} // end constructor

	static propTypes = {
		handleNewGameClick: PropTypes.func.isRequired
		}

	render() {
		return (
			<header className="header">
				<h1><a href='/'>React Todo App</a></h1>
				<nav>
				<ul>
					<li><a href='http://10.60.42.5:3000'>Flag Game</a></li>
					<li><a href='http://10.60.42.5:3001'>Memory Game</a></li>
					<li><a href='http://10.60.42.5:8123'>Todo App Node.js</a></li>
					<li><a href='mailto:ron@ronaldbarnes.ca?subject=Memory Game in ReactJS'>Contact Us</a></li>
				</ul>
				</nav>
			</header>
			);
		}
	}

export default Header;

