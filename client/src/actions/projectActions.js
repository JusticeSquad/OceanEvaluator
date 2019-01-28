import axios from 'axios';


export const ACTION_TYPE_PROJECT_LIST = {
	REQUEST: 'PROJECT_REQUEST',
	RECEIVE: 'PROJECT_RECEIVE',
	INVALIDATE: 'PROJECT_INVALIDATE',
	SELECT: 'PROJECT_SELECT'
};

export const actionRequestProjectList = () => ({
	type: ACTION_TYPE_PROJECT_LIST.REQUEST
});

export const actionReceiveProjectList = (projectList) => ({
	type: ACTION_TYPE_PROJECT_LIST.RECEIVE,
	projectList,
	receivedAt: Date.now()
});

export const actionInvalidateProjectList = () => ({
	type: ACTION_TYPE_PROJECT_LIST.INVALIDATE
});

export const actionSelectProject = (project) => ({
	type: ACTION_TYPE_PROJECT_LIST.SELECT,
	selectedProjectId: project._id
})

function getProjectList() {
	return dispatch => {
		dispatch(actionRequestProjectList());
		
		return axios.get('/projectList').then((res) => {
			dispatch(actionReceiveProjectList(res.data));
		});
	}
};

function shouldRequestProjectList(state) {
	const projectListData = state.projectListData;
	const projectList = projectListData.projectList;
	
	if( projectList === null || projectList.length === 0 )
	{
		return true;
	}
	
	if( projectListData.isRequesting )
	{
		return false;
	}
	else
	{
		return projectListData.didInvalidate;
	}
};

export function requestProjectList() {
	return (dispatch, getState) => {
		if( shouldRequestProjectList(getState()) )
		{
			return dispatch( getProjectList() );
		}
	}
};