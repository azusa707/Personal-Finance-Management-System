import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

// Initialize the Hono app
const app = new Hono();

// GET route to fetch accounts
app.get("/", async (c) => {
    const data = await db
        .select({
            id: accounts.id,
            name: accounts.name,
        })
        .from(accounts);
    return c.json({ data });
});

// POST route to insert a new account
app.post(
    "/",
    zValidator("json", insertAccountSchema.pick({
        name: true, // Validate only the 'name' field
    })),
    async (c) => {
        const values: { name: string } = c.req.valid("json"); // Explicitly typing 'values'

        // Insert the new account into the database
        const [data] = await db.insert(accounts).values({
            id: createId(), // Generate a new unique ID
            name: values.name, // Add the name from the validated input
            plaidId: null,     // Set plaidId as null if not provided
            userId: null       // Set userId as null if not provided
        }).returning();

        return c.json({ data });
    }
);

export default app;
