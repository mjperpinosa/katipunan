import React, { Component } from 'react';
import './app.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/mysass.sass';
import '../css/style.sass';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './configureStore.js';
// import $ from 'jquery';
// import popper from 'popper';
// import 'bootstrap/dist/css/bootstrap.min.css';

/* eslint-disable no-underscore-dangle */

store.subscribe(() => {
	// console.log(store.getState());
});


export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Home />
				</PersistGate>
			</Provider>
		);
	}
}
