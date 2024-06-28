import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/database/schemas.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		host: "localhost",
		port: 5432,
		user: "root",
		password: "root",
		database: "db",
	},
	verbose: true,
	strict: true,
});
