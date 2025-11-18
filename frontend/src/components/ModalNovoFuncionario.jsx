import React, { useState } from "react";
import { X } from "lucide-react";
import API from "../api";

export default function ModalNovoFuncionario({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Nome é obrigatório";
    if (!form.email.includes("@")) temp.email = "E-mail inválido";
    if (form.password.length < 6)
      temp.password = "Senha deve ter no mínimo 6 caracteres";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await API.post("/users/register", { ...form, tipo: "funcionario" });
      alert("Funcionário criado com sucesso!");
      onSuccess();
      onClose();
    } catch {
      alert("Erro ao criar funcionário.");
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
          Adicionar Funcionário
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">

          <div>
            <label className="block text-gray-400 mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
            {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Senha</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input"
            />
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password}</p>
            )}
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
