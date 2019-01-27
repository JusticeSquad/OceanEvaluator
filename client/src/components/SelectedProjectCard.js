import React from 'react';
import OceanFactorCard from './OceanFactorCard';


const stylesSelectProjectCardContainer = {
	display: 'inline-block',
	verticalAlign: 'top',
	width: '400px',
	marginLeft: '20px',
	padding: '10px',
	border: '1px solid black',
	borderRadius: '10px'
}

const testData = [
	{
		name: 'Openness to Experiences',
		facetList: [
			{
				name: 'Fantasy',
				min: -20,
				max: 60
			},
			{
				name: 'Aesthetics',
				min: -80,
				max: 40
			},
			{
				name: 'Feelings',
				min: -100,
				max: 0
			},
			{
				name: 'Actions',
				min: -40,
				max: 100
			},
			{
				name: 'Ideas',
				min: -60,
				max: 20
			},
			{
				name: 'Values',
				min: -60,
				max: 80
			}
		]
	},
	{
		name: 'Conscientiousness',
		facetList: [
			{
				name: 'Competence',
				min: -20,
				max: 60
			},
			{
				name: 'Order',
				min: -80,
				max: 40
			},
			{
				name: 'Dutifulness',
				min: -100,
				max: 0
			},
			{
				name: 'Achievement Striving',
				min: -40,
				max: 100
			},
			{
				name: 'Self-discipline',
				min: -60,
				max: 20
			},
			{
				name: 'Deliberation',
				min: -60,
				max: 80
			}
		]
	}
];

class SelectedProjectCard extends React.Component {
	render() {
		return (
			<div style={stylesSelectProjectCardContainer}>
				<h2>Selected Project</h2>
				
				<form>
					<input type='button' value='Add New Feature' />
					<input type='button' value='View All Features' />
				</form>
				
				{testData.map((data, index) => (
					<OceanFactorCard key={index} name={data.name} facetList={data.facetList} />
				))}
			</div>
		);
	}
}

export default SelectedProjectCard;