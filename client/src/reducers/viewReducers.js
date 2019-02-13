import {
	ACTION_TYPE_VIEW,
	ACTION_VIEW
} from '../actions/viewActions';

export const reducerViewList = (state=[], action) => {
	switch( action.type )
	{
		case ACTION_TYPE_VIEW.SET_HOME:
			return [ACTION_VIEW.HOME];
		
		case ACTION_TYPE_VIEW.SET_PROJECT_SELECT:
			return [ACTION_VIEW.PROJECT_SELECT];
		case ACTION_TYPE_VIEW.ADD_FORM_ADD_PROJECT:
			return !state.find(view => view === ACTION_VIEW.FORM_ADD_PROJECT) ?
				state.concat(ACTION_VIEW.FORM_ADD_PROJECT) :
				state;
		case ACTION_TYPE_VIEW.REMOVE_FORM_ADD_PROJECT:
			return state.filter(view => view !== ACTION_VIEW.FORM_ADD_PROJECT);
		
		case ACTION_TYPE_VIEW.SET_PROJECT_OVERVIEW:
			return [ACTION_VIEW.PROJECT_OVERVIEW];
		case ACTION_TYPE_VIEW.ADD_FEATURE_LIST:
			return !state.find(view => view === ACTION_VIEW.FEATURE_LIST) ?
				state.concat(ACTION_VIEW.FEATURE_LIST) :
				state;
		case ACTION_TYPE_VIEW.REMOVE_FEATURE_LIST:
			return state.filter(view => view !== ACTION_VIEW.FEATURE_LIST);
		case ACTION_TYPE_VIEW.ADD_FORM_ADD_FEATURE:
			return !state.find(view => view === ACTION_VIEW.FORM_ADD_FEATURE) ?
				state.concat(ACTION_VIEW.FORM_ADD_FEATURE) :
				state;
		case ACTION_TYPE_VIEW.REMOVE_FORM_ADD_FEATURE:
			return state.filter(view => view !== ACTION_VIEW.FORM_ADD_FEATURE);
		
		default:
			return state;
	}
};