export const getProjectById = (projectList, projectId) => {
	if( projectList === undefined || projectList === null )
		return null;
	
	for( let i = 0; i < projectList.length; i++ )
	{
		if( projectList[i]._id === projectId )
			return projectList[i];
	}
	
	return null;
};