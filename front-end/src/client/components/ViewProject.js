import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Navigations from './Navigations';
import { FETCH_PROJECTS, VIEW_RPOJECT } from './Helper';
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
		};
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		const data = await VIEW_RPOJECT(id);
		this.setState({
			project: {
				title: data.title,
				description: data.description
			},
			tasks: data.tasks
		});
	}

	render() {
		const { id } = this.props.match.params;
		return (
			<div id="dashboard">
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
									{this.state.project.title}
								</div>
								<div className="task-description">
									{this.state.project.description}
								</div>
							</div>
							<br />
							<h2 className="page-header">View Tasks</h2>
							<div className="project-task-lists">
								{this.state.tasks.map((item, key) => {
									const priority = parseInt(item.priority_points);
									return (
										<div key={key} className="project-task">
											<div className="project-task-name">{item.task}</div>
											<div className="project-task-deadline">Deadline: {item.deadline}</div>
											<div className={`pry priority-${priority}`}>
												{
													item.priority_points === 1 ? 'low' :
														item.priority_points === 2 ? 'medium' : 'high'
												}
											</div>
											<div className={`project-task-status pts-${item.status}`}>
												{item.status === 0 ? 'back log' : 'finished' }
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

