import { PrismaClient } from "database";
import { NextApiRequest, NextApiResponse } from "next";

const prismadb = new PrismaClient();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Perform database operations here using prisma
    const newUser = await prismadb.user.create({
      data: {
        email: "mewdfswdf@gmail.com",
        firstName: "swaraj",
        lastName: "ballal",
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prismadb.$disconnect();
  }
};
