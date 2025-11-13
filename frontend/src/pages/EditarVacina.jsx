import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../api";

export default function EditarVacina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    fabricante: "",
    lote: "",
    validade: "",
    doses: "",
    intervalo: "",
    publico: "",
    status: "",
  });

  useEffect(() => {
    const fetchVacina = async () => {
      try {
        const res = await API.get(`/vacinas/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("Erro ao carregar vacina.");
      }
    };
    fetchVacina();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/vacinas/${id}`, form);
      alert("Vacina atualizada!");
      navigate("/vacinas");
    } catch (err) {
      alert("Erro ao atualizar vacina.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Editar Vacina</h2>
          <form onSubmit={handleSubmit} className="bg-[#1e293b] p-5 rounded-lg flex flex-col gap-3">
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome"
              required
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="text"
              name="fabricante"
              value={form.fabricante}
              onChange={handleChange}
              placeholder="Fabricante"
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="text"
              name="lote"
              value={form.lote}
              onChange={handleChange}
              placeholder="Lote"
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="date"
              name="validade"
              value={form.validade ? form.validade.substring(0,10) : ""}
              onChange={handleChange}
              placeholder="Validade"
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="number"
              name="doses"
              value={form.doses}
              onChange={handleChange}
              placeholder="Doses"
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="number"
              name="intervalo"
              value={form.intervalo}
              onChange={handleChange}
              placeholder="Intervalo (dias)"
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="text"
              name="publico"
              value={form.publico}
              onChange={handleChange}
              placeholder="Público"
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            >
              <option value="">Status</option>
              <option value="Ativa">Ativa</option>
              <option value="Vencendo">Vencendo</option>
              <option value="Inativa">Inativa</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold mt-2"
            >
              Salvar Alterações
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
