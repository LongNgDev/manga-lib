"use client";

import { useEffect, useState } from "react";
import { TopMangaSlider } from "../slider";

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

function PopularMangaSection() {
	return (
		<div className="w-full h-full relative">
			<TopMangaSlider />
		</div>
	);
}

export default PopularMangaSection;
