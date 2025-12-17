import { TopMangaSlider } from "./components/slider";

import LatestUpdatedSection from "./components/sections/latestUpdatedSection";
import NavbarSection from "./components/sections/navbarSection";

export default function Home() {
	return (
		<main className="relative w-full overflow-auto">
			{/* Navbar Section */}
			<NavbarSection />
			{/* Top 10 Section */}
			<div className="w-full md:h-[500px]">
				{/* Main Container */}
				<div className="relative h-full grow">
					{/* Content Container */}
					<div className="relative flex items-center justify-center w-full h-full">
						<h2 className="absolute left-1.5 top-10 z-20 text-xs font-semibold tracking-wide">
							Popular New Titles
						</h2>

						{/* <PopularMangaSection /> */}
						<TopMangaSlider />
					</div>
				</div>
			</div>
			{/* My Library Section */}
			{/* Latest Updated Section */}
			<LatestUpdatedSection />
		</main>
	);
}
