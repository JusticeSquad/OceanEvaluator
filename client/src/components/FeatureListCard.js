import React from 'react';
import OceanFactorCard from './OceanFactorCard';


const testData = [
	{
		name: 'Manga Style / Coloring',
		description: 'In addition manga-style card art, the game space looks like a manga-style world come to life.',
		oceanDataList: [
			{
				factor: 'Openness to Experience',
				facetList: [
					{
						name: 'Fantasy',
						min: 0,
						max: 100
					},
					{
						name: 'Aesthetics',
						min: 0,
						max: 100
					}
				]
			}
		]
	},
	{
		name: 'Training Cards',
		description: 'Characters can choose to train and increase their power instead of fighting on a turn. Striking the right balance is key to a winning strategy.',
		oceanDataList: [
/*			{
				factor: 'Openness to Experience',
				facet: 'Fantasy',
				min: null,
				max: 40
			},
			{
				factor: 'Conscientiousness',
				facet: 'Competence',
				min: -40,
				max: 60
			},
			{
				factor: 'Conscientiousness',
				facet: 'Achievement Striving',
				min: -40,
				max: 80
			}*/
			{
				factor: 'Openness to Experience',
				facetList: [
					{
						name: 'Fantasy',
						min: 0,
						max: 40
					}
				]
			},
			{
				factor: 'Conscientiousness',
				facetList: [
					{
						name: 'Competence',
						min: -40,
						max: 60
					},
					{
						name: 'Achievement Striving',
						min: -40,
						max: 80
					}
				]
			}
		]
	}
];

const stylesFeatureListCardContainer = {
	display: 'inline-block',
	marginLeft: '20px',
	border: '1px solid black',
	borderRadius: '10px',
	padding: '20px'
}

const stylesFeatureCard = {
	border: '1px solid black',
	borderRadius: '10px',
	padding: '10px',
	maxWidth: '400px'
}

class FeatureListCard extends React.Component {
	render() {
		return (
			<div style={stylesFeatureListCardContainer}>
				<h2>Features</h2>
				
				{testData.map((data, index) => (
					<div key={`${data.name}`} style={stylesFeatureCard}>
						<div>{data.name}</div>
						<div>{data.description}</div>
						
						{data.oceanDataList.map((oceanData, index) => (
							<OceanFactorCard key={`${index}`} name={oceanData.factor} facetList={oceanData.facetList} />
						))}
					</div>
				))}
			</div>
		);
	}
}

export default FeatureListCard;