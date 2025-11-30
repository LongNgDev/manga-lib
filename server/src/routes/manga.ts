import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { client } from "../database/client.js";

const router: Router = Router();

const db = client.db("manga-lib");
const col = db.collection("raw_metadata");

// Health check
router.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "OK" });
});

// Get latest manga with limit, default at 10
router.get("/latest_updated", async (req: Request, res: Response) => {
	const LIMIT: number = Number(req.query.limit) || 10;
	console.log(LIMIT);

	try {
		const data = await col
			.find({})
			.sort({ "attributes.latestUploadedChapter": -1 })
			.limit(LIMIT)
			.toArray();

		// if (!data) return res.status(500).json({ msg: "Data missing!" });
		if (!data) throw Error("Missing data!");

		return res.status(200).json(data);
	} catch (err) {
		console.error("⚠️ Error fetching data:", err);
		return res.status(500).json({ msg: "Database error", errors: err });
	}
});

export default router;
