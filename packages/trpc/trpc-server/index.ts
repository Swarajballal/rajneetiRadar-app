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
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.create({
        email: input.email,
        hashedPassword: input.hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        role: Role.USER,
        emailVerified: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      return user;
    }),
  signUp: publicProcedure
    .input(z.object({
      email: z.string(),
      hashedPassword: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      const existingUser = await db.user.findUnique(input.email); 
      if(existingUser) {
        throw new Error('User already exists');
      }
      const user = await db.user.create({
        email: input.email,
        hashedPassword: input.hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        role: Role.USER,
        emailVerified: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      return user;
    })
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(8000);

export type AppRouter = typeof appRouter;
