import React from 'react';


const stylesFacetName = {
	display: 'inline-block',
	width: '142px',
	textAlign: 'center'
};

const stylesFacetText = {
	width: '30px'
};

class OceanFacetEditPanel extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleFacetMinChange = this.handleFacetMinChange.bind(this);
		this.handleFacetMaxChange = this.handleFacetMaxChange.bind(this);
	}
	
	handleFacetMinChange(event) {
		this.props.handleFacetMinChange(event.target.value, this.props.index);
	}
	
	handleFacetMaxChange(event) {
	}
	
	render() {
		return (
			<div>
				<input type='text'
					value={this.props.facet.min}
					style={stylesFacetText}
					onChange={this.handleFacetMinChange} />
				<span style={stylesFacetName}>{this.props.facet.name}</span>
				<input type='text'
					value={this.props.facet.max}
					style={stylesFacetText}
					onChange={this.handleFacetMaxChange} />
			</div>
		);
	}
}

export default OceanFacetEditPanel;