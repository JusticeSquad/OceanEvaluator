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

export const getFactorByFacet = (facetName) => {
	for( var oceanFactor of oceanFactorData )
	{
		for( var facet of oceanFactor.facetList )
		{
			if( facet.name === facetName )
				return oceanFactor;
		}
	}
	
	return null;
};

export const getFactorListFromFacetList = (facetList) => {
	let finalFactorList = [];
	
	for( var facet of facetList )
	{
		// Get factor for the current facet
		const oceanFactor = getFactorByFacet(facet.name);
		
		// If a factor isn't found, skip this facet
		if( oceanFactor === null )
			continue;
		
		// Find factor in list
		let finalFactor = null;
		for( var factor of finalFactorList )
		{
			if( factor.name === oceanFactor.name )
			{
				finalFactor = factor;
			}
		}
		
		// If the factor wasn't found, make this factor entry
		if( finalFactor === null )
		{
			finalFactor = Object.assign({}, oceanFactor, { facetList: [] });
			finalFactorList.push(finalFactor);
		}
		
		// Add facet data to factor
		finalFactor.facetList.push(facet);
	}
	
	return finalFactorList;
};