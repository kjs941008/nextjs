import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.refresh_secret);
        console.log(data.username)
        console.log(data.email)
        console.log(data.authority)
        const userinfo = await prisma.member.findFirst({
            where: {
              email: data.email,
            },
        });
        if(userinfo){
            res.status(200).json({ message: '로그인 되어있다',
                            name : data.username,
                            email : data.email,
                            authority : data.authority});
        }else{
            
        }
        
        
        console.log("있다");
    } catch (error) {
        res.status(200).json(error);
    }
};