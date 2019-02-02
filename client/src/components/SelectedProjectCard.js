import React from 'react';
import { connect } from 'react-redux';
import OceanFactorCard from './OceanFactorCard';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';
import * as utils from '../utils';

const stylesSelectProjectCardContainer = {
	display: 'inline-block',
	verticalAlign: 'top',
	width: '400px',
	marginLeft: '20px',
	padding: '10px',
	border: '1px solid black',
	borderRadius: '10px'
}

class SelectedProjectCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClickAddNewFeature = this.handleClickAddNewFeature.bind(this);
		this.handleClickViewAllFeatures = this.handleClickViewAllFeatures.bind(this);
	}
	
	handleClickAddNewFeature(event) {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.ADD_FORM_ADD_FEATURE));
	}
	
	handleClickViewAllFeatures(event) {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.ADD_FEATURE_LIST));
	}
	
	render() {
		const project = utils.getProjectById(this.props.projectListData.projectList, this.props.selectedProjectId);
		const projectName = (project !== undefined && project !== null) ? project.name : null;
		
		return (
			<div style={stylesSelectProjectCardContainer}>
				<h2>{projectName}</h2>
				
				<form>
					<input type='button' value='Add New Feature' onClick={this.handleClickAddNewFeature} />
					<input type='button' value='View All Features' onClick={this.handleClickViewAllFeatures} />
				</form>
				
				{utils.getEvaluatedOceanListByFeatureList(this.props.featureListData.featureList).map((factor, index) => (
					<OceanFactorCard key={index} name={factor.name} facetList={factor.facetList} />
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(SelectedProjectCard);