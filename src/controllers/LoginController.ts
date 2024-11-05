import { Request, Response } from 'express'
import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(req:Request, res:Response) : Promise<any> {
    const { mail, password } = req.body;
    
    try {
       const user:any = await User.findOne({ mail });
       if (!user) {
          return res.status(400).json({ message: 'Usuário não encontrado' });
       }
 
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(400).json({ message: 'Senha incorreta' });
       }
       
       const token = jwt.sign({ userId: user._id }, '@rl31z1nh4');

       const user_id = user._id
 
       return res.json({ message: 'Login realizado com sucesso', token, user_id });
    } catch (error) {
       return res.status(500).json({ message: 'Erro no servidor', error });
    }
 };