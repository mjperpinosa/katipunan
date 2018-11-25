import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import bg from '../../assets/bg.png';
import { SIGN_IN } from './Helper';
import { LOGIN } from '../actions';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="bg-floater" style={{ backgroundImage: 'url(' + bg + ')' }}></div>
				<div className="row justify-content-md-center align-items-center h-100">
					<div className="col-md-4">
						<form method="GET" onSubmit={this.handleSubmit} className="login-form">
							<h2>Login</h2>
							<div className="form-wrapper">
								<div className="field-header">Username</div>
								<input type="text" placeholder="Username" id="username" />
								<div className="field-header">Password</div>
								<input type="text" placeholder="Password" id="password" />
								<p style={{ textAlign: 'center', marginTop: '10px' }}><a href="#">Forgot Password</a></p>
								<button type="submit">LOGIN</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		LOGIN,
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

