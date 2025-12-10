"use client";

import { useEffect, useState } from "react";
import UpdatedCard from "../updatedCard";

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

function LatestUpdatedSection() {
	const [manga, setManga] = useState<Array<MangaSchema>>([]);
	const [isLoading, setLoading] = useState(true);

	const [isToggle, setToggle] = useState<string>();

	const infoToggle = (id: string) => {
		// const state = !isToggle;
		setToggle(id);
	};

	// Fetch manga
	useEffect(() => {
		const fetchManga = async () => {
			const res = await fetch("/api/manga/latest");

			if (!res.ok) return;

			const data = await res.json();
			setManga(data);
			setLoading(false);
		};

		fetchManga();
	}, []);

	return (
		<div className="flex flex-col w-full gap-2 p-2 bg-accent">
			{/* Title */}
			<h2 className="font-semibold">Recent Updates</h2>

			{/* Loading handle */}
			{isLoading ? (
				<></>
			) : (
				<div className="grid grid-cols-4 row-auto gap-2">
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
								}}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default LatestUpdatedSection;
