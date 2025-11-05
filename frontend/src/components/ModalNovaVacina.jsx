import React, { useState } from "react";
import { X } from "lucide-react";
import API from "../api";

export default function ModalNovaVacina({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nome: "",
    fabricante: "",
    lote: "",
    validade: "",
    doses: "",
    intervalo: "",
    publico: "",
    status: "Ativa",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/vacinas", form);
      alert("Vacina cadastrada com sucesso!");
      onSuccess(); // 🔁 atualiza lista
      onClose();
    } catch (err) {
      console.error("Erro ao cadastrar vacina:", err);
      alert("Erro ao cadastrar vacina!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111827] rounded-xl p-6 w-full max-w-lg border border-[#1f2937] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          Cadastrar Nova Vacina
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {[
            { label: "Nome", name: "nome" },
            { label: "Fabricante", name: "fabricante" },
            { label: "Lote", name: "lote" },
            { label: "Validade", name: "validade", type: "date" },
            { label: "Doses", name: "doses" },
            { label: "Intervalo", name: "intervalo" },
            { label: "Público", name: "publico" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-gray-400 mb-1">{f.label}</label>
              <input
                type={f.type || "text"}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                required
                className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-400 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-green-500"
            >
              <option>Ativa</option>
              <option>Vencendo</option>
              <option>Inativa</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              {loading ? "Salvando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}