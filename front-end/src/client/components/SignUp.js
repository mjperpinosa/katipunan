import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import bg from '../../assets/bg.png';
import { SIGN_UP } from './Helper';

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		const data = await SIGN_UP(event);
		console.log(data);
	}

	render() {
		return (
			<div className="container">
				<div className="bg-floater" style={{ backgroundImage: 'url(' + bg + ')' }}></div>
				<div className="row justify-content-md-center align-items-center h-100">
					<div className="col-md-4">
						<form method="POST" onSubmit={this.handleSubmit} className="login-form">
							<h2>Sign Up</h2>
							<div className="form-wrapper">
								<div className="field-header">Last Name</div>
								<input type="text" placeholder="Last Name" id="lastname" name="fname" />
								<div className="field-header">First Name</div>
								<input type="text" placeholder="First Name" id="firstname" name="lname" />
								<div className="field-header">Username</div>
								<input type="text" placeholder="Username" id="username" name="username" />
								<div className="field-header">Password</div>
								<input type="text" placeholder="Password" id="password" name="password" />
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
	// windowHeight: state.windowHeight,
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		// WINDOW_RESIZE,
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

