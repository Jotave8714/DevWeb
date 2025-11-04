import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Syringe, CheckCircle, Clock, Calendar, Plus } from "lucide-react";
import ModalNovaVacina from "../components/ModalNovaVacina";

export default function Vacinas() {
  const [showModal, setShowModal] = useState(false);

  const vacinas = [
    { nome: "COVID-19 Pfizer", fabricante: "Pfizer", lote: "PF001", validade: "12/2024", doses: 2, intervalo: "21 dias", publico: "Adultos UNIFOR", status: "Ativa", cor: "text-green-400" },
    { nome: "Influenza H1N1", fabricante: "Sanofi", lote: "SF002", validade: "06/2024", doses: 1, intervalo: "365 dias", publico: "Todos", status: "Vencendo", cor: "text-yellow-400" },
    { nome: "Hepatite B", fabricante: "GSK", lote: "GS003", validade: "03/2025", doses: 3, intervalo: "30 dias", publico: "Estudantes", status: "Ativa", cor: "text-green-400" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        <Header />

        <main className="p-8 space-y-8">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937] flex flex-col items-center justify-center">
              <Syringe className="text-green-400 mb-2" size={22} />
              <p className="text-sm text-gray-400">Total de Vacinas</p>
              <p className="text-xl font-semibold">24</p>
            </div>
            <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937] flex flex-col items-center justify-center">
              <CheckCircle className="text-green-400 mb-2" size={22} />
              <p className="text-sm text-gray-400">Ativas</p>
              <p className="text-xl font-semibold">18</p>
            </div>
            <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937] flex flex-col items-center justify-center">
              <Clock className="text-yellow-400 mb-2" size={22} />
              <p className="text-sm text-gray-400">Vencendo</p>
              <p className="text-xl font-semibold">3</p>
            </div>
            <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937] flex flex-col items-center justify-center">
              <Calendar className="text-red-400 mb-2" size={22} />
              <p className="text-sm text-gray-400">Inativas</p>
              <p className="text-xl font-semibold">3</p>
            </div>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto border border-[#1f2937] rounded-xl bg-[#111827]">
            <table className="w-full text-sm text-gray-300">
              <thead className="bg-[#1f2937] text-gray-400 uppercase text-xs">
                <tr>
                  <th className="py-3 px-4 text-left">Nome</th>
                  <th className="py-3 px-4 text-left">Fabricante</th>
                  <th className="py-3 px-4 text-left">Lote</th>
                  <th className="py-3 px-4 text-left">Validade</th>
                  <th className="py-3 px-4 text-left">Doses</th>
                  <th className="py-3 px-4 text-left">Intervalo</th>
                  <th className="py-3 px-4 text-left">Público</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {vacinas.map((v, i) => (
                  <tr key={i} className="border-t border-[#1f2937] hover:bg-[#1a2333] transition">
                    <td className="py-3 px-4 font-medium text-white">{v.nome}</td>
                    <td className="py-3 px-4">{v.fabricante}</td>
                    <td className="py-3 px-4">{v.lote}</td>
                    <td className="py-3 px-4">{v.validade}</td>
                    <td className="py-3 px-4">{v.doses}</td>
                    <td className="py-3 px-4">{v.intervalo}</td>
                    <td className="py-3 px-4">{v.publico}</td>
                    <td className={`py-3 px-4 font-semibold ${v.cor}`}>{v.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Botão flutuante fixo */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition duration-300"
        >
          <Plus size={20} /> Nova Vacina
        </button>
      </div>

      {showModal && <ModalNovaVacina onClose={() => setShowModal(false)} />}
    </div>
  );
}
