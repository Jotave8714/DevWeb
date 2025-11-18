// controllers/UserController.js
import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// 🟢 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) return res.status(401).json({ error: "Senha incorreta" });

    return res.json({
      message: "Login realizado com sucesso!",
      user: { 
        id: user._id, 
        nome: user.name,   // 🔥 O CERTO
        email: user.email,
        tipo: user.tipo
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 🟢 CADASTRO
export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    if (!password) return res.status(400).json({ error: 'Senha é obrigatória' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ ...rest, password: hashed });
    const saved = await user.save();

    saved.password = undefined;
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// 🟢 LISTAR TODOS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 🟢 BUSCAR POR ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 🟢 ATUALIZAR
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = { ...req.body };
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const updated = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!updated) return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// 🟢 DELETAR
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json({ message: "Usuário removido" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
