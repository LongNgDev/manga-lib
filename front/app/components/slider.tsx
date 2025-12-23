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
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

type MangaSchema = {
	id: string;
	attributes: {
		title: string;
		altTitles: string[];
		description: string;
		latestUploadedChapter: string;
		tags: [
			{
				id: string;
				type: string;
				attributes: {
					name: {
						en: string;
					};
					group: string;
				};
			}
		];
	};
	relationships: [
		{
			type: string;
			attributes: {
				fileName: string;
				name: string;
			};
		}
	];
};

export function TopMangaSlider() {
	const [data, setData] = useState<Array<MangaSchema>>([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchManga = async () => {
			const res = await fetch("/api/manga/latest?limit=10");

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
					<CarouselContent>
						{data.map((manga) => (
							<CarouselItem
								key={manga.id}
								className="relative flex flex-col gap-1 md:pt-22 pt-18"
							>
								<div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-10% from-accent via-85% via-accent/80 to-accent/65 -z-10 pointer-events-none" />
								<Image
									src={`/api/cover?id=${manga.id}&file=${
										manga.relationships.find(
											(entry) => entry.type == "cover_art"
										)?.attributes.fileName
									}`}
									// src={bgImg}
									fill
									sizes="auto"
									loading="eager"
									alt="Background image"
									style={{
										objectFit: "cover",
										width: "100%",
									}}
									className="absolute top-0 left-0 w-full h-full -z-20"
								/>
								<Card className="h-64 gap-0 border-0 shadow-none md:h-74 lg:h-112 bg-accent/0 outline-0 ">
									<CardContent className="flex items-center h-full gap-2 px-2 grow">
										{/* Thumbnail Cover Image */}
										<div className="relative h-full py-1 min-w-30 md:min-w-34 lg:min-w-70">
											<Link href={`/manga/${manga.id}`}>
												<Image
													src={`/api/cover?id=${manga.id}&file=${
														manga.relationships.find(
															(entry) => entry.type == "cover_art"
														)?.attributes.fileName
													}`}
													// src={bgImg}
													fill
													alt="Thumbnail image"
													loading="eager"
													sizes="auto"
													style={{
														objectFit: "contain",
														width: "100%",
													}}
												/>
											</Link>
										</div>

										{/* Manga Content */}
										<div className="flex flex-col justify-between h-full grow">
											<div className="flex flex-col h-full gap-2 lg:gap-4 grow">
												<div className="flex flex-col gap-0.5 md:gap-1.5">
													<Link href={`/manga/${manga.id}`}>
														<h2 className="font-semibold tracking-wide line-clamp-2 md:text-xl md:font-bold lg:text-3xl">
															{/* Uma Musume - Pretty Derby: Star Blossom */}
															{Object.values(manga.attributes.title)}
														</h2>
													</Link>
													<Link href={`/manga/${manga.id}`}>
														<h3 className="text-[10px] italic line-clamp-2 md:text-sm lg:text-xl tracking-wide">
															{/* ウマ娘　プリティーダービー　スターブロッサム */}
															{
																Object.values(
																	manga.attributes.altTitles
																		.sort((a, b) => {
																			const x = Object.keys(a)[0];
																			const y = Object.keys(b)[0];
																			return y.localeCompare(x);
																		})
																		.find((item) =>
																			["en", "ja-ro", "ja"].includes(
																				Object.keys(item)[0]
																			)
																		) || ""
																)[0]
															}
														</h3>
													</Link>

													<div className="flex flex-wrap gap-1 py-1 md:gap-2">
														{Object.values(manga.attributes.tags)
															.filter(
																(item) => item.attributes.group == "genre"
															)
															.map((tag) =>
																// <div key={tag.id}>{tag.attributes.name.en}</div>
																tag.attributes.name.en.toLowerCase() ==
																"suggestive" ? (
																	<Badge
																		className=" text-[6px] md:text-[7px] lg:text-xs uppercase tracking-wider py-0 px-1 font-extrabold"
																		variant={"destructive"}
																		key={tag.id}
																	>
																		{tag.attributes.name.en}
																	</Badge>
																) : (
																	<Badge
																		className=" text-[6px] md:text-[7px] lg:text-xs uppercase tracking-wider py-0 px-1 font-extrabold"
																		variant={"default"}
																		key={tag.id}
																	>
																		{tag.attributes.name.en}
																	</Badge>
																)
															)}
													</div>
												</div>
												<div className="flex flex-col gap-2 overflow-auto grow">
													<p className="text-[9px] font-light md:text-[10px] lg:font-normal lg:text-base indent-2">
														{Object.values(manga.attributes.description)[0]}
													</p>
												</div>

												{/* Author section */}
												<div className="text-[9px] md:text-[10px] lg:text-base flex justify-between border-t pt-1 ">
													<span className="line-clamp-1">
														{/* Monjūsaki , Cygames, Hotani Shin */}
														{[
															...new Set(
																manga.relationships
																	.filter(
																		(e) =>
																			e.type === "author" || e.type === "artist"
																	)
																	.map((e) => e.attributes.name)
															),
														].join(", ")}
													</span>
												</div>
											</div>
										</div>

										{/* Top & Nav */}
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						className="absolute left-0 h-full rounded-none w-15"
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
