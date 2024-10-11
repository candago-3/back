import { Request, Response } from 'express'
import userSchema from '../../models/user';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = mongoose.model('User', userSchema);

export default async function login(req:Request, res:Response) : Promise<void> {
    const { username, password } = req.body;
 
    try {
       const user:any = await User.findOne({ username });
       if (!user) {
          res.status(400).json({ message: 'Usuário não encontrado' });
       }
 
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
          res.status(400).json({ message: 'Senha incorreta' });
       }
 
       const token = jwt.sign({ userId: user._id }, '@rl31z1nh4');
 
       res.json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
       res.status(500).json({ message: 'Erro no servidor', error });
    }
 };