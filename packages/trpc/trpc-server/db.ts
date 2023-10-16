import { PrismaClient, Role } from "database";  
export { Role } from "database";

const prismadb = new PrismaClient();

type UserInput = {
    email: string;
    hashedPassword: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: Role;
    emailVerified?: Date | null;
    updatedAt: Date;
    createdAt: Date;
}

export const db = {
    user: {
        findMany: async () => prismadb.user.findMany(),
        findById: async (id: string) => prismadb.user.findUnique({ where: { id } }),
        create: async (data: UserInput) => {
            const user = await prismadb.user.create({ data });
            return user;
        },
    }
    
};
