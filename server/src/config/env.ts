import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

const get = (key: string, fallback?: string) => {
	const value = process.env[key];
	if (value === undefined) {
		if (fallback !== undefined) return fallback;
		throw new Error(`Missing env: ${key}`);
	}
	return value;
};

export const env = {
	port: Number(get("PORT", "3000")),
	mongodb: get("MONGO_URI", "mongodb://localhost:27017/"),
};
