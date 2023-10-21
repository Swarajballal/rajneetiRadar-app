import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import bcrypt from 'bcrypt';
import { UserInput } from '../../../common'

export const userRouter = createTRPCRouter({

    signup: publicProcedure
        .input(UserInput)
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

                if (input.hashedPassword === null) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Password cannot be null',
                    });
                }
                const hashedPassword = await bcrypt.hash(input.hashedPassword, 10);
                await opts.ctx.db.user.create({
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
        .input(UserInput.omit({ firstName: true, lastName: true }))
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
                if (input.hashedPassword === null) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Password cannot be null',
                    });
                }
                const passwordMatch = await bcrypt.compare(input.hashedPassword, userExists.hashedPassword);
                if(!passwordMatch) {
                    return { status: 'error', message: 'Invalid email or password' };
                }else{
                    return { status: 'success', message: 'User logged in successfully' };
                }
            }
        }),
        
    me: protectedProcedure
        .output(UserInput.omit({ hashedPassword: true, lastName: true, firstName: true }))
        .query(async (opts) => {
            let response = await opts.ctx.db.user.findUnique({
                where: {
                    id: opts.ctx.session?.user.id,
                }
            });
            if (!response) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
            }
            return {
                email: response.email || "",
           }
        }),
        

})