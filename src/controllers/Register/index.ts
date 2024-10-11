import { Request, Response } from 'express'
import userSchema from '../../models/user';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const User = mongoose.model('User', userSchema);

export async function register(req: Request, res: Response) : Promise<void> {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}