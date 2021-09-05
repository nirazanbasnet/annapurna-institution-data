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
];

export default function Map() {
	const [selected, setSelected] = useState([]);
	const [dataItem, setDataItem] = useState(data);

	useEffect(() => {
		if (selected.length === 0 || selected.includes("All")) {
			setDataItem(data);
		} else {
			const filteredData = data.filter((item) => selected.includes(item.type));
			setDataItem(filteredData);
		}
	}, [selected]);

	//Filter Function
	const filter = (button) => {
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
				<span
					onClick={() => filter("All")}
					className={isActiveClass("All") ? "active" : ""}
				>
					All
				</span>
				{institution.map((value, index) => (
					<span
						key={index}
						onClick={() => filter(value.name)}
						className={isActiveClass(value.name) ? "active" : ""}
					>
						{value.name}
					</span>
				))}
			</div>

			{/* Leaflet Map */}
			<MapContainer
				center={[28.394857, 84.124008]}
				zoom={10}
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
