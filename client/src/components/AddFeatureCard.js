import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import OceanFactorSelectionCard from './OceanFactorSelectionCard';
import { actionAddFeature } from '../actions/featureActions';
import { oceanFactorData } from '../data/oceanFactorData';
import { getFacetListByFactor } from '../utils';


const stylesAddFeatureCardContainer = {
	display: 'inline-block',
	border: '1px solid black',
	borderRadius: '10px',
	marginLeft: '10px',
	padding: '10px',
	verticalAlign: 'top'
}

class AddFeatureCard extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			name: '',
			description: '',
			factorList: [],
			submitDisabled: false
		};
		
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleAddOceanFactor = this.handleAddOceanFactor.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelectFactor = this.handleSelectFactor.bind(this);
		this.handleFacetMinChange = this.handleFacetMinChange.bind(this);
		this.renderOceanFactorSelectionCard = this.renderOceanFactorSelectionCard.bind(this);
	}
	
	/** Input Handlers *******************************************************/
	handleChangeName(event) {
		this.setState({ name: event.target.value });
	}
	
	handleChangeDescription(event) {
		this.setState({ description: event.target.value });
	}
	
	handleAddOceanFactor() {
		let newFactor = { name: '', facetList: [] };
		let newFactorList = this.state.factorList;
		
		newFactorList.push(newFactor);
		
		this.setState({
			factorList: newFactorList
		});
	}
	
	clearForm() {
		this.setState({
			name: '',
			description: '',
			factorList: [],
			submitDisabled: false
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		this.setState({ submitDisabled: true });
		
		axios.post('/addFeature', {
			name: this.state.name,
			projectId: this.props.selectedProjectId,
			description: this.state.description,
			facetList: [] //this.state.facetList
		}).then((res) => {
			this.props.dispatch(actionAddFeature(res.data));
			this.clearForm();
			this.setState({ submitDisabled: false });
		}).catch((error) => {
			console.log(error.response);
			this.setState({ submitDisabled: false });
		});
	}
	/*************************************************************************/
	
	/** Ocean Factor Input Handling ******************************************/
	handleSelectFactor(factorName, index) {
		let newFactorList = this.state.factorList;
		let newFacetList = [];
		const oceanFacetList = getFacetListByFactor(factorName);
		newFactorList[index].name = factorName;
		
		for( var facet of oceanFacetList )
		{
			const newFacet = {
				name: facet.name,
				min: 0,
				max: 0
			};
			
			newFacetList.push(newFacet);
		}
		
		newFactorList[index].facetList = newFacetList;
		
		this.setState({ factorList: newFactorList });
	}
	
	handleFacetMinChange(factorIndex, facetIndex, facetMinValue) {
		let newFactorList = this.state.factorList;
		
		const newValue = parseInt(facetMinValue, 10);
		
		newFactorList[factorIndex].facetList[facetIndex].min =
			!isNaN(newValue) ? newValue : 0;
		
		this.setState({ factorList: newFactorList });
	}
	
	renderOceanFactorSelectionCard(factor, index) {
		return <OceanFactorSelectionCard key={`ocean-factor-select${index}`}
			factorName={factor.name}
			facetList={factor.facetList}
			index={index}
			handleSelectFactor={this.handleSelectFactor}
			handleFacetMinChange={this.handleFacetMinChange} />
	}
	/*************************************************************************/
	
	componentDidUpdate() {
		console.log('********************');
		console.log(this.state);
		console.log('********************');
	}
	
	render() {
		return (
			<div style={stylesAddFeatureCardContainer}>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Feature Name:</label>
						<input type='text'
							value={this.state.name}
							onChange={this.handleChangeName}
							disabled={this.state.submitDisabled}
							placeholder='Enter Feature Name' />
					</div>
					
					<div>
						<label>Description:</label>
						<input type='textarea'
							value={this.state.description}
							onChange={this.handleChangeDescription}
							disabled={this.state.submitDisabled}
							placeholder='Enter Feature Description' />
					</div>
					
					<div>
						<input type='button' value='Add Ocean Factor'
							onClick={this.handleAddOceanFactor}
							disabled={this.state.factorList.length === oceanFactorData.length}/>
					</div>
					
					{this.state.factorList.length > 0 && this.state.factorList.map(this.renderOceanFactorSelectionCard)}
					
					<div>
						<input type='submit' value='Save Feature' disabled={this.state.submitDisabled} />
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(AddFeatureCard);