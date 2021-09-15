import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import data from "./map_data.json";

// Institution Filter Item
const institution = [
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
	{
		id: 4,
		name: "व्यापारिक केन्द्र",
		value: "व्यापारिक केन्द्र",
	},
	{
		id: 5,
		name: "स्वास्थ्य सेवा",
		value: "स्वास्थ्य सेवा",
	},
	{
		id: 6,
		name: "बैंक",
		value: "बैंक",
	},
	{
		id: 7,
		name: "धार्मिक स्थल",
		value: "धार्मिक स्थल",
	},
	{
		id: 8,
		name: "सुरक्षा इकाई",
		value: "सुरक्षा इकाई",
	},
];

export default function Map() {
	const [selected, setSelected] = useState([]);
	const [wardSelected, setWardSelected] = useState("All");
	const [dataItem, setDataItem] = useState(data);

	useEffect(() => {
		filter(selected, wardSelected);
	}, [selected, wardSelected]);

	const onChangeWard = (e) => {
		setWardSelected(e.target.value);
	};

	const filter = (selectedType, selectedWard) => {
		let filtered = data;

		if (selectedType.length && !selectedType.includes("All")) {
			filtered = filtered.filter((item) => selectedType.includes(item.type));
		}

		if (selectedWard !== "All") {
			filtered = filtered.filter(
				(item) => parseInt(selectedWard) === item.ward
			);
		}

		setDataItem(filtered);
	};

	//Filter Function
	const handleTypeSelection = (button) => {
		if (button === "All" && !selected.includes("All")) {
			return setSelected(["All"]);
		}

		const prev = [...selected];

		if (selected.includes("All")) {
			prev.splice(prev.indexOf("All"), 1);
		}

		const index = prev.indexOf(button);

		if (index !== -1) {
			prev.splice(index, 1);
			return setSelected(prev);
		}

		prev.push(button);

		return setSelected(prev);
	};

	// Active Class
	const isActiveClass = (type) => {
		return selected.includes(type);
	};

	return (
		<div className="main-content">
			{/* Filter section */}
			<div className="top-bar">
				<div className="flex item-center flex-wrap">
					<span className="mb-2 inline-block">वार्ड छनौट गर्नुहोस्</span>

					<select
						name="ward_select"
						id="ward_select"
						value={wardSelected}
						onChange={onChangeWard}
					>
						<option value="All">All</option>
						{[...Array(10)].map((ward, index) => (
							<option key={index + 1} value={index + 1}>
								{index + 1}
							</option>
						))}
					</select>
				</div>

				<div className="checkbox-content">
					<span
						onClick={() => handleTypeSelection("All")}
						className={isActiveClass("All") ? "active" : ""}
					>
						All
					</span>
					{institution.map((value, index) => (
						<span
							key={index}
							onClick={() => handleTypeSelection(value.name)}
							className={isActiveClass(value.name) ? "active" : ""}
						>
							{value.name}
						</span>
					))}
				</div>
			</div>

			{/* Leaflet Map */}
			<MapContainer
				center={[28.29268262, 83.8238525]}
				zoom={12}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{dataItem.map((list, index) => (
					<Marker key={index} position={[list.lat, list.long]}>
						<Popup>
							<div>
								<h2>{list.name}</h2>
								<p>Ward no: {list.ward}</p>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
