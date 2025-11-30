// server.ts
import app from "./app.js";
import dotenv from "dotenv";
import { connectMongo } from "./database/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await connectMongo();
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
