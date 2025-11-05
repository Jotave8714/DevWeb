// src/pages/Cadastro.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import API from "../api";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Cadastro - VaxControl";
  }, []);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("❌ As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        password: form.password,
      };

      await API.post("/users", payload);
      alert("✅ Usuário cadastrado com sucesso!");
      navigate("/"); // 🔁 Redireciona para a tela de login
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      alert("❌ Erro ao cadastrar usuário!");
    } finally {
      setLoading(false);
    }
  };

  // Conteúdo da esquerda (mantido igual)
  const leftContent = (
    <div className="flex flex-col items-center text-center px-8 md:px-10">
      <div className="bg-white/20 p-4 rounded-full mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="Médico"
          className="w-16 h-16"
        />
      </div>

      <h1 className="text-3xl font-bold mb-1">VaxControl</h1>
      <p className="text-white/90 mb-8 text-base">
        Sistema de Gerenciamento de Vacinas
      </p>

      <div className="space-y-6 w-full max-w-xs text-left">
        <div className="flex items-start gap-3">
          <div className="bg-white/25 p-3 rounded-lg flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2910/2910756.png"
              alt="Controle"
              className="w-6 h-6"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Controle Total</h3>
            <p className="text-sm text-white/90">
              Gerencie vacinas com precisão e facilidade.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-white/25 p-3 rounded-lg flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
              alt="Gráfico"
              className="w-6 h-6"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Relatórios Avançados</h3>
            <p className="text-sm text-white/90">
              Análises completas e atualizadas em tempo real.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-white/25 p-3 rounded-lg flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3176/3176364.png"
              alt="Segurança"
              className="w-6 h-6"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Segurança Total</h3>
            <p className="text-sm text-white/90">
              Dados protegidos e criptografados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Layout principal
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
            required
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite seu nome completo"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">E-mail *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="seu.email@exemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Senha *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite sua senha"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Confirmar Senha *</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Confirme sua senha"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-md font-medium transition"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
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
