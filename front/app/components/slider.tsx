"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import { Clock4 } from "lucide-react";
import { useEffect, useState } from "react";

type MangaSchema = {
	id: string;
	attributes: {
		title: string;
		altTitles: string[];
		latestUploadedChapter: string;
	};
	relationships: [
		{
			type: string;
			attributes: {
				fileName: string;
			};
		}
	];
};

export function TopMangaSlider() {
	const [data, setData] = useState<Array<MangaSchema>>([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchManga = async () => {
			const res = await fetch("/api/manga/latest");

			if (!res.ok) return;

			const data = await res.json();
			setData(data);
			setLoading(false);
		};

		fetchManga();
	}, []);

	return (
		<Carousel
			className="flex items-center w-full "
			opts={{ align: "start", loop: true }}
		>
			{isLoading ? (
				<></>
			) : (
				<>
					<CarouselContent className="">
						{data.map((manga) => (
							<CarouselItem key={manga.id} className="relative">
								<div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-10% from-accent via-85% via-accent/80 to-accent/65 -z-10 pointer-events-none"></div>
								<Image
									src={`/api/cover?id=${manga.id}&file=${
										manga.relationships.find(
											(entry) => entry.type == "cover_art"
										)?.attributes.fileName
									}`}
									// src={bgImg}
									fill
									alt="Background image"
									style={{
										objectFit: "cover",
										width: "100%",
									}}
									className="absolute top-0 left-0 w-full h-full -z-20"
								/>

								<Card className="h-64 gap-0 border-0 shadow-none bg-accent/0 outline-0 pt-18">
									{/* <CardHeader className="px-2 py-0 text-base font-semibold tracking-wide ">
								Popular New Titles
								</CardHeader> */}
									<CardContent className="flex items-center gap-2 px-2 grow">
										{/* Thumbnail Cover Image */}
										<div className="relative h-full w-full py-1">
											<Image
												src={`/api/cover?id=${manga.id}&file=${
													manga.relationships.find(
														(entry) => entry.type == "cover_art"
													)?.attributes.fileName
												}`}
												// src={bgImg}
												fill
												alt="Thumbnail image"
												style={{
													objectFit: "contain",
													width: "100%",
												}}
											/>
										</div>

										{/* Manga Content */}
										<div className="flex flex-col justify-between h-full">
											<div className="flex flex-col gap-2 grow">
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
												<div className="flex flex-col gap-2 grow">
													<p className="text-[9px] font-light overflow-auto h-21">
														{`The popular cross-media content "Uma Musume Pretty Derby"
											features "Uma Musume" who have inherited the names and
											souls of numerous racehorses! A new legend begins with the
											indomitable horse girl "Sakura Laurel" as the main
											character.`}
													</p>
												</div>
											</div>

											{/* Author section */}
											<div className="text-[9px] flex justify-between items-baseline border-t pt-1">
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
					<CarouselPrevious
						className="absolute left-0 h-full w-15"
						variant={"ghost"}
					/>
					<CarouselNext
						className="absolute right-0 h-full w-15"
						variant={"ghost"}
					/>
				</>
			)}
		</Carousel>
	);
}
