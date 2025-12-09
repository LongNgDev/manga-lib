import { TopMangaSlider } from "./components/slider";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdatedSection from "./components/updatedCard";

export default function Home() {
	return (
		<div className="text-xs w-vw min-h-vh">
			<main className="relative w-full overflow-auto">
				{/* Navbar Section */}
				<div className="fixed top-0 left-0 z-10 w-full h-10">
					<div className="flex items-center justify-between h-full p-2">
						<div className="flex gap-1">
							{/* <div>Logo</div> */}
							<h1>MangaLib</h1>
						</div>
						<div className="flex gap-4">
							<div className="flex items-center gap-1">
								<Input
									className="h-fit w-20 focus:w-35 transition-all duration-400 ease-in-out rounded-sm text-[8px] font-semibold px-2 bg-accent/90! border-none"
									placeholder="Search"
								/>
								<Search className="w-auto h-3" />
							</div>
							<div className="h-full">
								<Avatar className="w-auto h-6">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</div>
						</div>
					</div>
				</div>

				{/* Top 10 Section */}
				<div className="w-full md:h-[500px]">
					{/* Main Container */}
					<div className="relative h-full grow">
						{/* Content Container */}
						<div className="relative flex items-center justify-center w-full h-full">
							<h2 className="absolute left-1.5 top-10 z-20 text-xs font-semibold tracking-wide">
								Popular New Titles
							</h2>

							<TopMangaSlider />
						</div>
					</div>
				</div>
				{/* My Library Section */}

				{/* Latest Updated Section */}
				<div className="flex flex-col w-full gap-2 p-2 bg-accent">
					<h2 className="font-semibold">Recent Updates</h2>
					<div className="grid grid-cols-4 row-auto gap-2">
						{Array.from({ length: 20 }).map((_, index) => (
							<div key={index}>
								<UpdatedSection />
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
