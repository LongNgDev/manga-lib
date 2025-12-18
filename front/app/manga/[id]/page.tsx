"use client";

import LatestUpdatedSection from "@/app/components/sections/latestUpdatedSection";
import NavbarSection from "@/app/components/sections/navbarSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Circle } from "lucide-react";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

type ChapterData = {
	attributes: {
		updatedAt: string;
		translatedLanguage: string;
	};
};

type MangaSchema = {
	id: string;
	attributes: {
		title: string;
		altTitles: string[];
		description: Record<string, string>;
		latestUploadedChapter: string;
		status: string;
		year: string;
		chapters: {
			chapter: string;
			id: string;
			data: ChapterData;
			others: ChapterData[];
		}[];
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
				<div className="relative w-full h-full overflow-hidden pt-9 pb-2">
					<div className="absolute left-0 w-full h-full bg-accent top-43 brightness-75 -z-10" />
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
								<div className="flex flex-col justify-between gap-2 overflow-scroll h-28 grow">
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
									</div>

									{/* Author section */}
									<div className="text-[9px] flex justify-between border-t py-1">
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

								<div className="relative flex flex-col justify-between gap-2">
									<Button
										className="h-fit font-bold bg-orange-500/85 px-2 py-1 text-[9px] capitalize rounded-xs w-fit"
										variant={"secondary"}
									>
										Add to library
									</Button>

									<div className="flex flex-wrap gap-1">
										{Object.values(manga.attributes.tags)
											.filter((item) => item.attributes.group == "genre")
											.map((tag) =>
												tag.attributes.name.en.toLowerCase() == "suggestive" ? (
													<Badge
														className=" text-[5.5px] uppercase px-0.5 py-0 tracking-wide rounded-xs font-extrabold"
														variant={"destructive"}
														key={tag.id}
													>
														{tag.attributes.name.en}
													</Badge>
												) : (
													<Badge
														className=" text-[5.5px] uppercase px-0.5 py-0 tracking-wide rounded-xs font-extrabold shadow-md/60 shadow-accent-foreground/5"
														variant={"secondary"}
														key={tag.id}
													>
														{tag.attributes.name.en}
													</Badge>
												)
											)}
										<Badge
											className=" text-[6px]  uppercase p-0 rounded-xs font-extrabold tracking-wide"
											variant={"secondary"}
											key={manga.attributes.year}
										>
											<span className="flex items-center gap-1 px-0.5">
												<Circle
													size={6}
													className="text-green-500"
													fill="green"
												/>
												Publication: {manga.attributes.year}
											</span>
										</Badge>
										<Badge
											className=" text-[6px]  uppercase p-0 rounded-xs font-extrabold tracking-wide"
											variant={"secondary"}
											key={manga.attributes.status}
										>
											<span className="flex items-center gap-1 px-0.5">
												status: {manga.attributes.status}
											</span>
										</Badge>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="px-2 text-[8px] flex flex-col gap-4">
						<div>
							<h3 className="text-sm font-semibold">Description</h3>
							<p className="indent-2 max-h-21 h-fit overflow-auto">
								{manga.attributes.description.en}
							</p>
						</div>

						<div>
							<h3 className="text-sm font-semibold">Chapters</h3>
							<div className=" overflow-auto h-40 p-2">
								<Table className="text-[8px]">
									<TableBody>
										{manga.attributes.chapters
											.filter((chapter) => {
												if (
													["en"].includes(
														chapter.data.attributes.translatedLanguage
													)
												)
													return chapter;

												return chapter.others.find((entry) =>
													["en"].includes(entry.attributes.translatedLanguage)
												);
											})
											.map((chapter) => (
												<TableRow key={chapter.id}>
													<TableCell>Chapter {chapter.chapter}</TableCell>
													<TableCell className="text-right">
														{dayjs(chapter.data.attributes.updatedAt).fromNow()}
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</div>
						</div>

						<LatestUpdatedSection />
					</div>
				</div>
			)}
		</main>
	);
}

export default Manga;
