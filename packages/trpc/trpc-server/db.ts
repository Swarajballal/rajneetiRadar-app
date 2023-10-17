import { PrismaClient, Role, User } from "database";  
export { Role } from "database";
import { z } from "zod";

const prismadb = new PrismaClient();

const UserInput = z.object({
    email: z.string().email(),
    hashedPassword: z.string().max(8),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
});

const UserCreationInput = z.object({
    email: z.string().email(),
    hashedPassword: z.string().max(8),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    role: z.nativeEnum(Role),
    emailVerified: z.date().nullable(),
    updatedAt: z.date(),
    createdAt: z.date(),
});

export const db = {
    user: {
        findMany: async () => prismadb.user.findMany(),
        findById: async (id: User['id']) => prismadb.user.findUnique({ where: { id } }),
        findUnique: async (email: z.infer<typeof UserInput>['email']) => prismadb.user.findUnique({ where: { email } }),
        create: async (data: z.infer<typeof UserCreationInput>) => {
            const user = await prismadb.user.create({ data });
            return user;
        },
    }
};
