import React from 'react';
import { oceanFactorData } from '../data/oceanFactorData';


class OceanFactorSelectionCard extends React.Component {
	render() {
		return (
			<div>
				<select>
					<option value=''>-- Select a Factor --</option>
					{oceanFactorData.map((oceanFactor, index) => (
						<option key={`${oceanFactor.name}`} value={`${oceanFactor.name}`}>{oceanFactor.name}</option>
					))}
				</select>
			</div>
		);
	}
}

export default OceanFactorSelectionCard;