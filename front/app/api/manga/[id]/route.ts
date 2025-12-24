import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;

	if (!id) {
		return NextResponse.json({ error: "Missing id" }, { status: 400 });
	}

	const res = await fetch(`https://manga.code-coffee.com/api/manga/${id}`);

	if (!res.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch manga!" },
			{ status: res.status }
		);
	}

	return NextResponse.json(await res.json());
}
