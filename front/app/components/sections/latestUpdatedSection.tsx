import UpdatedCard from "../updatedCard";
import { getLatest } from "@/lib/manga/latest";

async function LatestUpdatedSection() {
	const manga = await getLatest();

	return (
		<div className="flex flex-col w-full gap-2 p-2 bg-accent">
			<h2 className="font-semibold">Recent Updates</h2>
			<div className="grid grid-cols-4 row-auto gap-2">
				{manga.map((item: any) => (
					<div key={item.id}>
						<UpdatedCard
							data={{
								id: item.id,
								title: Object.values(item.attributes.title),
								altTitle: Object.values(item.attributes.altTitles[0]),
								coverId: item.relationships.find(
									(entry) => entry.type == "cover_art"
								).attributes.fileName,
								publishedAt: item.attributes.latestUploadedChapter,
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default LatestUpdatedSection;
