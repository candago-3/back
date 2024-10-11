import userSchema from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import register from './register';
import login from './login';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/register', register);
app.use('/login', login)

app.get('/protected', (req: any, res: any) => {  //vai virar a home provavelmente
   const token = req.headers['authorization']?.substring(7); 
   if (!token) {
      return res.status(401).json({ message: 'Acesso negado, token não fornecido' });
   }

   try {
      const verified = jwt.verify(token, '@rl31z1nh4');

      if (typeof verified === 'object' && 'userId' in verified) {
         res.json({ message: 'Acesso concedido', userId: verified.userId });
      } else {
         res.status(401).json({ message: 'Token inválido' });
      }
   } catch (error) {
      res.status(401).json({ message: 'Token inválido ou expirado' });
   }
});

export default app