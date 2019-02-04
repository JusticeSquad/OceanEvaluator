import React from 'react';
import { connect } from 'react-redux';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';
import OceanFactorCard from './OceanFactorCard';
import { getFactorListByFacetList } from '../utils';


const stylesFeatureListCardContainer = {
	display: 'inline-block',
	marginLeft: '20px',
	border: '1px solid black',
	borderRadius: '10px',
	padding: '20px'
}

const stylesFeatureCard = {
	border: '1px solid black',
	borderRadius: '10px',
	padding: '10px',
	maxWidth: '400px'
}

const stylesFeatureListCardCloseButton = {
	float: 'right'
}

class FeatureListCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClose = this.handleClose.bind(this);
	}
	
	handleClose() {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.REMOVE_FEATURE_LIST));
	}
	
	render() {
		return (
			<div style={stylesFeatureListCardContainer}>
				<input type='button' value='Close'
					style={stylesFeatureListCardCloseButton}
					onClick={this.handleClose} />
				
				<h2>Features</h2>
				
				{this.props.featureListData.featureList.length > 0 &&
					this.props.featureListData.featureList.map((feature, index) => (
					<div key={`${feature.name}`} style={stylesFeatureCard}>
						<h4>{feature.name}</h4>
						<div>{feature.description}</div>
						
						{getFactorListByFacetList(feature.facetList).map((oceanFactor, index) => (
							<OceanFactorCard key={`${index}`} name={oceanFactor.name} facetList={oceanFactor.facetList} />
						))}
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(FeatureListCard);