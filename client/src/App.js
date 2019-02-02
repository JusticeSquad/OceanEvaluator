import React from 'react';
import { connect } from 'react-redux';
import {
	ACTION_TYPE_VIEW,
	ACTION_VIEW,
	actionViewChange
} from './actions/viewActions';
import Header from './components/Header';
import ProjectListCard from './components/ProjectListCard';
import SelectedProjectCard from './components/SelectedProjectCard';
import FeatureListCard from './components/FeatureListCard';
import AddFeatureCard from './components/AddFeatureCard';

const stylesMainContainer = {
	padding: '20px'
}

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.SET_PROJECT_SELECT));
	}
	
	renderView(view, index) {
		const keyName = `ocean-eval-view-component-${index}`;
		
		switch(view)
		{
			case ACTION_VIEW.PROJECT_SELECT:
				return <ProjectListCard key={keyName} />
			case ACTION_VIEW.PROJECT_OVERVIEW:
				return <SelectedProjectCard key={keyName} />
			case ACTION_VIEW.FEATURE_LIST:
				return <FeatureListCard key={keyName} />
			case ACTION_VIEW.FORM_ADD_FEATURE:
				return <AddFeatureCard key={keyName} />
			default:
				return null;
		}
	}
	
	render() {
		return (
			<div className="ocean-eval-main-container">
				<Header />
				
				<div style={stylesMainContainer}>
					{this.props.viewList.map(this.renderView)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(App);