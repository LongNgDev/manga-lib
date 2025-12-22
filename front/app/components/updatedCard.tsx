"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Bookmark, MoveRight } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type Manga = {
	id: string;
	title: string;
	altTitle?: string;
	coverId: string | undefined;
	publishedAt: string;
	chapters: {
		chapter: string;
		id: string;
		data: {
			attributes: {
				updatedAt: string;
				translatedLanguage: string;
			};
		};
	}[];
};

function UpdatedCard({
	data,
	isToggle,
	infoToggle,
}: {
	data: Manga;
	isToggle: string | undefined;
	infoToggle: (id: string) => void;
}) {
	return (
		<div
			className="relative w-full overflow-hidden select-none h-34 md:h-52 group"
			onClick={(e) => {
				// Only toggle on mobile / touch devices
				if (window.matchMedia("(hover: none)").matches) {
					e.preventDefault();
					if (isToggle == data.id) infoToggle("");
					else infoToggle(data.id);
				}
			}}
		>
			{/* Blur backdrop */}
			<div
				className={[
					"absolute z-10 w-full h-full transition-all duration-600 ease-in-out bg-accent/95 group-hover:opacity-100",
					isToggle == data.id
						? "opacity-100 translate-x-0"
						: "opacity-0 translate-x-full",
				].join(" ")}
			>
				{/* Manga details */}
				<div className="p-1 grid grid-rows-5 h-full gap-0.5">
					<div className="grid row-span-2">
						<div className="flex flex-col gap-1">
							{/* Title */}
							<h2 className="font-semibold tracking-wide h-fit text-[9px] md:text-sm  line-clamp-2 ">
								{/* Uma Musume - Pretty Derby: Star Blossom */}
								<Link href={`/manga/${data.id}`}>{data.title}</Link>
							</h2>
							{/* Alternative Title */}
							<h3 className="text-[7px] md:text-[9px] italic line-clamp-2 h-fit">
								{/* ウマ娘　プリティーダービー　スターブロッサム */}
								<Link href={`/manga/${data.id}`}>{data.altTitle}</Link>
							</h3>
						</div>
					</div>
					{/* Chapter List */}
					<div className="row-span-2">
						<div className="grid row-auto h-full text-[7px] md:text-[9px] py-1 font-light">
							{/* {Array.from({ length: 3 }).map((_, index) => ( */}
							{data.chapters.slice(0, 3).map((chapter) => (
								<div
									key={chapter.id}
									className="flex items-baseline justify-between gap-1 h-fit"
								>
									<h3>Chapter {chapter.chapter}</h3>
									<div className="self-end my-0.5 border-b border-dotted grow border-accent-foreground"></div>
									<span className="md:text-[8px] text-[7px]">
										{dayjs(chapter.data.attributes.updatedAt).fromNow()}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* CTA button */}
					<div className="flex items-center justify-center w-full h-full px-1">
						{/* <Bookmark size={15} className="md:size-5" /> */}

						<Button
							variant={"default"}
							className="px-1! py-0.5! md:py-1! md:px-1.5! rounded-sm h-fit gap-1"
							size={"sm"}
						>
							<span className="text-[8px] md:text-[10px] md:font-bold font-semibold">
								<Link href={`/manga/${data.id}`}>View details</Link>
							</span>
							<MoveRight className="size-2 md:size-3" />
						</Button>
					</div>
				</div>
			</div>

			{/* Background Image */}
			<Image
				// src={bgImg}
				src={`/api/cover?id=${data.id}&file=${data.coverId}`}
				alt="Cover Image"
				fill
				sizes="auto"
				style={{
					objectFit: "cover",
				}}
				className="absolute top-0 left-0"
			/>
		</div>
	);
}

export default UpdatedCard;
