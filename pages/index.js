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
