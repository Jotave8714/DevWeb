import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Eye, Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // 👈 import do arquivo que criamos

export default function Pacientes() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  // 🔄 Busca os pacientes ao montar o componente
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await API.get("/pacientes");
        setPacientes(res.data);
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
      }
    };
    fetchPacientes();
  }, []);

  // 🗑️ Função para excluir paciente
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      try {
        // 👇 Substitua o endpoint abaixo pelo correto da sua API
        await API.delete(`/pacientes/${id}`); 

        // Atualiza a lista local após exclusão
        setPacientes((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Erro ao excluir paciente:", err);
        alert("Erro ao excluir paciente. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />

        <main className="p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Pacientes</h2>

          <div className="bg-[#111827] rounded-lg border border-[#1f2937] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1e293b] text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left">CPF</th>
                  <th className="px-4 py-3 text-left">Telefone</th>
                  <th className="px-4 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.length > 0 ? (
                  pacientes.map((p) => (
                    <tr
                      key={p._id}
                      className="border-t border-[#1f2937] hover:bg-[#1e293b]/60 transition"
                    >
                      <td className="px-4 py-3 text-white">{p.nome}</td>
                      <td className="px-4 py-3">{p.cpf}</td>
                      <td className="px-4 py-3">{p.telefone || "-"}</td>
                      <td className="px-4 py-3 text-center flex justify-center gap-4">
                        <button
                          onClick={() => navigate(`/pacientes/detalhes/${p._id}`)}
                          className="text-gray-400 hover:text-blue-400"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/pacientes/editar/${p._id}`)}
                          className="text-gray-400 hover:text-green-400"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      Nenhum paciente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => navigate("/pacientes/novo")}
            className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition duration-300"
          >
            <Plus size={20} /> Novo Paciente
          </button>
        </main>
      </div>
    </div>
  );
}
