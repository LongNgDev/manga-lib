"use server";

import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;

	const url = `https://manga.code-coffee.com/api/manga/${id}`;

	const res = await fetch(url);

	if (!res.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch manga!" },
			{ status: res.status }
		);
	}

	const data = await res.json();

	return NextResponse.json(data, { status: 200 });
}
