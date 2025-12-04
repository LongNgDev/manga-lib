import { TopMangaSlider } from "./components/slider";

import bgImg from "./assets/demo.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bookmark, MoveRight } from "lucide-react";

export default function Home() {
	return (
		<div className="text-xs w-vw min-h-vh">
			<main className="relative w-full overflow-hidden">
				{/* Navbar Section */}
				<div className="fixed top-0 left-0 z-10 w-full">Nav</div>

				{/* Top 10 Section */}
				<div className="w-full md:h-[500px]">
					{/* Main Container */}
					<div className="relative h-full grow">
						{/* Content Container */}
						<div className="relative flex items-center justify-center w-full h-full">
							<TopMangaSlider />
						</div>
					</div>
				</div>
				{/* My Library Section */}
				{/* Latest Updated Section */}
				<div className="flex flex-col w-full gap-2 p-2 bg-accent">
					<h2 className="font-semibold">Recent Updates</h2>

					{/* List of latest manga */}
					{/* Main Container */}
					<div className="grid grid-cols-4 row-auto gap-2">
						{Array.from({ length: 10 }).map((_, index) => (
							<div key={index} className="relative w-full h-34">
								{/* Blur backdrop */}
								<div className="absolute z-10 w-full h-full bg-accent/95">
									{/* Manga details */}
									<div className="p-1 grid grid-rows-5 gap-0.5 max-h-full">
										{/* Title */}
										<h2 className="font-semibold tracking-wide h-fit text-[9px] line-clamp-2 ">
											Uma Musume - Pretty Derby: Star Blossom
										</h2>
										{/* Alternative Title */}
										<h3 className="text-[7px] italic line-clamp-2 h-fit">
											ウマ娘　プリティーダービー　スターブロッサム
										</h3>
										{/* Chapter List */}
										<div className="row-span-2 px-1">
											<div className="grid row-auto h-full text-[8px] py-1">
												{Array.from({ length: 3 }).map((_, index) => (
													<div
														key={index}
														className="flex items-baseline justify-between gap-1 h-fit"
													>
														<h3>chapter {index + 1}</h3>
														<div className="self-end my-0.5 border-b border-dotted grow border-accent-foreground"></div>
														<span className="text-[6px]">50 mins ago</span>
													</div>
												))}
											</div>
										</div>

										{/* CTA button */}
										<div className="flex items-center justify-between w-full h-full">
											<Bookmark size={15} />

											<Button
												variant={"default"}
												className="px-1! py-0.5! rounded-sm h-fit gap-1"
												size={"sm"}
											>
												<span className="text-[8px] font-semibold">
													View details
												</span>
												<MoveRight className="size-2" />
											</Button>
										</div>
									</div>
								</div>
								{/* Background Image */}
								<Image
									src={bgImg}
									alt="Thumbnail Image"
									objectFit="cover"
									fill
									style={{
										objectFit: "cover",
									}}
									className="absolute top-0 left-0"
								/>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
