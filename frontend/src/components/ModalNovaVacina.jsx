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

    const numDoses = Number(form.doses);

    // Intervalos tratados como array
    const intervalos = form.intervalo
      ? form.intervalo.split(",").map((n) => Number(n.trim()))
      : [];

    const intervalosNecessarios = numDoses - 1;

    // ====== 📌 VALIDAÇÕES AVANÇADAS ======

    // Checar se doses é número válido
    if (isNaN(numDoses) || numDoses < 1) {
      alert("Informe um número de doses válido!");
      setLoading(false);
      return;
    }

    // Validar quantidade exata de intervalos necessários
    if (intervalos.length !== intervalosNecessarios) {
      alert(
        `Esta vacina possui ${numDoses} dose(s).\n\n` +
          `➡ Você deve informar **${intervalosNecessarios} intervalo(s)** entre as doses.\n\n` +
          `Exemplo para ${numDoses} doses:\n` +
          `• 1ª → 2ª dose = intervalo 1\n` +
          `${numDoses > 2 ? `• 2ª → 3ª dose = intervalo 2\n` : ""}` +
          `${numDoses > 3 ? `• 3ª → 4ª dose = intervalo 3\n` : ""}`
      );
      setLoading(false);
      return;
    }

    // Checar se todos os intervalos são números > 0
    if (intervalos.some((n) => isNaN(n) || n <= 0)) {
      alert("Todos os intervalos devem ser números positivos (ex: 30, 60, 90).");
      setLoading(false);
      return;
    }

    // ====== 📌 ENVIAR PARA API ======
    try {
      const payload = {
        nome: form.nome,
        fabricante: form.fabricante,
        lotePadrao: form.lote,
        validade: form.validade,
        numDoses: numDoses,
        intervalosDias: intervalos,
        publicoAlvo: form.publico,
        status: form.status,
      };

      await API.post("/vacinas", payload);

      alert("Vacina cadastrada com sucesso!");
      onSuccess();
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

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          Cadastrar Nova Vacina
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">

          {/* Inputs padrões */}
          {[
            { label: "Nome", name: "nome" },
            { label: "Fabricante", name: "fabricante" },
            { label: "Lote", name: "lote" },
            { label: "Validade", name: "validade", type: "date" },
            { label: "Doses", name: "doses", type: "number" },
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

          {/* Intervalos */}
          <div>
            <label className="block text-gray-400 mb-1">
              Intervalos (ex: 30, 60)
            </label>
            <input
              type="text"
              name="intervalo"
              value={form.intervalo}
              onChange={handleChange}
              required
              className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-green-500"
            />
            <p className="text-gray-500 text-xs mt-1">
              Coloque {form.doses > 1 ? form.doses - 1 : 0} intervalo(s) separados por vírgula.
            </p>
          </div>

          {/* Público */}
          <div>
            <label className="block text-gray-400 mb-1">Público</label>
            <input
              type="text"
              name="publico"
              value={form.publico}
              onChange={handleChange}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 text-gray-200"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-400 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 text-gray-200"
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
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              {loading ? "Salvando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
