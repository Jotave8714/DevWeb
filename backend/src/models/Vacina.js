import mongoose from 'mongoose';

const vacinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  fabricante: { type: String },
  quantidade: { type: Number, required: true, default: 0 },
  validade: { type: Date }
}, { timestamps: true });

export default mongoose.model('Vacina', vacinaSchema);
