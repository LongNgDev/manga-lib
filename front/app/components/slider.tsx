import * as React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Assets
import bgImg from "../assets/demo.jpg";
import Image from "next/image";
import { Clock4, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopMangaSlider() {
	return (
		<Carousel
			className="flex items-center w-full"
			opts={{ align: "start", loop: true }}
		>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index} className="relative">
						<div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-accent via-70% via-accent/75 to-accent/70 -z-10 pointer-events-none"></div>
						<Image
							src={bgImg}
							alt="Background image"
							style={{
								objectFit: "contain",
								width: "100%",
								height: "auto",
							}}
							className="absolute top-0 left-0 -translate-y-1/6 -z-20"
						/>

						<Card className="h-[250px] border-0 shadow-none bg-accent/0 outline-0 pt-10 gap-0">
							<CardHeader className="px-2 py-0 text-base font-semibold tracking-wide ">
								Popular New Titles
							</CardHeader>
							<CardContent className="flex items-center gap-2 px-2 grow">
								{/* Thumbnail Cover Image */}
								<Image
									src={bgImg}
									alt="Thumbnail image"
									style={{
										objectFit: "cover",
									}}
									className="h-full w-25 rounded-xs"
								/>

								{/* Manga Content */}
								<div className="flex flex-col justify-between h-full">
									<div className="flex flex-col gap-2">
										<div className="flex flex-col gap-0.5">
											<h2 className="font-semibold tracking-wide">
												Uma Musume - Pretty Derby: Star Blossom
											</h2>
											<h3 className="text-[10px] italic">
												ウマ娘　プリティーダービー　スターブロッサム
											</h3>
											<div className="flex gap-1 py-1">
												<Badge
													className=" text-[6px] uppercase tracking-wider py-0 px-1 font-extrabold"
													variant={"destructive"}
												>
													Suggestive
												</Badge>
												<Badge
													className=" text-[6px] uppercase tracking-wider py-0 px-1 font-extrabold"
													variant={"default"}
												>
													Action
												</Badge>
												<Badge
													className=" text-[6px] uppercase tracking-wider py-0 px-1 font-extrabold"
													variant={"default"}
												>
													Romcom
												</Badge>
												<Badge
													className=" text-[6px] uppercase tracking-wider py-0 px-1 font-extrabold"
													variant={"default"}
												>
													Slice of Life
												</Badge>
											</div>
										</div>
										<p className="text-[9px] font-light line-clamp-3">
											{`The popular cross-media content "Uma Musume Pretty Derby"
											features "Uma Musume" who have inherited the names and
											souls of numerous racehorses! A new legend begins with the
											indomitable horse girl "Sakura Laurel" as the main
											character.`}
										</p>
									</div>
									<Button className="h-fit w-fit text-[9px] px-1! py-1! items-end">
										<span>View details</span>
										<MoveRight className="size-2.5" />
									</Button>
									<div className="text-[9px] flex justify-between items-baseline">
										<span className="line-clamp-1">
											Monjūsaki , Cygames, Hotani Shin
										</span>

										<span className="text-[8px]">
											<Clock4 size={10} className="inline" /> 1 hour ago
										</span>
									</div>
								</div>

								{/* Top & Nav */}
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
