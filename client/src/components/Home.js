import React from 'react';
import { connect } from 'react-redux';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';
import { styleData } from '../data/styleData';


class Home extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleLinkProjectList = this.handleLinkProjectList.bind(this);
	}
	
	handleLinkProjectList() {
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.SET_PROJECT_SELECT));
	}
	
	render() {
		return (
			<div>
				<h1>Welcome to OCEAN Evaluator!</h1>
				
				<h4>What is OCEAN Evaluator?</h4>
				<p>
					OCEAN Evaluator is a tool for analyzing your project in terms of the psychological motivations it fulfills. This project is based on the OCEAN model and Jason Vandenberghe's Domains of Play work. You will likely want to be familiar with these before using OCEAN Evaluator.
				</p>
				
				<h4>How do I use OCEAN Evaluator?</h4>
				<p>
					OCEAN Evaluator breaks your project down into a set of features. Each feature is marked with scores in different OCEAN facets, representing the way they appeal to their audience. Once a project has features added to it, the main project card shows the full evaluation of OCEAN facets based on the scores of all features.
				</p>
				
				<input type='button'
					value='Click here to get started!'
					style={styleData.buttonToLink}
					onClick={this.handleLinkProjectList} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(Home);