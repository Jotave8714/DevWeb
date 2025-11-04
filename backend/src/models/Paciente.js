import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  endereco: { type: String },
  telefone: { type: String },
  genero: { type: String, enum: ['Masculino', 'Feminino', 'Outro'] },
  email: { type: String },  
  historicoVacinas: [{
    vacina: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacina' },
    dataAplicacao: { type: Date },
    dose: { type: String } // ex: 1ª dose, reforço etc
  }]
}, { timestamps: true });

export default mongoose.model('Paciente', pacienteSchema);
