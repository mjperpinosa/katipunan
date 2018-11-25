import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Navigations from './Navigations';

const GET_PROJECTS = 'http://192.168.43.15:8000/api/get_projects';

class ViewProjects extends Component {
	constructor(props){
		super(props);
		this.state = {
			projects: [],
		};
	}
	async componentDidMount() {
		await fetch(GET_PROJECTS,
			{
				headers: {
					'Accept': 'application/json',
      		'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(response => this.setState({ projects: response.projects }));
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
							<h2 className="page-header">View Projects</h2>
							{this.state.projects.map((item, key) => {
								console.log(item);
								return (
									<div className="task-list" key={key}>
										<div className="task-title">{item.name}</div>
										<div className="task-description">
											{item.description}
										</div>
									</div>
								);
							})}
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

