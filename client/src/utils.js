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
				return JSON.parse(JSON.stringify(oceanFactor));
		}
	}
	
	return null;
};

export const getFactorListByFacetList = (facetList) => {
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
				finalFactor = JSON.parse(JSON.stringify(factor));
			}
		}
		
		// If the factor wasn't found, make this factor entry
		if( finalFactor === null )
		{
			finalFactor = JSON.parse(JSON.stringify(oceanFactor));
			finalFactor.facetList = [];
			finalFactorList.push(finalFactor);
		}
		
		// Add facet data to factor
		finalFactor.facetList.push(facet);
	}
	
	return finalFactorList;
};

export const getEvaluatedOceanListByFeatureList = (featureList) => {
	let aggregatedOceanFactorList = []; // The list of all facet values, grouped together
	let evaluatedOceanFactorList = []; // The list of all facet values, evaluated
	
	
	for( var feature of featureList)
	{
		// Get the factor list from the feature
		const factorList = getFactorListByFacetList(feature.facetList);
		
		// Add the factor data to the aggregatedOceanFactorList
		for( var factor of factorList )
		{
			let foundMatchFactor = false;
			for( var aggFactor of aggregatedOceanFactorList )
			{
				if( aggFactor.name === factor.name )
				{
					// Find the matching facet within the aggFactor
					for( var facet of factor.facetList )
					{
						let foundMatchFacet = false;
						for( var aggFacet of aggFactor.facetList )
						{
							// If a matching facet is found,
							// add its relevant data to the aggFacet
							if( aggFacet.name === facet.name )
							{
								if( facet.min !== 0 )
									aggFacet.min.push(facet.min);
								if( facet.max !== 0 )
									aggFacet.max.push(facet.max);
								
								foundMatchFacet = true;
								break;
							}
						}
						
						if( !foundMatchFacet )
						{
							let newFacet = JSON.parse(JSON.stringify(facet));
							newFacet.min = [newFacet.min];
							newFacet.max = [newFacet.max];
							
							aggFactor.facetList.push(newFacet);
						}
					}
					
					foundMatchFactor = true;
					break;
				}
			}
			
			// If no match was already found for this factor,
			// add the factor with the facet values as the first
			// entry in an array of values.
			if( !foundMatchFactor )
			{
				let newFactor = JSON.parse(JSON.stringify(factor));
				for( var newFacet of newFactor.facetList )
				{
					newFacet.min = [newFacet.min];
					newFacet.max = [newFacet.max];
				}
				aggregatedOceanFactorList.push(newFactor);
			}
		}
	}
	
	for( var oceanFactor of oceanFactorData )
	{
		// Add the main factor data.
		let evalOceanFactor = JSON.parse(JSON.stringify(oceanFactor));
		
		// Find the matching aggregated factor, if it exists.
		let aggFactorMatch = null;
		for( var aggFactor2 of aggregatedOceanFactorList )
		{
			if( aggFactor2.name === evalOceanFactor.name )
			{
				aggFactorMatch = JSON.parse(JSON.stringify(aggFactor2));
				break;
			}
		}
		
		// If no data exists for this factor, default all facet values to 0
		if( aggFactorMatch === null )
		{
			for( var evalOceanFacet of evalOceanFactor.facetList )
			{
				evalOceanFacet.min = 0;
				evalOceanFacet.max = 0;
			}
			evaluatedOceanFactorList.push(evalOceanFactor);
			continue;
		}
		
		// For each facet, find any facets with data and evaluate them.
		for( var evalOceanFacet of evalOceanFactor.facetList )
		{
			let foundMatchFacet2 = false;
			for( var aggFacet2 of aggFactorMatch.facetList )
			{
				if( evalOceanFacet.name === aggFacet2.name )
				{
					evalOceanFacet.min = Math.max(...aggFacet2.min);
					evalOceanFacet.max = Math.max(...aggFacet2.max);
					
					foundMatchFacet2 = true;
					break;
				}
			}
			
			if( !foundMatchFacet2 )
			{
				evalOceanFacet.min = 0;
				evalOceanFacet.max = 0;
			}
		}
		
		// Add the evaluated ocean factor to the list.
		evaluatedOceanFactorList.push(evalOceanFactor);
	}
	
//	return aggregatedOceanFactorList;
	return evaluatedOceanFactorList;
};