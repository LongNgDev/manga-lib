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
	const OFFSET: number = Number(req.query.offset) || 0;

	try {
		const data = await col
			.find({})
			.sort({ "attributes.latestUploadedChapterTimeStamp": -1 })
			.limit(LIMIT)
			.skip(OFFSET)
			.toArray();

		if (!data) throw Error("Missing data!");

		return res.status(200).json(data);
	} catch (err) {
		console.error("⚠️ Error fetching data:", err);
		return res.status(500).json({ errors: err });
	}
});

// Get manga by id
router.get("/manga/:id", async (req: Request, res: Response) => {
	const uid = req.params.id;

	try {
		const data = await col.findOne({ id: uid });

		if (!data) throw Error(`Cannot find the manga with id ${uid}!`);

		return data;
	} catch (err) {
		console.error("⚠️ Error fetching data:", err);
		return res.status(500).json({ errors: err });
	}
});

// Delete manga by id
router.get("/delete", async (req: Request, res: Response) => {
	const id = req.query.id;

	try {
		const result = await col.deleteOne({ id: id });

		return res.status(200).json(result);
	} catch (err) {
		console.error("⚠️ Error fetching data:", err);
		return res.status(500).json({ msg: "Database error", errors: err });
	}
});

export default router;
