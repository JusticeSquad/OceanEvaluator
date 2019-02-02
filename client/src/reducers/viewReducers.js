import {
	ACTION_TYPE_VIEW,
	ACTION_VIEW
} from '../actions/viewActions';

export const reducerViewList = (state=[], action) => {
	switch( action.type )
	{
		case ACTION_TYPE_VIEW.SET_PROJECT_SELECT:
			return [ACTION_VIEW.PROJECT_SELECT];
		case ACTION_TYPE_VIEW.SET_PROJECT_OVERVIEW:
			return [ACTION_VIEW.PROJECT_OVERVIEW];
		case ACTION_TYPE_VIEW.ADD_FEATURE_LIST:
			return state.concat(ACTION_VIEW.FEATURE_LIST);
		case ACTION_TYPE_VIEW.ADD_FORM_ADD_FEATURE:
			return state.concat(ACTION_VIEW.FORM_ADD_FEATURE);
		default:
			return state;
	}
};