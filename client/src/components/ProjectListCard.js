import React from 'react';
import { connect } from 'react-redux';
import {
	actionSelectProject,
	requestProjectList
} from '../actions/projectActions';


const stylesProjectCardContainer = {
	display: 'inline-block',
	verticalAlign: 'top',
	width: '250px',
	padding: '10px',
	border: '1px solid black',
	borderRadius: '10px'
};

class ProjectListCard extends React.Component {
	componentDidMount() {
		this.props.dispatch(requestProjectList());
	}
	
	handleClick(project) {
		this.props.dispatch(actionSelectProject(project));
	}
	
	render() {
		return (
			<div style={stylesProjectCardContainer}>
				<h2>Projects</h2>
				
				<form>
					<input type='button' value='Add New Project' />
				</form>
				
				<ul>
					{this.props.projectListData.projectList.map((project, index) => (
						<li key={`ocean-eval-project-${project._id}`}>
							<a href='#' onClick={this.handleClick.bind(this, project)}>{project.name}</a>
						</li>
					))}
				</ul>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(ProjectListCard);