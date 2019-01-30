import { oceanFactorData } from './data/oceanFactorData';


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

export const getFacetListByFactor = (factorName) => {
	for( var oceanFactor of oceanFactorData )
	{
		if( oceanFactor.name === factorName )
		{
			return oceanFactor.facetList;
		}
	}
	
	return [];
};