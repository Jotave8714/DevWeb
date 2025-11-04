import React, { useState } from "react";
import { X } from "lucide-react";

export default function ModalNovaVacina({ onClose }) {
  const [form, setForm] = useState({
    nome: "",
    fabricante: "",
    lote: "",
    validade: "",
    doses: "",
    intervalo: "",
    reforco: "",
    publico: "Todos",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Vacina cadastrada com sucesso! (simulação visual)");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-8 w-full max-w-md shadow-xl relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        >
          <X size={20} />
        </button>

        {/* Título */}
        <h2 className="text-xl font-semibold text-white mb-6">Nova Vacina</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome e Fabricante */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Nome da Vacina
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: COVID-19 Pfizer"
              className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Fabricante
            </label>
            <input
              type="text"
              name="fabricante"
              value={form.fabricante}
              onChange={handleChange}
              placeholder="Ex: Pfizer"
              className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Lote e Validade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Lote Padrão
              </label>
              <input
                type="text"
                name="lote"
                value={form.lote}
                onChange={handleChange}
                placeholder="Ex: PF001"
                className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Validade
              </label>
              <input
                type="date"
                name="validade"
                value={form.validade}
                onChange={handleChange}
                className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Doses e Intervalo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Nº de Doses
              </label>
              <input
                type="number"
                name="doses"
                value={form.doses}
                onChange={handleChange}
                placeholder="Ex: 2"
                className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Intervalo (dias)
              </label>
              <input
                type="number"
                name="intervalo"
                value={form.intervalo}
                onChange={handleChange}
                placeholder="Ex: 21"
                className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Critérios de Reforço */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Critérios de Reforço
            </label>
            <textarea
              name="reforco"
              value={form.reforco}
              onChange={handleChange}
              placeholder="Ex: Reforço após 6 meses"
              className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] h-20 resize-none focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Público-Alvo */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Público-Alvo
            </label>
            <select
              name="publico"
              value={form.publico}
              onChange={handleChange}
              className="w-full bg-[#1e293b] text-gray-200 rounded-md px-3 py-2 border border-[#334155] focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option>Todos</option>
              <option>Adultos</option>
              <option>Estudantes</option>
              <option>Profissionais da Saúde</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-gray-200 font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-medium transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
