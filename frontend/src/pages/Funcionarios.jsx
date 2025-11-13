import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../api";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Carrega funcionários do backend
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const res = await API.get("/users");
      setFuncionarios(res.data.filter(u => u.tipo === "funcionario"));
    } catch (err) {
      alert("Erro ao carregar funcionários");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", { ...form, tipo: "funcionario" });
      setForm({ name: "", email: "", password: "" });
      fetchFuncionarios();
    } catch (err) {
      alert("Erro ao adicionar funcionário");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja remover este funcionário?")) return;
    try {
      await API.delete(`/users/${id}`);
      fetchFuncionarios();
    } catch (err) {
      alert("Erro ao remover funcionário");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Funcionários</h2>
          {/* Formulário de cadastro */}
          <form onSubmit={handleAdd} className="bg-[#1e293b] p-5 rounded-lg mb-6 flex flex-col gap-3 max-w-md">
            <h4 className="font-semibold mb-2">Adicionar Funcionário</h4>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome"
              required
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E-mail"
              required
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Senha"
              required
              className="px-3 py-2 rounded bg-[#0b1120] border border-[#334155] text-gray-200"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
            >
              Adicionar
            </button>
          </form>
          {/* Lista de funcionários */}
          <div className="bg-[#1e293b] p-5 rounded-lg">
            <h4 className="font-semibold mb-4">Lista de Funcionários</h4>
            <table className="w-full text-left">
              <thead>
                <tr className="text-green-400">
                  <th className="py-2">Nome</th>
                  <th className="py-2">E-mail</th>
                  <th className="py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-400">
                      Nenhum funcionário cadastrado.
                    </td>
                  </tr>
                )}
                {funcionarios.map((f) => (
                  <tr key={f._id} className="border-b border-[#334155]">
                    <td className="py-2">{f.name || f.nome}</td>
                    <td className="py-2">{f.email}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDelete(f._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
