import React, { Component } from 'react';
import './app.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/mysass.sass';
import '../css/style.sass';
// import $ from 'jquery';
// import popper from 'popper';
// import 'bootstrap/dist/css/bootstrap.min.css';

/* eslint-disable no-underscore-dangle */
const store = createStore(reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
	// console.log(store.getState());
});


export default class App extends Component {
	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	fetch('/api/getUsername')
	// 		.then(res => res.json())
	// 		.then(user => this.setState({ username: user.username }));
	// }

	render() {
		return (
			<Provider store={store}>
				<Home />
			</Provider>
		);
	}
}
