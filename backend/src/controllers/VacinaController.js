import Vacina from '../models/Vacina.js';
import mongoose from 'mongoose';

export const createVacina = async (req, res) => {
  try {
    const vacina = new Vacina(req.body);
    const saved = await vacina.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getVacinas = async (req, res) => {
  try {
    const vacinas = await Vacina.find().sort({ createdAt: -1 });
    return res.json(vacinas);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getVacinaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const vacina = await Vacina.findById(id);
    if (!vacina) return res.status(404).json({ error: 'Vacina não encontrada' });
    return res.json(vacina);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateVacina = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const updated = await Vacina.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Vacina não encontrada' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteVacina = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const deleted = await Vacina.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Vacina não encontrada' });
    return res.json({ message: 'Vacina removida' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const createManyVacinas = async (req, res) => {
  try {
    const vacinas = req.body;

    if (!Array.isArray(vacinas)) {
      return res.status(400).json({ error: "O corpo da requisição deve ser um array de vacinas." });
    }

    const inserted = await Vacina.insertMany(vacinas, { ordered: false });

    return res.status(201).json(inserted);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

