import { Hono } from "hono";
import { accounts,insertAccountSchema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { and, eq, inArray} from "drizzle-orm";


const app =new Hono()
.get("/", async (c) => {

    const data = await db
    .select({
        id: accounts.id,
        name: accounts.name,
    })
    .from(accounts);
    return c.json({ data});
})
.get(
    "/:id",
    zValidator("param", z.object({
        id:z.string().optional(),
    })),
    async (c) => {
        const { id } = c.req.valid("param");

        if(!id) {
            return c.json({ error: "Missing id"}, 400);
        }

        const [data] = await db
            .select({
                id: accounts.id,
                name: accounts.name,
            })
            .from(accounts)
            .where(
                and(
                    eq(accounts.id, id)
                ),
            );

            if (!data) {
                return c.json({ error: "Not found"}, 404);
            }

            return c.json({data});
        }
    )
.post(
    "/",
    zValidator("json", insertAccountSchema.pick({
        name: true, // Validate only the 'name' field
    })),
    async (c) => {
        const values = c.req.valid("json");

      // Assign a default value for `userId`
      const userId = "default-user-id"; // 
        // Insert the new account into the database
        const [data] = await db.insert(accounts).values({
            id: createId(), 
            ...values,
              userId,
        }).returning();

        return c.json({ data });
    }
)
.post(
    "/bulk-delete",
    zValidator(
        "json",
        z.object({
            ids: z.array(z.string()),
        })
    ),

async (c) => {
    
    const values = c.req.valid("json");

    
    const data = await db
    .delete(accounts)
    .where(
        and(
            eq(accounts.userId, "default-user-id"),
            inArray(accounts.id, values.ids)
        )
    )
    .returning({
        id: accounts.id,
    });

    return c.json({ data });
}
)
.patch(
    "/:id",
    zValidator(
        "param",
        z.object({
            id: z.string().optional(),
        }),
    ),
    zValidator(
        "json",
        insertAccountSchema.pick({
            name:true,
        })
    ),
    async (c) => {

    const { id } = c.req.valid("param");
    const values = c.req.valid("json");

    if (!id) {
        return c.json({ error: "Missing id"}, 400);
    }

    const [data] = await db
    .update(accounts)
    .set(values)
    .where(
        and(
            eq(accounts.id, id),
        ),
    )
    .returning();

    if(!data) {
        return c.json({ erro: "Not found"}, 404);
    }

    return c.json({ data });
    }
)

.delete(
    "/:id",
    zValidator(
        "param",
        z.object({
            id: z.string().optional(),
        }),
    ),
   
    async (c) => {

    const { id } = c.req.valid("param");

    if (!id) {
        return c.json({ error: "Missing id"}, 400);
    }

    const [data] = await db
    .delete(accounts)
   
    .where(
        and(
            eq(accounts.id, id),
        ),
    )
    .returning();

    if(!data) {
        return c.json({ erro: "Not found"}, 404);
    }

    return c.json({ data });
    }
);


export default app;