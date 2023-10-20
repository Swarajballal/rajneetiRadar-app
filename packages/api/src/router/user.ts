import { createTRPCRouter, enforceUserIsAuthed, publicProcedure } from "../trpc";
import bcrypt from 'bcrypt';
import { z } from "zod";

export const userRouter = createTRPCRouter({

    signup: publicProcedure
        .input(z.object({
            email: z.string().email(),
            hashedPassword: z.string(),
            firstName: z.string().nullable(),
            lastName: z.string().nullable(),
        }))
        .mutation(async (opts) => {
            const { input} = opts;
            const userExists = await opts.ctx.db.user.findUnique({
                where: {
                    email: input.email,
                }
            });
            if (userExists) {
                return { status: 'error', message: 'User already exists' };
            }else {

                const hashedPassword = await bcrypt.hash(input.hashedPassword, 10);
                const user = await opts.ctx.db.user.create({
                    data: {
                        email: input.email,
                        hashedPassword: hashedPassword,
                        firstName: input.firstName,
                        lastName: input.lastName,
                        role: 'USER',
                        emailVerified: new Date(),
                        updatedAt: new Date(),
                        createdAt: new Date(),
                    }
                });
                return { status: 'success', message: 'User created successfully' };
            }
        }),

    login: publicProcedure
        .input(z.object({
            email: z.string().email(),
            hashedPassword: z.string(),
        }))
        .mutation(async (opts) => {
            const { input } = opts;
            const userExists = await opts.ctx.db.user.findUnique({
                where: {
                    email: input.email,
                }
            });
            if (!userExists || !userExists.hashedPassword) {
                return { status : 'error', message: 'Invalid email or password' };
            }else {
                const passwordMatch = await bcrypt.compare(input.hashedPassword, userExists.hashedPassword);
                if(!passwordMatch) {
                    return { status: 'error', message: 'Invalid email or password' };
                }else{
                    return { status: 'success', message: 'User logged in successfully' };
                }
            }
        })   

})