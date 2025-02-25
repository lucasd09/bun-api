import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schemas";

export const client = postgres(process.env.DATABASE_URL || "");
export const db = drizzle(client, {
	schema,
});
