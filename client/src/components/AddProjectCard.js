import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { actionAddProject } from '../actions/projectActions';


const stylesAddProjectCardContainer = {
	display: 'inline-block',
	marginLeft: '20px',
	border: '1px solid black',
	borderRadius: '10px',
	padding: '20px'
}

class AddProjectCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { name: '', description: '', submitDisabled: false };
		
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChangeName(event) {
		this.setState({ name: event.target.value });
	}
	
	handleChangeDescription(event) {
		this.setState({ description: event.target.value });
	}
	
	clearForm() {
		this.setState({ name: '', description: '' });
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		this.setState({ submitDisabled: true });
		
		console.log(this.state);
		
		axios.post('/addProject', {
			name: this.state.name,
			description: this.state.description
		}).then((res) => {
			console.log(res);
			this.props.dispatch(actionAddProject(res.data));
			this.setState({ submitDisabled: false });
		}).catch((error) => {
			this.setState({ submitDisabled: false });
		})
	}
	
	render() {
		return (
			<div style={stylesAddProjectCardContainer}>
				<h2>Add New Project</h2>
				
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Name:</label>
						<input type='text'
							value={this.state.name}
							onChange={this.handleChangeName}
							disabled={this.state.submitDisabled}
							placeholder='Enter Project Name' />
					</div>
					
					<div>
						<label>Description:</label>
						<input type='textarea'
							value={this.state.description}
							onChange={this.handleChangeDescription}
							disabled={this.state.submitDisabled}
							placeholder='Enter Project Description' />
					</div>
					
					<input type='submit' value='Submit' disabled={this.state.submitDisabled} />
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(AddProjectCard);