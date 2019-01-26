import React from 'react';

/*const headerMenuList = [
	{
		name: 'Home',
		path: '/'
	},
	{
		name: 'Projects',
		path: '/projects'
	}
];*/

const stylesHeaderMain = {
	backgroundColor: '#675c8c',
	color: '#e5e6e7',
	
	padding: '20px'
};

class Header extends React.Component {
	render() {
		return (
			<div className='ocean-eval-header' style={stylesHeaderMain}>
				<h1>OCEAN Evaluator</h1>
			</div>
		);
	}
}

export default Header;