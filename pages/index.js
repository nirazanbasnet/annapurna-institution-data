import Head from "next/head";
import dynamic from "next/dynamic";

export default function Home() {
	const MapWithNoSSR = dynamic(() => import("../components/Map/Map"), {
		ssr: false,
	});

	return (
		<div>
			<Head>
				<title>Annapurna Municipality Institution Map</title>
				<meta
					name="description"
					content="Annapurna Municipality Institution Map"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.17/tailwind.min.css"
					integrity="sha512-yXagpXH0ulYCN8G/Wl7GK+XIpdnkh5fGHM5rOzG8Kb9Is5Ua8nZWRx5/RaKypcbSHc56mQe0GBG0HQIGTmd8bw=="
					crossOrigin="anonymous"
					referrerpolicy="no-referrer"
				/>
			</Head>

			<main>
				<header>
					<h2>Annapurna Municipality Institution Data</h2>
				</header>
				<MapWithNoSSR />
			</main>
		</div>
	);
}
