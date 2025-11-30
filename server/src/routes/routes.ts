import { Router, type Request, type Response } from "express";
import manga from "./manga.js";

const router: Router = Router();

router.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "OK" });
});

router.use("/manga", manga);

export default router;
