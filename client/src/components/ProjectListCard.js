import React from 'react';
import { connect } from 'react-redux';
import {
	actionSelectProject,
	requestProjectList
} from '../actions/projectActions';
import { requestFeatureList } from '../actions/featureActions';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';


const stylesProjectCardContainer = {
	display: 'inline-block',
	verticalAlign: 'top',
	width: '250px',
	padding: '10px',
	border: '1px solid black',
	borderRadius: '10px'
};

class ProjectListCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClickAddNewProject = this.handleClickAddNewProject.bind(this);
	}
	
	componentDidMount() {
		this.props.dispatch(requestProjectList());
	}
	
	handleClickAddNewProject() {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.ADD_FORM_ADD_PROJECT));
	}
	
	handleClick(project) {
		this.props.dispatch(actionSelectProject(project));
		this.props.dispatch(requestFeatureList(project._id));
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.SET_PROJECT_OVERVIEW));
	}
	
	render() {
		return (
			<div style={stylesProjectCardContainer}>
				<h2>Projects</h2>
				
				<form>
					<input type='button' value='Add New Project' onClick={this.handleClickAddNewProject} />
				</form>
				
				<ul>
					{this.props.projectListData.projectList.map((project, index) => (
						<li key={`ocean-eval-project-${project._id}`}>
							<input type='button' onClick={this.handleClick.bind(this, project)} value={project.name} />
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