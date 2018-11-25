import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Navigations from './Navigations';
import { CREATE_TASK } from './Helper';

class CreateTask extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		const { id } = this.props.match.params;
		const data = await CREATE_TASK(event, id);
		window.location = `/view-project/${id}`;
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
							<h2 className="page-header">Create Task</h2>
							<form onSubmit={this.handleSubmit} className="form-create-project">
								<div className="form-label">Description</div>
								<textarea name="task" id="" cols="30" rows="10"></textarea>
								<div className="form-label">Deadline</div>
								<input type="date" name="deadline" />
								<div className="form-label">Priority</div>
								<select name="priority">
									<option value="1">Low</option>
									<option value="2">Medium</option>
									<option value="3">High</option>
								</select>
								<br />
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

