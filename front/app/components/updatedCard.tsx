"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Bookmark, MoveRight } from "lucide-react";
import { useState } from "react";

type Manga = {
	id: string;
	title: string;
	altTitle?: string;
	coverId: string | undefined;
	publishedAt: string;
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
			className="relative w-full overflow-hidden select-none h-34 group"
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
					"absolute z-10 w-full h-full transition-all duration-500 ease-in-out bg-accent/95 group-hover:opacity-100",
					isToggle == data.id ? "opacity-100" : "opacity-0",
				].join(" ")}
			>
				{/* Manga details */}
				<div className="p-1 grid grid-rows-5 h-full gap-0.5">
					<div className="grid row-span-2">
						<div className="flex flex-col gap-1">
							{/* Title */}
							<h2 className="font-semibold tracking-wide h-fit text-[9px] line-clamp-2 ">
								{/* Uma Musume - Pretty Derby: Star Blossom */}
								{data.title}
							</h2>
							{/* Alternative Title */}
							<h3 className="text-[7px] italic line-clamp-2 h-fit">
								{/* ウマ娘　プリティーダービー　スターブロッサム */}
								{data.altTitle}
							</h3>
						</div>
					</div>
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
							<span className="text-[8px] font-semibold">View details</span>
							<MoveRight className="size-2" />
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
