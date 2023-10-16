import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db , Role} from "./db";
import { publicProcedure, router } from "./trpc";
 
const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await db.user.findMany();
      return users;
    }),
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.user.findById(input);
      return user;
    }),
    userCreate: publicProcedure
    .input(z.object({
      email: z.string(),
      hashedPassword: z.string(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      role: z.nativeEnum(Role),
      emailVerified: z.date().nullable(),
      updatedAt: z.date(),
      createdAt: z.date()
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.create(input);
      return user;
    }),
});
 
export type AppRouter = typeof appRouter;
 
const server = createHTTPServer({
  router: appRouter,
});
 
server.listen(3000);