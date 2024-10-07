import userSchema from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const User = mongoose.model('User', userSchema);

app.post('/register', async (req:any, res:any) => {
   const { username, password } = req.body;

   try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
         return res.status(400).json({ message: 'Usuário já existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         username,
         password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
   } catch (error) {
      res.status(500).json({ message: 'Erro no servidor', error });
   }
});

app.post('/login', async (req:any, res:any) => {
   const { username, password } = req.body;

   try {
      const user = await User.findOne({ username });
      if (!user) {
         return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ userId: user._id }, '@rl31z1nh4');

      res.json({ message: 'Login realizado com sucesso', token });
   } catch (error) {
      res.status(500).json({ message: 'Erro no servidor', error });
   }
});

app.get('/protected', (req: any, res: any) => {
   const token = req.headers['authorization']?.substring(7); // Ensure the token exists
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


// app.post('/home', aync (req, res) => {
   
// })

export default app