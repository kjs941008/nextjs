import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
        const { email } = req.body;
        try {
          const existingUser = await prisma.member.findFirst({
            where: {
              email: email,
            },
          });
          if (existingUser) {
            res.status(200).json({ isDuplicate: false });
            console.log('있다')
          } else {
            res.status(200).json({ isDuplicate: true });
            console.log('없다')
          }
        } catch (error) {
          console.error('Error checking duplicate user:', error);
          res.status(500).json({ error: 'Server error' });
        }
  };
