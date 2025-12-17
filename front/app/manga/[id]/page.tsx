"use client";

import NavbarSection from "@/app/components/sections/navbarSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

function Manga() {
	const params = useParams();
	const titleId = params.id;
	const [manga, setManga] = useState<MangaSchema>();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchManga = async () => {
			const res = await fetch(`/api/manga/${titleId}`);

			if (!res.ok) return;

			const data = await res.json();
			setManga(data);
			setLoading(false);
		};

		fetchManga();
		return;
	}, [titleId]);

	return (
		<main className="relative w-full h-full">
			<NavbarSection />
			{isLoading || !manga ? (
				<></>
			) : (
				<div className="relative w-full h-full overflow-visible pt-9">
					<div className="fixed left-0 w-full h-full bg-accent/98 top-44 -z-10" />
					<Image
						src={`/api/cover?id=${manga.id}&file=${
							manga.relationships.find((entry) => entry.type == "cover_art")
								?.attributes.fileName
						}`}
						width={100}
						height={100}
						loading="eager"
						alt="Background image"
						className="absolute -top-20 left-0 blur-[2px] brightness-85 w-full -z-20"
					/>

					<Card className="w-full h-full border-none rounded-none shadow-none bg-accent/0">
						<CardContent className="flex gap-2 px-2 grow">
							{/* Thumbnail Cover Image */}

							<Image
								src={`/api/cover?id=${manga.id}&file=${
									manga.relationships.find((entry) => entry.type == "cover_art")
										?.attributes.fileName
								}`}
								width={100}
								height={100}
								alt="Thumbnail image"
								className="h-fit w-25"
							/>

							{/* Manga Content */}
							<div className="flex flex-col justify-between gap-2 grow">
								<div className="flex flex-col justify-between gap-2 overflow-scroll max-h-30 grow">
									<div className="flex flex-col gap-0.5">
										<h2 className="text-xl font-bold tracking-wide">
											{/* Uma Musume - Pretty Derby: Star Blossom */}
											{Object.values(manga.attributes.title)}
										</h2>
										<h3 className="text-xs italic line-clamp-2">
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

										{/* <div className="flex flex-wrap gap-1 py-1">
											{Object.values(manga.attributes.tags)
												.filter((item) => item.attributes.group == "genre")
												.map((tag) =>
													// <div key={tag.id}>{tag.attributes.name.en}</div>
													tag.attributes.name.en.toLowerCase() ==
													"suggestive" ? (
														<Badge
															className=" text-[6px] uppercase tracking-wider py-0 px-1 font-extrabold"
															variant={"destructive"}
															key={tag.id}
														>
															{tag.attributes.name.en}
														</Badge>
													) : (
														<Badge
															className=" text-[6px] uppercase tracking-wider py-0 px-1 font-extrabold"
															variant={"default"}
															key={tag.id}
														>
															{tag.attributes.name.en}
														</Badge>
													)
												)}
										</div> */}
									</div>

									{/* Author section */}
									<div className="text-[9px] flex justify-between border-t pt-1">
										<span className="line-clamp-1">
											{/* Monjūsaki , Cygames, Hotani Shin */}
											{[
												...new Set(
													manga.relationships
														.filter(
															(e) => e.type === "author" || e.type === "artist"
														)
														.map((e) => e.attributes.name)
												),
											].join(", ")}
										</span>
									</div>
								</div>

								<div className="relative flex items-center">
									<Button
										className="h-fit font-bold px-2 py-1 text-[9px] capitalize rounded-xs w-fit"
										variant={"destructive"}
									>
										Add to library
									</Button>
								</div>
							</div>

							{/* Top & Nav */}
						</CardContent>
					</Card>
				</div>
			)}
		</main>
	);
}

export default Manga;
