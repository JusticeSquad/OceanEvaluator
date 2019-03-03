import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { actionAddProject } from '../actions/projectActions';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';
import { styleData } from '../data/styleData';


const styles = {
	closeButton: {
		float: 'right'
	}
}

const stylesAddProjectCardCloseButton = {
	float: 'right'
}

class AddProjectCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { name: '', description: '', submitDisabled: false };
		
		this.handleClose = this.handleClose.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleClose() {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.REMOVE_FORM_ADD_PROJECT));
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
		const { classes } = this.props;
		
		return (
			<Grid item xs={12} sm={3}>
				<Paper>
					<Fab color='secondary'
						className={classes.closeButton}
						size='small'
						onClick={this.handleClose}>
						<Icon>clear</Icon>
					</Fab>
					
					<Typography variant={styleData.typographyVariantTitle}>
						Add New Project
					</Typography>
					
					<form onSubmit={this.handleSubmit}>
						<p>
							<TextField
								label='Name'
								value={this.state.name}
								onChange={this.handleChangeName}
								disabled={this.state.submitDisabled}/>
						</p>
						
						<p>
							<TextField
								label='Description'
								value={this.state.description}
								onChange={this.handleChangeDescription}
								disabled={this.state.submitDisabled}/>
						</p>
						
						<Button variant='contained'
							color='primary'
							disabled={this.state.submitDisabled}>
							Submit
						</Button>
					</form>
				</Paper>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default withStyles(styles)(connect(mapStateToProps)(AddProjectCard));