/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
	MapContainer,
	TileLayer,
	Popup,
	Tooltip,
	Marker,
	LayersControl,
	GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import data from "./data/annapurna_poi.json";
import geojson_data from "./geojson_data/annapurna_geojson";
import ringroad_geojson_data from "./geojson_data/annapurna_ringroad";
import trekking_geojson_data from "./geojson_data/annapurna_trekking";

// Institution Filter Item
const institution = [
	{
		id: 1,
		name: "पर्यटकिय स्थल",
		value: "पर्यटकिय स्थल",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632937658/map_markers/tourism_marker_h8gtrc.png",
	},
	{
		id: 2,
		name: "शैक्षिक",
		value: "शैक्षिक",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632936915/map_markers/education_marker_b7uqcm.png",
	},
	{
		id: 3,
		name: "वडा कार्यालय",
		value: "वडा कार्यालय",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632937576/map_markers/ward_office_marker_hvup18.png",
	},
	{
		id: 4,
		name: "व्यापारिक केन्द्र",
		value: "व्यापारिक केन्द्र",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632937908/map_markers/business_marker_l2szhp.png",
	},
	{
		id: 5,
		name: "स्वास्थ्य सेवा",
		value: "स्वास्थ्य सेवा",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632937415/map_markers/health_marker_pruvii.png",
	},
	{
		id: 6,
		name: "बैंक",
		value: "बैंक",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632938110/map_markers/bank_marker_chg0tx.png",
	},
	{
		id: 7,
		name: "धार्मिक स्थल",
		value: "धार्मिक स्थल",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632938208/map_markers/religious_marker_yjcgvr.png",
	},
	{
		id: 8,
		name: "सुरक्षा इकाई",
		value: "सुरक्षा इकाई",
		icon: "https://res.cloudinary.com/haami/image/upload/v1632938325/map_markers/security_marker_pibiaf.png",
	},
];

export default function Map() {
	const [selected, setSelected] = useState([]);
	const [wardSelected, setWardSelected] = useState("");
	const [dataItem, setDataItem] = useState([]);
	const [trekkingSelected, setTrekkingSelected] = useState(false);
	const [ringRoadSelected, setRingRoadSelected] = useState(false);

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

	const trekkingPolyStyle = (feature) => {
		return {
			color: "yellow", //Outline color
		};
	};

	const ringRoadPolyStyle = (feature) => {
		return {
			color: "red", //Outline color
		};
	};

	const handleToggleTrekking = () => {
		setTrekkingSelected(!trekkingSelected);
	};

	const handleToggleRingRoad = () => {
		setRingRoadSelected(!ringRoadSelected);
	};

	return (
		<div className="main-content">
			{/* Filter section */}
			<div className="top-bar">
				<div className="flex item-center flex-wrap">
					<div className="mb-8">
						<span>नक्शा मार्ग</span>
						<div className="checkbox-content">
							<span
								onClick={handleToggleTrekking}
								className={
									trekkingSelected ? "active cursor-pointer" : "cursor-pointer"
								}
							>
								<span className="w-16">पदयात्रा मार्ग</span>
								<i
									className="inlne-block ml-3 w-5"
									style={{
										background: "yellow",
										height: "2px",
									}}
								></i>
							</span>
							<span
								onClick={handleToggleRingRoad}
								className={
									ringRoadSelected ? "active cursor-pointer" : "cursor-pointer"
								}
							>
								<span className="w-16">रिंगरोड मार्ग</span>
								<i
									className="inlne-block ml-3 w-5"
									style={{
										background: "red",
										height: "2px",
									}}
								></i>
							</span>
						</div>
					</div>
					<span className="mb-2 inline-block">वार्ड छनौट गर्नुहोस्</span>

					<select
						name="ward_select"
						id="ward_select"
						value={wardSelected}
						onChange={onChangeWard}
					>
						<option
							value="कृपया वार्ड फिल्टर गर्नुहोस्"
						>
							कृपया वार्ड फिल्टर गर्नुहोस
						</option>
						<option value="All">सबै</option>
						{[...Array(10)].map((ward, index) => (
							<option key={index + 1} value={index + 1}>
								{index + 1}
							</option>
						))}
					</select>
				</div>

				<div className="checkbox-content">
					{/* <span
						onClick={() => handleTypeSelection("All")}
						className={isActiveClass("All") ? "active" : ""}
					>
						All
					</span> */}
					{institution.map((value, index) => (
						<span
							key={index}
							onClick={() => handleTypeSelection(value.name)}
							className={isActiveClass(value.name) ? "active" : ""}
						>
							<img
								className="mr-2"
								style={{ height: 24 }}
								src={value.icon}
								alt={value.name}
							/>
							{value.name}
						</span>
					))}
				</div>
			</div>

			{/* Leaflet Map */}
			<MapContainer center={[28.4208056, 83.8102555]} zoom={11}>
				<GeoJSON
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					data={geojson_data}
				/>

				{ringRoadSelected ? (
					<GeoJSON
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						data={ringroad_geojson_data}
						style={ringRoadPolyStyle}
					/>
				) : (
					""
				)}

				{trekkingSelected ? (
					<GeoJSON
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						data={trekking_geojson_data}
						style={trekkingPolyStyle}
					/>
				) : (
					""
				)}

				<LayersControl position="bottomright">
					<LayersControl.BaseLayer checked name="OSM">
						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Satellite View">
						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png"
							subdomains={["otile1", "otile2", "otile3", "otile4"]}
						/>
					</LayersControl.BaseLayer>
				</LayersControl>
				{dataItem.map((list, index) => {
					const icon = new L.Icon({
						iconUrl: list.marker_icon,
						iconSize: [32, 32],
						shadowUrl: null,
						shadowSize: null,
						shadowAnchor: null,
					});

					return (
						<Marker key={index} position={[list.lat, list.long]} icon={icon}>
							<Popup>
								<div>
									<h2>{list.name}</h2>
									<p>
										वार्ड नं: <strong>{list.ward}</strong>
									</p>
									<p>
										प्रकार: <strong>{list.type}</strong>
									</p>
								</div>
							</Popup>
							<Tooltip>
								<div>
									<h2>{list.name}</h2>
									<p>
										वार्ड नं: <strong>{list.ward}</strong>
									</p>
									<p>
										प्रकार: <strong>{list.type}</strong>
									</p>
								</div>
							</Tooltip>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}
