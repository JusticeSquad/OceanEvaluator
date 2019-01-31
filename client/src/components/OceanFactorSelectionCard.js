import React from 'react';
import OceanFacetEditPanel from './OceanFacetEditPanel';
import { oceanFactorData } from '../data/oceanFactorData';


class OceanFactorSelectionCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleSelectFactor = this.handleSelectFactor.bind(this);
		this.handleFacetChange = this.handleFacetChange.bind(this);
		this.renderFacet = this.renderFacet.bind(this);
	}
	
	handleSelectFactor(event) {
		this.props.handleSelectFactor(event.target.value, this.props.index);
	}
	
	handleFacetChange(facetIndex, facetMinValue, facetMaxValue) {
		this.props.handleFacetChange(this.props.index, facetIndex, facetMinValue, facetMaxValue);
	}
	
	renderFacet(facet, index) {
		return <OceanFacetEditPanel key={`ocean-facet-edit-${index}`}
			facet={facet}
			index={index}
			handleFacetChange={this.handleFacetChange} />;
	}
	
	render() {
		return (
			<div>
				<select value={this.props.factorName} onChange={this.handleSelectFactor}>
					<option value=''>-- Select a Factor --</option>
					{oceanFactorData.map((oceanFactor, index) => (
						<option key={`${oceanFactor.name}`} value={`${oceanFactor.name}`}>{oceanFactor.name}</option>
					))}
				</select>
				
				{this.props.facetList.length > 0 && this.props.facetList.map(this.renderFacet)}
			</div>
		);
	}
}

export default OceanFactorSelectionCard;