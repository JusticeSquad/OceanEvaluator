import React from 'react';
import { connect } from 'react-redux';
import {
	ACTION_TYPE_VIEW,
	actionViewChange
} from '../actions/viewActions';
import { styleData } from '../data/styleData';


const stylesHeaderMain = {
	backgroundColor: styleData.colorPallette.mainBrand,
	color: styleData.colorPallette.lightShade,
	
	padding: '20px'
};

const stylesHeaderTitle = {
	display: 'inline-block'
};

const stylesHeaderMenuContainer = {
	display: 'inline-block',
	fontSize: '1.5em',
	marginLeft: '65px'
};

const stylesHeaderMenuListMain = {
	listStyle: 'none',
	padding: '0'
};

const stylesHeaderMenuListItem = {
	display: 'inline-block',
	marginLeft: '35px'
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
		return (
			<div className='ocean-eval-header' style={stylesHeaderMain}>
				<h1 style={stylesHeaderTitle}>OCEAN Evaluator</h1>
				
				<div style={stylesHeaderMenuContainer}>
					<ul style={stylesHeaderMenuListMain}>
						<li style={stylesHeaderMenuListItem}>
							<input type='button'
								value='Home'
								style={Object.assign(
									{},
									styleData.buttonToLink,
									{color: styleData.colorPallette.lightShade})}
								onClick={this.handleLinkHome} />
						</li>
						<li style={stylesHeaderMenuListItem}>
							<input type='button'
								value='View Projects'
								style={Object.assign(
									{},
									styleData.buttonToLink,
									{color: styleData.colorPallette.lightShade})}
								onClick={this.handleLinkProjectList} />
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(Header);