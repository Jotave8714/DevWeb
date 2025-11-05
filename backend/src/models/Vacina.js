import mongoose from 'mongoose';

const vacinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  fabricante: { type: String },
  lotePadrao: { type: String },
  numDoses: { type: Number, required: true, default: 0 },
  intervalosDias: { type: Number }, // array de intervalos entre doses
  reforco: { type: String }, // informações sobre reforço
  pubaAlvo: { type: String }, // público alvo
  validade: { type: Date },
  status: { type: String, enum: ['Ativa', 'Vencendo', 'Inativa'], default: 'Ativa' },
}, { timestamps: true });

export default mongoose.model('Vacina', vacinaSchema);
