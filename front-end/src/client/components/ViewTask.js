import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navigations from './Navigations';

const tasks = [
	{
		title: 'Pass the study material',
		description: 'You need to create an doc for the material then'
	},{
		title: 'Pass the study material',
		description: 'You need to create an doc for the material then'
	},
];

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
						<h2 className="page-header">View Tasks</h2>
						<div className="no-page-widget">
							{tasks.map((item, key) => {
								return (
									<div key={key}>
										<div className="task-list">
											<div className="task-title">{item.title}</div>
											<div className="task-description">
												{item.description}
											</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

