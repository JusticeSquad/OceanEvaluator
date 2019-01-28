import {
	ACTION_TYPE_PROJECT_LIST
} from '../actions/projectActions';


export const reducerProjectList = (state={
	projectList: [],
	isRequesting: false,
	didInvalidate: false,
	lastUpdated: null
}, action) => {
	switch( action.type )
	{
		case ACTION_TYPE_PROJECT_LIST.REQUEST:
			return Object.assign({}, state, {
				isRequesting: true,
				didInvalidate: false
			});
		case ACTION_TYPE_PROJECT_LIST.RECEIVE:
			return Object.assign({}, state, {
				projectList: action.projectList,
				isRequesting: false,
				didInvalidate: false
			});
		case ACTION_TYPE_PROJECT_LIST.INVALIDATE:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		default:
			return state;
	}
};

export const reducerSelectProject = (state=null, action) => {
	switch( action.type )
	{
		case ACTION_TYPE_PROJECT_LIST.SELECT:
			return action.selectedProjectId;
		default: return state;
	}
};