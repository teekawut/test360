import React, { Component } from 'react';
import TableMovie from "./TableMovie";
import FormAddMovie from "./FormAddMovie";
import {BrowserRouter as Router} from "react-router-dom";
import Route from "react-router-dom/Route"
import './App.css';

class App extends Component {
  	render() {
		return (
		<Router>
			<div>
				<Route exact strict path='/' render={
				() => {
					return (
						<TableMovie/>
					);
				}
				}/>
				<Route exact strict path='/form' render={
				() => {
					return (
						<FormAddMovie/>
					);
				}
				}/>
			</div>  
		</Router>
		);
  	}
}

export default App;
