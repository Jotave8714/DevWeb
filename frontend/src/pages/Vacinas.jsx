import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Syringe,
  CheckCircle,
  Clock,
  Calendar,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import ModalNovaVacina from "../components/ModalNovaVacina";
import API from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export default function Vacinas() {
  const [showModal, setShowModal] = useState(false);
  const [vacinas, setVacinas] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();
  const location = useLocation(); // ✅ AQUI SIM!

  // Buscar vacinas
  const fetchVacinas = async () => {
    try {
      const res = await API.get("/vacinas");
      setVacinas(res.data);

      // 🔥 Abre o modal automaticamente se vier do EsquemasDoses
      if (location.state?.novaVacina) {
        setShowModal(true);

        // Limpa state para não ficar abrindo sempre
        navigate("/vacinas", { replace: true });
      }
    } catch (err) {
      console.error("Erro ao buscar vacinas:", err);
    }
  };

  useEffect(() => {
    fetchVacinas();
  }, []);

  // Contadores
  const total = vacinas.length;
  const ativas = vacinas.filter((v) => v.status === "Ativa").length;
  const vencendo = vacinas.filter((v) => v.status === "Vencendo").length;
  const inativas = vacinas.filter((v) => v.status === "Inativa").length;

  // Excluir vacina (admin)
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta vacina?")) {
      try {
        await API.delete(`/vacinas/${id}`);
        setVacinas((prev) => prev.filter((v) => v._id !== id));
      } catch (err) {
        alert("Erro ao excluir vacina.");
      }
    }
  };

  // Editar vacina (ambos)
  const handleEdit = (id) => {
    navigate(`/vacinas/editar/${id}`);
  };

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
              <p className="text-xl font-semibold">{total}</p>
            </div>

            <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937] flex flex-col items-center justify-center">
              <CheckCircle className="text-green-400 mb-2" size={22} />
              <p className="text-sm text-gray-400">Ativas</p>
              <p className="text-xl font-semibold">{ativas}</p>
            </div>

            <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937] flex flex-col items-center justify-center">
              <Clock className="text-yellow-400 mb-2" size={22} />
              <p className="text-sm text-gray-400">Vencendo</p>
              <p className="text-xl font-semibold">{vencendo}</p>
            </div>

            <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937] flex flex-col items-center justify-center">
              <Calendar className="text-red-400 mb-2" size={22} />
              <p className="text-sm text-gray-400">Inativas</p>
              <p className="text-xl font-semibold">{inativas}</p>
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
                  {/* <th className="py-3 px-4 text-left">Intervalo (dias)</th> */}
                  <th className="py-3 px-4 text-left">Público</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {vacinas.length > 0 ? (
                  vacinas.map((v) => (
                    <tr
                      key={v._id}
                      className="border-t border-[#1f2937] hover:bg-[#1a2333] transition"
                    >
                      <td className="py-3 px-4 font-medium text-white">
                        {v.nome}
                      </td>

                      <td className="py-3 px-4">{v.fabricante || "—"}</td>

                      {/* LOTE */}
                      <td className="py-3 px-4">{v.lotePadrao || "—"}</td>

                      {/* VALIDADE */}
                      <td className="py-3 px-4">
                        {v.validade
                          ? new Date(v.validade).toLocaleDateString("pt-BR")
                          : "—"}
                      </td>

                      {/* DOSES */}
                      <td className="py-3 px-4">{v.numDoses ?? "—"}</td>

                      {/* INTERVALOS — se quiser remover, basta apagar TODO este td
                      <td className="py-3 px-4">
                        {Array.isArray(v.intervalosDias) &&
                        v.intervalosDias.length > 0
                          ? v.intervalosDias.join(" / ")
                          : "—"}
                      </td> */}

                      {/* PÚBLICO */}
                      <td className="py-3 px-4">{v.pubaAlvo || "—"}</td>

                      {/* STATUS */}
                      <td
                        className={`py-3 px-4 font-semibold ${
                          v.status === "Ativa"
                            ? "text-green-400"
                            : v.status === "Vencendo"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {v.status}
                      </td>

                      {/* AÇÕES */}
                      <td className="py-3 px-4 flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(v._id)}
                          className="text-gray-400 hover:text-green-400"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>

                        {user.tipo === "admin" && (
                          <button
                            onClick={() => handleDelete(v._id)}
                            className="text-gray-400 hover:text-red-400"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-400">
                      Nenhuma vacina cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* Botão Nova Vacina — admin & funcionário */}
        {["admin", "funcionario"].includes(user.tipo) && (
          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition duration-300"
          >
            <Plus size={20} /> Nova Vacina
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ModalNovaVacina
          onClose={() => setShowModal(false)}
          onSuccess={fetchVacinas}
        />
      )}
    </div>
  );
}
