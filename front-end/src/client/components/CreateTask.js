import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Navigations from './Navigations';

class CreateTask extends Component {
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
							<h2 className="page-header">Create Task</h2>
							<form className="form-create-project">
								<div className="form-label">Task Title</div>
								<input type="text"/>
								<div className="form-label">Task Description</div>
								<textarea name="pdescription" id="" cols="30" rows="10"></textarea>
								<button type="submit">Create Task</button>
							</form>
						</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

