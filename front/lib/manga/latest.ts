"use server";

export async function getLatest() {
	const res = await fetch(
		"https://manga.code-coffee.com/api/manga/latest_updated",
		{
			method: "GET",
			next: { revalidate: 300 },
		}
	);

	if (!res.ok) throw new Error("Failed to fetch ...");

	const data = await res.json();

	return data;
}
