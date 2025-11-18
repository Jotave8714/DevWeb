import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Eye, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ModalNovoFuncionario from "../components/ModalNovoFuncionario";

export default function Funcionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Carrega funcionários do backend
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const res = await API.get("/users");
        setFuncionarios(res.data.filter((u) => u.tipo === "funcionario"));
      } catch (err) {
        console.error("Erro ao carregar funcionários:", err);
      }
    };

    fetchFuncionarios();
  }, []);

  // Remover funcionário
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este funcionário?")) return;

    try {
      await API.delete(`/users/${id}`);
      setFuncionarios((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Erro ao excluir funcionário:", err);
      alert("Erro ao excluir funcionário.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        <Header />

        <main className="p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Funcionários</h2>

          <div className="bg-[#111827] rounded-lg border border-[#1f2937] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1e293b] text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left">E-mail</th>
                  <th className="px-4 py-3 text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {funcionarios.length > 0 ? (
                  funcionarios.map((f) => (
                    <tr
                      key={f._id}
                      className="border-t border-[#1f2937] hover:bg-[#1e293b]/60 transition"
                    >
                      <td className="px-4 py-3 text-white">{f.name}</td>
                      <td className="px-4 py-3">{f.email}</td>

                      {/* Ações */}
                      <td className="px-4 py-3 text-center flex justify-center gap-4">
                        <button
                          className="text-gray-400 hover:text-blue-400"
                          onClick={() =>
                            alert(`Visualizar funcionário:\n${f.name}\n${f.email}`)
                          }
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          className="text-gray-400 hover:text-red-400"
                          onClick={() => handleDelete(f._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-400">
                      Nenhum funcionário cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Botão flutuante */}
          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition duration-300"
          >
            <Plus size={20} /> Novo Funcionário
          </button>

          {/* Modal */}
          {showModal && (
            <ModalNovoFuncionario
              onClose={() => setShowModal(false)}
              onSuccess={() => window.location.reload()}
            />
          )}
        </main>
      </div>
    </div>
  );
}
