import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const mangaId = searchParams.get("id");
	const file = searchParams.get("file");

	if (!mangaId || !file) {
		return NextResponse.json({ error: "Missing params" }, { status: 400 });
	}

	const url = `https://uploads.mangadex.org/covers/${mangaId}/${file}`;

	const res = await fetch(url);

	if (!res.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch image" },
			{ status: res.status }
		);
	}

	const arrayBuffer = await res.arrayBuffer();

	return new NextResponse(arrayBuffer, {
		status: 200,
		headers: {
			"Content-Type": res.headers.get("Content-Type") ?? "image/jpeg",
			"Cache-Control": "public, max-age=86400",
		},
	});
}
