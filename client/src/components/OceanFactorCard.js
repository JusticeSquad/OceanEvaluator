import React from 'react';


const stylesOceanFactorCardContainer = {
	border: '1px solid black',
	borderRadius: '10px',
	padding: '10px'
}

const stylesFacetMin = {
	display: 'inline-block',
	width: '100px',
	textAlign: 'right'
}

const stylesFacetName = {
	display: 'inline-block',
	width: '150px',
	textAlign: 'center'
}

const stylesFacetMax = {
	display: 'inline-block',
	width: '100px'
}

class OceanFactorCard extends React.Component {
	render() {
		return (
			<div style={stylesOceanFactorCardContainer}>
				<h4>{this.props.name}</h4>
				
				{this.props.facetList.map((facet, index) => (
					<div key={`${index}`}>
						<div style={stylesFacetMin}>{facet.min}</div>
						<div style={stylesFacetName}>{facet.name}</div>
						<div style={stylesFacetMax}>{facet.max}</div>
					</div>
				))}
			</div>
		);
	}
}

export default OceanFactorCard;