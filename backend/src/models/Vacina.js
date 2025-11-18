// models/Vacina.js
import mongoose from "mongoose";

const vacinaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    fabricante: { type: String },
    lotePadrao: { type: String },

    numDoses: { type: Number, required: true, default: 1 },

    intervalosDias: {
      type: [Number],
      default: [],
    },

    pubaAlvo: { type: String },

    validade: { type: Date },

    status: {
      type: String,
      enum: ["Ativa", "Vencendo", "Inativa"],
      default: "Ativa",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vacina", vacinaSchema);
