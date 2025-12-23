"use client";

import React, { useState } from "react";

import { useMotionValueEvent, useScroll, motion } from "motion/react";
import Link from "next/link";

function NavbarSection() {
	const { scrollY } = useScroll();
	const [solid, setSolid] = useState(false);

	useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 0));

	return (
		<div className="fixed top-0 left-0 w-full z-90">
			<motion.nav
				className={`fixed top-0 w-full transition-all duration-600 ease-out border-none ${
					solid
						? "bg-accent/80 backdrop-blur-lg"
						: "bg-accent/40 backdrop-blur-sm"
				}`}
			>
				<div className="flex items-center justify-between h-full p-2 m-auto lg:py-4 max-w-7xl">
					<div className="flex gap-1">
						{/* <div>Logo</div> */}
						<h1 className="md:text-2xl md:font-semibold lg:text-5xl">
							<Link href={"/"}>MangaLib</Link>
						</h1>
					</div>
					{/* <div className="flex gap-4">
						<div className="flex items-center gap-1">
							<Input
								className={`h-fit w-20 focus:w-35 transition-all duration-400 ease-in-out rounded-sm text-[8px] font-semibold px-2 bg-accent/90! border ${
									solid
										? "border-accent-foreground/10"
										: "border-accent-foreground/60"
								}`}
								placeholder="Search"
							/>
							<Search className="w-auto h-3" />
						</div>
						<div className="h-full">
							<Avatar className="w-auto h-6">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
					</div> */}
				</div>
			</motion.nav>
		</div>
	);
}

export default NavbarSection;
