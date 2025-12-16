import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function NavbarSection() {
	return (
		<div className="fixed top-0 left-0 z-10 w-full h-10">
			<div className="flex items-center justify-between h-full p-2">
				<div className="flex gap-1">
					{/* <div>Logo</div> */}
					<h1>MangaLib</h1>
				</div>
				<div className="flex gap-4">
					<div className="flex items-center gap-1">
						<Input
							className="h-fit w-20 focus:w-35 transition-all duration-400 ease-in-out rounded-sm text-[8px] font-semibold px-2 bg-accent/90! border-none"
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
				</div>
			</div>
		</div>
	);
}

export default NavbarSection;
