import React from 'react';
import { connect } from 'react-redux';
import OceanFactorCard from './OceanFactorCard';
import { getFactorListFromFacetList } from '../utils';


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

class FeatureListCard extends React.Component {
	render() {
		return (
			<div style={stylesFeatureListCardContainer}>
				<h2>Features</h2>
				
				{this.props.featureListData.featureList.length > 0 &&
					this.props.featureListData.featureList.map((feature, index) => (
					<div key={`${feature.name}`} style={stylesFeatureCard}>
						<h4>{feature.name}</h4>
						<div>{feature.description}</div>
						
						{getFactorListFromFacetList(feature.facetList).map((oceanFactor, index) => (
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