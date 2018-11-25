import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Navigations from './Navigations';
import { FETCH_PROJECTS } from './Helper';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ViewProjects extends Component {
	constructor(props){
		super(props);
		this.state = {
			projects: [],
		};
	}
	async componentDidMount() {
		const data = await FETCH_PROJECTS();
		this.setState({ projects: data.projects });
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
								return (
									<div className="task-list" key={key}>
										<div className="task-title"><Link to={`/view-project/${item.id}`} >{item.name}</Link></div>
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

