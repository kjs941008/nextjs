import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;
      
      // Prisma를 사용하여 데이터베이스에 유저 정보 저장
      const newMember = await prisma.member.create({
        data: {
          username,
          email,
          password,
        },
      });

      res.status(201).json({ message: 'User created successfully', member: newMember });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'User creation failed' });
    } finally {
      await prisma.$disconnect(); // Prisma 연결 종료
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};