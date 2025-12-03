import { TopMangaSlider } from "./components/slider";

export default function Home() {
	return (
		<div className="text-xs w-vw min-h-vh">
			<main className="relative w-full overflow-hidden">
				{/* Navbar Section */}
				<div className="sticky top-0 w-full bg-amber-500">Nav</div>

				{/* Top 10 Section */}
				<div className="w-full md:h-[500px] h-[200px]">
					{/* Main Container */}
					<div className="relative h-full grow">
						{/* Content Container */}
						<div className="relative flex items-center justify-center w-full h-full">
							<TopMangaSlider />
						</div>
					</div>
				</div>
				{/* Latest Updated Section */}
			</main>
		</div>
	);
}
