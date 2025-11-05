// src/pages/Cadastro.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import API from "../api";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", password: "", confirm: "" });

  useEffect(() => {
    document.title = "Cadastro - VaxControl";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("❌ As senhas não coincidem!");
      return;
    }
    try {
      await API.post("/users/register", {
        nome: form.nome,
        email: form.email,
        password: form.password,
      });
      alert("✅ Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("❌ Falha ao criar conta. Verifique os dados.");
    }
  };

  const leftContent = (
    <div className="flex flex-col items-center text-center px-8 md:px-10">
      {/* (conteúdo lateral mantido exatamente igual) */}
      ...
    </div>
  );

  return (
    <AuthLayout leftContent={leftContent}>
      <h2 className="text-2xl font-bold mb-6">Criar Conta</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm mb-1">Nome Completo *</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:ring-2 focus:ring-green-500"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">E-mail *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:ring-2 focus:ring-green-500"
            placeholder="seu.email@exemplo.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Senha *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:ring-2 focus:ring-green-500"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Confirmar Senha *</label>
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:ring-2 focus:ring-green-500"
            placeholder="Confirme sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-md font-medium transition"
        >
          Cadastrar
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Já possui uma conta?{" "}
          <Link to="/" className="text-green-400 hover:underline">
            Fazer login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
