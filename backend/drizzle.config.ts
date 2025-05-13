import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const url = new URL(DATABASE_URL);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    host: url.hostname,
    port: Number(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: false, // Only false for local development
  },
});
