import React from 'react';
import { connect } from 'react-redux';
import { requestProjectList } from '../actions/projectActions';

class ProjectListPanel extends React.Component {
	componentDidMount() {
		this.props.dispatch(requestProjectList());
	}
	
	render() {
		return (
			<div>
				<h2>Projects</h2>
				
				<ul>
					{this.props.projectListData.projectList.map((project, index) => (
						<li key={`ocean-eval-project-${index}`}>{project.name}</li>
					))}
				</ul>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(ProjectListPanel);