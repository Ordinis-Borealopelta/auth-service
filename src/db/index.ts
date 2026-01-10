import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";

export const db = drizzle(process.env.AUTH_DATABASE_URL!, { relations });
