import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Navigations from './Navigations';
import { FETCH_USER_TASKS, CHANGE_STATUS } from '../components/Helper';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
		};
	}

	async componentDidMount() {
		const data = await FETCH_USER_TASKS(this.props.user.profile);
		this.setState({ tasks: data.tasks });
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
							<h2 className="page-header">Tasks List</h2>
							<div className="project-task-lists">
								{this.state.tasks.map((item, key) => {
									const priority = parseInt(item.priority_points);
									return (
										<div key={key} className="project-task">
											<div className="project-task-name">{item.task}</div>
											<div className="project-task-deadline">Deadline: {item.deadline}</div>
											<span>Priority: </span>
											<div className={`pry priority-${priority}`}>
												{
													item.priority_points === 1 ? 'low' :
														item.priority_points === 2 ? 'medium' : 'high'
												}
											</div>
											<br />
											<span>Status: {
												item.status === 0 ? 'Todo' :
													item.status === 1 ? 'In-Progress' : 'Done'
											}</span>
											<br />
											<div className="emp-ts emp-ts-0 project-task-status pts-0" onClick={async () => {
												const data = await CHANGE_STATUS(0, item.id);
												window.location = 'http://localhost:3000/employee';
												console.log(data);
											}}>
												Todo
											</div>
											<div className="emp-ts-1 emp-ts project-task-status pts-0" onClick={async () => {
												const data = await CHANGE_STATUS(1, item.id);
												window.location = 'http://localhost:3000/employee';
												console.log(data);
											}}>
												In-progress
											</div>
											<div className="emp-ts-2 emp-ts project-task-status pts-0" onClick={async () => {
												const data = await CHANGE_STATUS(2, item.id);
												window.location = 'http://localhost:3000/employee';
												console.log(data);
											}}>
												Done
											</div>
										</div>
									);
								})}
							</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);

