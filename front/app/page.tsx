import Image from "next/image";
import { TopMangaSlider } from "./components/slider";
import bgImg from "./assets/demo.jpg";

export default function Home() {
	return (
		<div className=" w-vw min-h-vh">
			<main className="relative w-full">
				{/* Background blur backdrop */}
				<div className="absolute bg-linear-to-t from-accent from-10% to-accent/50 h-full w-full top-0 left-0"></div>
				{/* Navbar Section */}
				<div className="fixed top-0 w-full bg-amber-500">Nav</div>

				{/* Top 10 Section */}
				<div className="w-full h-[600px]">
					{/* Main Container */}
					<div className="h-full">
						{/* Background Image */}
						<div className="w-full h-full">
							<Image
								src={bgImg}
								alt="Background image"
								style={{
									objectFit: "contain",
								}}
								className="absolute -translate-y-1/6 -z-10"
							/>
						</div>
						{/* Content Container */}
						<div className="flex justify-center w-full bg-accent">
							{/* <TopMangaSlider /> */}
						</div>
					</div>
				</div>
				{/* Latest Updated Section */}
			</main>
		</div>
	);
}
