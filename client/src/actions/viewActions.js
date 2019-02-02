export const ACTION_TYPE_VIEW = {
	SET_PROJECT_SELECT: 'VIEW_SET_PROJECT_SELECT',
	SET_PROJECT_OVERVIEW: 'VIEW_SET_PROJECT_OVERVIEW',
	
	ADD_FORM_ADD_PROJECT: 'ADD_FORM_ADD_PROJECT',
	ADD_FEATURE_LIST: 'ADD_FEATURE_LIST',
	ADD_FORM_ADD_FEATURE: 'ADD_FORM_ADD_FEATURE'
};

export const ACTION_VIEW = {
	PROJECT_SELECT: 'PROJECT_SELECT',
	FORM_ADD_PROJECT: 'FORM_ADD_PROJECT',
	
	PROJECT_OVERVIEW: 'PROJECT_OVERVIEW',
	FEATURE_LIST: 'FEATURE_LIST',
	FORM_ADD_FEATURE: 'FORM_ADD_PROJECT'
};

export const actionViewChange = (viewCommand) => ({
	type: viewCommand
});