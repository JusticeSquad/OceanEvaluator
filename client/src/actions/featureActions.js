import axios from 'axios';


export const ACTION_TYPE_FEATURE = {
	REQUEST_LIST: 'REQUEST_FEATURE_LIST',
	RECEIVE_LIST: 'RECEIVE_FEATURE_LIST',
	ADD: 'FEATURE_ADD'
};


export const actionRequestFeatureListByProject = (projectId) => ({
	type: ACTION_TYPE_FEATURE.REQUEST_LIST
});

export const actionReceiveFeatureListByProject = (featureList, projectId) => ({
	type: ACTION_TYPE_FEATURE.RECEIVE_LIST,
	featureList,
	projectId,
	receivedAt: Date.now()
});

export const actionInvalidateFeatureList = () => ({
	type: ACTION_TYPE_FEATURE.INVALIDATE
});

export const actionAddFeature = (feature) => ({
	type: ACTION_TYPE_FEATURE.ADD,
	feature
});


function getFeatureList(projectId) {
	return dispatch => {
		dispatch(actionRequestFeatureListByProject(projectId));
		
		return axios.get(`/featureList/${projectId}`).then((res) => {
			dispatch(actionReceiveFeatureListByProject(
				res.data.featureList,
				res.data.projectId));
		});
	}
};

function shouldRequestFeatureList(state, projectId) {
	const featureListData = state.featureListData;
	const featureList = featureListData.featureList;
	
	if( projectId !== featureListData.projectId )
	{
		return true;
	}
	
	if( featureList === null || featureList.length === 0 )
	{
		return true;
	}
	
	if( featureListData.isRequesting )
	{
		return false;
	}
	else
	{
		return featureListData.didInvalidate;
	}
};

export function requestFeatureList(projectId) {
	return (dispatch, getState) => {
		if( shouldRequestFeatureList(getState(), projectId) )
		{
			return dispatch( getFeatureList(projectId) );
		}
	}
};