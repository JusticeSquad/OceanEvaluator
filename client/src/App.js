import React from 'react';
import Header from './components/Header';
import ProjectListPanel from './components/ProjectListPanel';

const stylesMainContainer = {
	padding: '20px'
}

class App extends React.Component {
	render() {
		return (
			<div className="ocean-eval-main-container">
				<Header />
				
				<div style={stylesMainContainer}>
					<ProjectListPanel />
				</div>
			</div>
		);
	}
}

export default App;