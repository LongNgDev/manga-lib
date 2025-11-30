import { client } from "./client.js";

export const connectMongo = async () => {
	await client
		.connect()
		.then(() => console.log("✅ MongoDB producer connected"))
		.catch((err: Error) => console.warn("⚠️ MongoDB connect warning:", err));
	return client;
};
