"use client";

import { useState } from "react";
import bgImg from "../assets/demo.jpg";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Bookmark, MoveRight } from "lucide-react";

type Manga = {
	id: string;
	title: string;
	altTitle?: string;
	coverId: string;
	publishedAt: Date;
};

function UpdatedCard({ data }: { data: Manga }) {
	const [isOpen, setOpen] = useState(false);

	const toggleCard = () => {
		const state = !isOpen;
		setOpen(state);
	};

	return (
		<div
			className="relative w-full select-none h-34 overflow-hidden group"
			onClick={(e) => {
				e.preventDefault();
				toggleCard();
			}}
		>
			{isOpen ? (
				<>
					{/* Blur backdrop */}
					<div className="absolute z-10 w-full h-full bg-accent/95">
						{/* Manga details */}
						<div className="p-1 grid grid-rows-5 gap-0.5 max-h-full">
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
				</>
			) : (
				<>
					{/* Blur backdrop */}
					<div className="absolute z-10 w-full h-full bg-accent/95 translate-y-full group-hover:translate-y-0">
						{/* Manga details */}
						<div className="p-1 grid grid-rows-5 gap-0.5 max-h-full">
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
				</>
			)}
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
