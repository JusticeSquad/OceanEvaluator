import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import OceanFactorSelectionCard from './OceanFactorSelectionCard';
import { actionAddFeature } from '../actions/featureActions';
import { oceanFactorData } from '../data/oceanFactorData';


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
		const sampleFactor = oceanFactorData[0];
		let newFactor = { name: '', facetList: [] };
		let newFactorList = this.state.factorList;
		
		for( var i = 0; i < sampleFactor.facetList.length; i++ )
		{
			const newFacet = {
				name: '',
				min: 0,
				max: 0
			};
			
			newFactor.facetList.push(newFacet);
		}
		
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
		console.log('new factor -> ', factorName);
		
		let newFactorList = this.state.factorList;
		newFactorList[index].name = factorName;
		
		this.setState({ factorList: newFactorList });
	}
	
	renderOceanFactorSelectionCard(factor, index) {
		return <OceanFactorSelectionCard key={index}
			factorName={factor.name}
			index={index}
			handleSelectFactor={this.handleSelectFactor} />
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
							onClick={this.handleAddOceanFactor} />
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