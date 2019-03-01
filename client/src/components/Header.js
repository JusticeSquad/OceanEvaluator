import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';
import { styleData } from '../data/styleData';


const styles = {
	root: {
		flexGrow: 1
	},
	headerTitle: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

class Header extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleLinkHome = this.handleLinkHome.bind(this);
		this.handleLinkProjectList = this.handleLinkProjectList.bind(this);
	}
	
	handleLinkHome() {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.SET_HOME));
	}
	
	handleLinkProjectList() {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.SET_PROJECT_SELECT));
	}
	
	render() {
		const { classes } = this.props;
		
		return (
			<AppBar position='static' className={classes.root}>
				<Toolbar>
					<Typography variant='h6'
						color='inherit'
						className={classes.headerTitle}>
						OCEAN Evaluator
					</Typography>
					<IconButton color='inherit'
						className={classes.menuButton}
						onClick={this.handleLinkHome}>
						<Icon>home</Icon>
					</IconButton>
					<IconButton color='inherit'
						className={classes.menuButton}
						onClick={this.handleLinkProjectList}>
						<Icon>library_books</Icon>
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default withStyles(styles)(connect(mapStateToProps)(Header));