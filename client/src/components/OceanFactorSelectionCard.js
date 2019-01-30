import React from 'react';
import { oceanFactorData } from '../data/oceanFactorData';
import { getFacetListByFactor } from '../utils';


const stylesFacetName = {
	display: 'inline-block',
	width: '142px',
	textAlign: 'center'
};

const stylesFacetText = {
	width: '30px'
};

class OceanFactorSelectionCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleSelectFactor = this.handleSelectFactor.bind(this);
	}
	
	handleSelectFactor(event) {
		this.props.handleSelectFactor(event.target.value, this.props.index);
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
				
				{/*this.props.facetList.length > 0 && this.props.facetList.map((facet, index) => (
					<div key={facet.name}>
						<input type='text' value={facet.min} style={stylesFacetText} />
						<span style={stylesFacetName}>{facet.name}</span>
						<input type='text' value={facet.max} style={stylesFacetText} />
					</div>
				))*/}
			</div>
		);
	}
}

export default OceanFactorSelectionCard;