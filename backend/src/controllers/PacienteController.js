import Paciente from '../models/Paciente.js';
import mongoose from 'mongoose';

export const createPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    const saved = await paciente.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find().populate('historicoVacinas.vacina').sort({ createdAt: -1 });
    return res.json(pacientes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getPacienteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const paciente = await Paciente.findById(id).populate('historicoVacinas.vacina');
    if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
    return res.json(paciente);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const updated = await Paciente.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('historicoVacinas.vacina');
    if (!updated) return res.status(404).json({ error: 'Paciente não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const deleted = await Paciente.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Paciente não encontrado' });
    return res.json({ message: 'Paciente removido' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
