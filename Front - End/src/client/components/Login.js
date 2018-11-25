import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import bg from '../../assets/bg.png';

class Login extends Component {
	render() {
		return (
			<div className="container">
				<div className="bg-floater" style={{ backgroundImage: 'url(' + bg + ')' }}></div>
				<div className="row justify-content-md-center align-items-center h-100">
					<div className="col-md-4">
						<form className="login-form">
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
	// windowHeight: state.windowHeight,
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		// WINDOW_RESIZE,
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

