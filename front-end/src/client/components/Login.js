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
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;
		// if(!(Object.keys(user).length === 0 && user.constructor === Object))
		// 	return this.props.history.push('/');
	}

	async handleSubmit(event) {
		const data = await SIGN_IN(event);

		if(data.message === 'unsuccessful')
			return alert("incorrect username or password");

		const user = JSON.parse(data.account)[0].fields;
		// console.log(JSON.stringify(data.account, 0, 2));
		// console.log(JSON.stringify(data.profile, 0, 2));
		this.props.LOGIN(user);
		if(user.account_type === 1)
			this.props.history.push('/');
		else
			this.props.history.push('/employee');
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

