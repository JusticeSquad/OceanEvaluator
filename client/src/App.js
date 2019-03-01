import React from 'react';
import { connect } from 'react-redux';
import {
	createMuiTheme,
	MuiThemeProvider
} from '@material-ui/core/styles';
import {
	ACTION_TYPE_VIEW,
	ACTION_VIEW,
	actionViewChange
} from './actions/viewActions';
import Header from './components/Header';
import Home from './components/Home';
import ProjectListCard from './components/ProjectListCard';
import AddProjectCard from './components/AddProjectCard';
import SelectedProjectCard from './components/SelectedProjectCard';
import FeatureListCard from './components/FeatureListCard';
import AddFeatureCard from './components/AddFeatureCard';
import { styleData } from './data/styleData';

const theme = createMuiTheme(styleData.muiTheme);

const stylesMainContainer = {
	padding: '20px'
}

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.props.dispatch(actionViewChange(ACTION_TYPE_VIEW.SET_HOME));
	}
	
	renderView(view, index) {
		const keyName = `ocean-eval-view-component-${index}`;
		
		switch(view)
		{
			case ACTION_VIEW.HOME:
				return <Home key={keyName} />
			case ACTION_VIEW.PROJECT_SELECT:
				return <ProjectListCard key={keyName} />
			case ACTION_VIEW.FORM_ADD_PROJECT:
				return <AddProjectCard key={keyName} />
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
			<MuiThemeProvider theme={theme}>
				<Header />
				
				<div style={stylesMainContainer}>
					{this.props.viewList.map(this.renderView)}
				</div>
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(App);