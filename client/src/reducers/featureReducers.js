import {
	ACTION_TYPE_FEATURE
} from '../actions/featureActions';


export const reducerFeatureList = (state={
	featureList: [],
	projectId: null,
	isRequesting: false,
	didInvalidate: false,
	lastUpdated: null
}, action) => {
	switch( action.type )
	{
		case ACTION_TYPE_FEATURE.REQUEST_LIST:
			return Object.assign({}, state, {
				isRequesting: true,
				didInvalidate: false
			});
		case ACTION_TYPE_FEATURE.RECEIVE_LIST:
			return Object.assign({}, state, {
				featureList: action.featureList,
				projectId: action.projectId,
				isRequesting: false,
				didInvalidate: false,
				lastUpdated: action.receivedAt
			});
		case ACTION_TYPE_FEATURE.INVALIDATE:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case ACTION_TYPE_FEATURE.ADD:
			return Object.assign({}, state, {
				featureList: state.featureList.concat(action.feature)
			});
		default:
			return state;
	}
};