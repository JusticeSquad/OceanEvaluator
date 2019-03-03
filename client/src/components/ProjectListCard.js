import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
	actionSelectProject,
	requestProjectList
} from '../actions/projectActions';
import { requestFeatureList } from '../actions/featureActions';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';
import { styleData } from '../data/styleData';


const stylesProjectCardContainer = {
	display: 'inline-block',
	verticalAlign: 'top',
	width: '250px',
	padding: '10px',
	border: '1px solid black',
	borderRadius: '10px'
};

const styles = {
	root: {
		padding: '10px'
	}
};

class ProjectListCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClickAddNewProject = this.handleClickAddNewProject.bind(this);
	}
	
	componentDidMount() {
		this.props.dispatch(requestProjectList());
	}
	
	handleClickAddNewProject() {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.ADD_FORM_ADD_PROJECT));
	}
	
	handleClick(project) {
		this.props.dispatch(actionSelectProject(project));
		this.props.dispatch(requestFeatureList(project._id));
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.SET_PROJECT_OVERVIEW));
	}
	
	render() {
		const { classes } = this.props;
		
		return (
			<Grid item xs={12} sm={4}>
				<Paper className={classes.root}>
					<Typography variant={styleData.typographyVariantTitle}>
						Projects
					</Typography>
					
					<form>
						<Button color='primary'
							variant='contained'
							onClick={this.handleClickAddNewProject}>
							Add New Project
						</Button>
					</form>
					
					<List>
						{this.props.projectListData.projectList.map((project, index) => (
							<ListItem key={`ocean-eval-project-${project._id}`}
								button
								onClick={this.handleClick.bind(this, project)}>
								<ListItemText primary={project.name} />
							</ListItem>
						))}
					</List>
				</Paper>
			</Grid>
		);
	}
};

const mapStateToProps = state => ({
	...state
});

export default withStyles(styles)(connect(mapStateToProps)(ProjectListCard));