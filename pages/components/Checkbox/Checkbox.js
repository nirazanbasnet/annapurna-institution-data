import React, { useState } from "react";

export default function Checkbox({ handleFilters }) {
	const [checked, setChecked] = useState([]);

	const filterList = [
		{
			id: 1,
			name: "पर्यटकिय स्थल",
			value: "पर्यटकिय स्थल",
		},
		{
			id: 2,
			name: "शैक्षिक",
			value: "शैक्षिक",
		},
		{
			id: 3,
			name: "वडा कार्यालय",
			value: "वडा कार्यालय",
		},
	];

	const handleToggle = (value) => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
		handleFilters(newChecked);
	};

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			{filterList.map((value, index) => (
				<div key={index} style={{ marginRight: "16px" }}>
					<input
						onChange={() => handleToggle(value.id)}
						checked={checked.indexOf(value.id) === -1 ? false : true }
						type="checkbox"
					/>
					<label htmlFor={value.name}>{value.name}</label>
				</div>
			))}
		</div>
	);
}
