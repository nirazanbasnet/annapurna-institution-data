import Head from "next/head";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("./components/Map/Map"), {
	ssr: false,
});

export default function Home() {
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
