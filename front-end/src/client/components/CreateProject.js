import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Navigations from './Navigations';
import { CREATE_PROJECT } from './Helper';

class CreateProject extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		const data = await CREATE_PROJECT(event, this.props.user.profile);
		window.location = '/create-project';
	}

	render() {
		return (
			<div id="dashboard">
				<div className="left-content">
					<Navigations location={this.props.location} />
				</div>
				<div className="right-content">
					<div className="min-header"></div>
					<div className="right-inner-wrapper">
						<div className="page-widget">
							<h2 className="page-header">Create Project</h2>
							<form onSubmit={this.handleSubmit} method="GET" className="form-create-project">
								<div className="form-label">Project Title</div>
								<input type="text" name="title" />
								<div className="form-label">Project Description</div>
								<textarea name="description" id="" cols="30" rows="10"></textarea>
								<button type="submit">Create project</button>
							</form>
						</div>
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
		// WINDOW_RESIZE,
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

