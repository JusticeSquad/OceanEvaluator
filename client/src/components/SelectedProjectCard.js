import React from 'react';
import { connect } from 'react-redux';
import OceanFactorCard from './OceanFactorCard';
import * as utils from '../utils';
import { oceanFactorData } from '../data/oceanFactorData';

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
	render() {
		const project = utils.getProjectById(this.props.projectListData.projectList, this.props.selectedProjectId);
		const projectName = (project !== undefined && project !== null) ? project.name : null;
		
		return (
			<div style={stylesSelectProjectCardContainer}>
				<h2>{projectName}</h2>
				
				<form>
					<input type='button' value='Add New Feature' />
					<input type='button' value='View All Features' />
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