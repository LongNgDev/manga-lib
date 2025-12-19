import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const limit = searchParams.get("limit") ?? "40";
	const offset = searchParams.get("offset") ?? "0";

	const url = `https://manga.code-coffee.com/api/manga/latest_updated?limit=${limit}&offset=${offset}`;
	const res = await fetch(url);

	if (!res.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch manga" },
			{ status: res.status }
		);
	}
	const data = await res.json();

	return NextResponse.json(data, {
		status: 200,
		headers: {
			"Cache-Control": "public, max-age=300",
		},
	});
}
