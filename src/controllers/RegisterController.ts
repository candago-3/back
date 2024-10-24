import { Request, Response } from 'express'
import { User } from '../models';
import bcrypt from 'bcryptjs'

export async function register(req: Request, res: Response) : Promise<any> {
    const { mail, password } = req.body;
    try {
        const existingUser = await User.findOne({ mail });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            mail,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro no servidor', error });
    }
}