import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import OceanFactorSelectionCard from './OceanFactorSelectionCard';
import { actionAddFeature } from '../actions/featureActions';


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
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		axios.post('/addFeature', {
			name: 'Test2 Feature',
			projectId: this.props.selectedProjectId,
			description: 'Test Description',
			facetList: [
				{
					name: 'Imagination',
					min: -80,
					max: 30
				},
				{
					name: 'Self-efficacy',
					min: -20,
					max: 60
				}
			]
		}).then((res) => {
			this.props.dispatch(actionAddFeature(res.data));
		}).catch((error) => {
			console.log(error.response);
		});
	}
	
	render() {
		return (
			<div style={stylesAddFeatureCardContainer}>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Feature Name:</label>
						<input type='text' />
					</div>
					
					<div>
						<label>Description:</label>
						<input type='textarea' />
					</div>
					
					<input type='button' value='Add Ocean Factor' />
					
					<OceanFactorSelectionCard />
					
					<input type='submit' value='Save Feature' />
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(AddFeatureCard);