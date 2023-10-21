import { z } from 'zod';

export const UserInput = z.object({
    email: z.string().email(),
    hashedPassword: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
});