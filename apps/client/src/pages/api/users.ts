import { PrismaClient } from "database";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Perform database operations here using prisma
    const newUser = await prisma.user.create({
      data: {
        email: "swara8@gmail.com",
        firstName: "swaraj",
        lastName: "ballal",
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};
