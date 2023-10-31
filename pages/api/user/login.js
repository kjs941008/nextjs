import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// 세션 데이터 설정
//Cookies.set('userSession', 'userData');

// 세션 데이터 가져오기
//const sessionData = Cookies.get('userSession');

const prisma = new PrismaClient();

async function login (req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      
      
      const userinfo = await prisma.member.findFirst({
          where: {
            email: email,
          },
        });
        
        if (!userinfo) {
          //회원 정보 없음
          res.status(401).json({ message: '로그인 실패: 사용자가 존재하지 않습니다.' });
        } else {
          if (userinfo.password === password) {
            console.log(`이름: ${userinfo.username}`);
            console.log(`이메일: ${userinfo.email}`);
            console.log(`권한: ${userinfo.authority}`);
            // 에시스 토근
            const accessToken = jwt.sign({
              username : userinfo.username,
              email : userinfo.email,
              authority : userinfo.authority
            },process.env.access_secret,{
              expiresIn : '1m',
              issuer : 'kim',
            });
            //리프레쉬 토큰
            const refreshToken = jwt.sign({
              username : userinfo.username,
              email : userinfo.email,
              authority : userinfo.authority
            }, process.env.refresh_secret,{
              expiresIn : '24h',
              issuer : 'kim',
            });

            console.log(`에시스 토큰 : ${accessToken}`);
            console.log(`리프레쉬 토큰 : ${refreshToken}`);

            //토큰 전송
            const cookieOptions = {
              secure: false,    // 개발 환경에서는 false로 설정
              httpOnly: true,
              sameSite: 'strict', // 적절한 SameSite 설정 추가
              path: '/',          // 적절한 경로 설정 추가
            };

            res.setHeader('Set-Cookie', [
              serialize('accessToken', accessToken, cookieOptions),
              serialize('refreshToken', refreshToken, cookieOptions),
            ]);



            res.status(200).json({ message: '로그인 성공'});
        } else {
            res.status(401).json({ message: '로그인 실패: 비밀번호가 일치하지 않습니다.' });
        }
      }
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

export default login;