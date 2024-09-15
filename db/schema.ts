import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Define the accounts table
export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),  // Allow null for optional fields
    name: text("name").notNull(),
    userId: text("user_id"),  // Allow null for optional fields
});

// Create the Zod insert schema for validation
export const insertAccountSchema = createInsertSchema(accounts);
