import express, {
	type Application,
	type Request,
	type Response,
	type NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";

const app: Application = express();

// Middleware
app.use(cors);
app.use(express.json());
app.use(morgan("dev"));

// routes
// mount all route under /api
// app.use("/api", routes);

// Health check
app.use("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "OK" });
});

app.use("/404", (_req: Request, res: Response) => {
	res.status(404).json({ err: "Not Found" });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.message);
	res
		.status(err.status || 500)
		.json({ error: err.message || "Internal Error" });
});

export default app;
