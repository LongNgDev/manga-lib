"use server";

export async function getCoverArt(mangaId: string, coverArtId: string) {
	const res = await fetch(
		`https://uploads.mangadex.org/covers/${mangaId}/${coverArtId}`,
		{
			method: "GET",
			next: { revalidate: false },
		}
	);

	if (!res.ok) {
		throw new Error(
			`Failed to fetch cover art ${res.status} ${res.statusText}`
		);
	}

	// Return the image as ArrayBuffer or Blob
	const buffer = await res.arrayBuffer();

	return buffer;
}
