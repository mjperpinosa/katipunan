import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Navigations from './Navigations';
import { FETCH_PROJECTS, VIEW_RPOJECT, ADD_EMPLOYEE } from './Helper';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ViewProjects extends Component {
	constructor(props){
		super(props);
		this.state = {
			project: {
				title: '',
				description: '',
			},
			tasks: [],
			employees: [],
			popup: false,
			taskID: 0,
			employeeID: 0,
			assignee_data: [],
		};

		this.empRef = React.createRef();

		this.popup = this.popup.bind(this);
		this.add_emp = this.add_emp.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		// this.handleAddEmployee = this.handleAddEmployee.bind(this);
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		const data = await VIEW_RPOJECT(id);
		console.log(data);
		this.setState({
			project: {
				title: data.title,
				description: data.description
			},
			tasks: data.tasks,
			employees: data.employees,
			employeeID: data.employees[0].id,
			assignee_data: data.assignee_data,
		});
	}

	async add_emp() {
		const { id } = this.props.match.params;
		const { taskID, employeeID } = this.state;
		const data = await ADD_EMPLOYEE(taskID, employeeID);
		window.location = `/view-project/${id}`;
	}

	handleSelect(event) {
		this.setState({
			employeeID: parseInt(event.target.value)
		});
	}

	popup() {
		return (
			<div className="popup">
				<div className="popup-box">
					<h2>Select employee</h2>
					<div className="close" onClick={() => this.setState({ popup: false })}>
						<i className="fa fa-window-close"></i>
					</div>
					<br />
					<div className="text-center">
						<p>Select employee for this task: </p>
						<select onChange={this.handleSelect}>
							{this.state.employees.map((item, key) => {
								return (
									<option key={key} value={item.id}>{item.first_name} {item.last_name}</option>
								);
							})}
						</select>
						<button className="btn-blue btn-blue-sm" type="submit" onClick={() => this.add_emp()}>select</button>
					</div>
				</div>
			</div>
		);
	}


	render() {
		const { id } = this.props.match.params;
		return (
			<div id="dashboard">
				{ this.state.popup ? this.popup() : null}
				<div className="left-content">
					<Navigations location={this.props.location} />
				</div>
				<div className="right-content">
					<div className="min-header"></div>
					<div className="right-inner-wrapper">
						<div className="page-widget">
							<h2 className="page-header">View Project</h2>
							<div className="task-list task-list-big">
								<div className="task-title">
									<b>{this.state.project.title}</b>
								</div>
								<div className="task-description">
									{this.state.project.description}
								</div>
							</div>
							<br />
							<h2 className="page-header">View Tasks</h2>
							<div className={this.state.tasks.length > 0 ? "project-task-lists" : ''}>
								{this.state.tasks.map((item, key) => {
									console.log('item', item);
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
											<span>Status: </span>
											<div className={`project-task-status pts-${item.status}`}>
												{item.status === 0 ? 'back log' : 'finished' }
											</div>
											<div className="lower-right">
												{
													item.assignee_id == null ?
														<button
															className="btn-blue btn-blue-md"
															onClick={() => this.setState({
																popup: true,
																taskID: item.id
															})}>Add Employee</button> :
														<div className="emp-lower-right">
															<i className="fa fa-user"></i> {this.state.assignee_data[key].name}
														</div>
												}
											</div>
										</div>
									);
								})}
							</div>
							<Link to={`/create-task/${id}`} className="btn-blue">Create task</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewProjects);

