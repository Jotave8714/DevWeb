import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Syringe, CheckCircle, Clock, Calendar, Plus } from "lucide-react";
import ModalNovaVacina from "../components/ModalNovaVacina";
import API from "../api";

export default function Vacinas() {
  const [showModal, setShowModal] = useState(false);
  const [vacinas, setVacinas] = useState([]);

  // 🔄 Buscar vacinas
  useEffect(() => {
    const fetchVacinas = async () => {
      try {
        const res = await API.get("/vacinas");
        setVacinas(res.data);
      } catch (err) {
        console.error("Erro ao buscar vacinas:", err);
      }
    };
    fetchVacinas();
  }, []);

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
              <p className="text-xl font-semibold">{vacinas.length}</p>
            </div>
            {/* mantém os outros cards iguais */}
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
                {vacinas.length > 0 ? (
                  vacinas.map((v) => (
                    <tr key={v._id} className="border-t border-[#1f2937] hover:bg-[#1a2333] transition">
                      <td className="py-3 px-4 font-medium text-white">{v.nome}</td>
                      <td className="py-3 px-4">{v.fabricante}</td>
                      <td className="py-3 px-4">{v.lote}</td>
                      <td className="py-3 px-4">{v.validade}</td>
                      <td className="py-3 px-4">{v.doses}</td>
                      <td className="py-3 px-4">{v.intervalo}</td>
                      <td className="py-3 px-4">{v.publico}</td>
                      <td className="py-3 px-4 text-green-400">{v.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-400">
                      Nenhuma vacina cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

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
