"use client";

import { useEffect, useRef, useState } from "react";
import UpdatedCard from "../updatedCard";
import { Button } from "@/components/ui/button";
import { useInView } from "motion/react";
import { Spinner } from "@/components/ui/spinner";

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
		latestUploadedChapter: string;
		chapters: {
			chapter: string;
			id: string;
			data: ChapterData;
			others: ChapterData[];
		}[];
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

function LatestUpdatedSection() {
	const [manga, setManga] = useState<Array<MangaSchema>>([]);
	const [isLoading, setLoading] = useState(true);
	const [offset, setOffset] = useState(0);
	const limit = useRef(20);

	const ref = useRef<HTMLDivElement | null>(null);
	const isInView = useInView(ref, { margin: "0px 0px 50px 0px" });

	const [isToggle, setToggle] = useState<string>();

	const infoToggle = (id: string) => {
		// const state = !isToggle;
		setToggle(id);
	};

	const loadMore = () => {
		setOffset((prev) => prev + limit.current);
	};

	// Fetch manga
	useEffect(() => {
		const fetchManga = async () => {
			const res = await fetch(
				`/api/manga/latest?limit=${limit.current}&offset=${offset}`
			);

			if (!res.ok) return;

			const data = await res.json();
			setManga((prev) => {
				const seen = new Set(prev.map((m) => m.id));
				const filtered = data.filter((m: MangaSchema) => !seen.has(m.id));
				return [...prev, ...filtered];
			});
			setLoading(false);
		};

		fetchManga();
	}, [offset]);

	// Auto load more when reach the end
	useEffect(() => {
		if (isLoading) return;
		if (!isInView) return;

		loadMore();
	}, [isInView, isLoading]);

	return (
		<div className="flex flex-col w-full gap-2 p-2 bg-accent">
			{/* Loading handle */}
			{isLoading ? (
				<></>
			) : (
				<>
					{/* Title */}
					<h2 className="font-semibold md:text-lg lg:text-3xl">
						Recent Updates
					</h2>

					<div className="grid grid-cols-4 row-auto gap-2 md:grid-cols-5">
						{/* Display items from manga list */}
						{manga.map((item: MangaSchema) => (
							<div key={item.id}>
								{/* Manga Card */}
								<UpdatedCard
									isToggle={isToggle}
									infoToggle={infoToggle}
									data={{
										id: item.id,
										title: Object.values(item.attributes.title)[0],
										altTitle: Object.values(
											item.attributes.altTitles
												.sort((a, b) => {
													const x = Object.keys(a)[0];
													const y = Object.keys(b)[0];
													return y.localeCompare(x);
												})
												.find((item) =>
													["en", "ja-ro", "ja"].includes(Object.keys(item)[0])
												) || ""
										)[0],
										coverId: item.relationships.find(
											(entry) => entry.type == "cover_art"
										)?.attributes.fileName,
										publishedAt: item.attributes.latestUploadedChapter,
										chapters: item.attributes.chapters.filter((chapter) => {
											if (
												["en"].includes(
													chapter.data.attributes.translatedLanguage
												)
											)
												return chapter;

											return chapter.others.find((entry) =>
												["en"].includes(entry.attributes.translatedLanguage)
											);
										}),
									}}
								/>
							</div>
						))}
					</div>

					<div
						className={`flex justify-center  py-10 w-full z-10 ${
							isLoading && "hidden"
						} `}
					>
						<Spinner className="size-10" />
					</div>
					{/* <div className="flex justify-center">
						<Button
							className="px-1.5 text-[9px] tracking-wider uppercase h-fit py-0.5 rounded-xs"
							onClick={(e) => {
								e.preventDefault();
								loadMore();
							}}
							variant={"destructive"}
						>
							More
						</Button>
					</div> */}
				</>
			)}
			<div ref={ref} />
		</div>
	);
}

export default LatestUpdatedSection;
