import React from 'react';
import Header from './components/Header';
import ProjectListCard from './components/ProjectListCard';
import SelectedProjectCard from './components/SelectedProjectCard';
import FeatureListCard from './components/FeatureListCard';
import AddFeatureCard from './components/AddFeatureCard';

const stylesMainContainer = {
	padding: '20px'
}

class App extends React.Component {
	render() {
		return (
			<div className="ocean-eval-main-container">
				<Header />
				
				<div style={stylesMainContainer}>
					<ProjectListCard />
					<SelectedProjectCard />
					<FeatureListCard />
					<AddFeatureCard />
				</div>
			</div>
		);
	}
}

export default App;