// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoCard from "../components/LogoCard"; // ✅ usa seu componente
import { Eye, EyeOff, Lock } from "lucide-react"; // ícones modernos

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - VaxControl";
  }, []);

 const handleSubmit = (e) => {
  e.preventDefault();
  navigate("/dashboard"); // ✅ redireciona pra dashboard ao clicar
};


  return (
    <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center px-4">
      {/* Card principal */}
      <div className="bg-[#111827] w-full max-w-md rounded-2xl shadow-lg p-8 border border-[#1f2937]">
        {/* Logo e título */}
        <div className="flex flex-col items-center mb-8">
          <LogoCard />
          <h2 className="text-2xl font-bold text-white mt-4">Bem-vindo de volta 👋</h2>
          <p className="text-gray-400 text-sm text-center mt-1">
            Acesse sua conta para gerenciar vacinas e pacientes
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de e-mail */}
          <div>
            <label className="text-sm block mb-2 text-gray-300">E-mail profissional</label>
            <input
              type="email"
              placeholder="seu.email@hospital.com"
              required
              className="w-full px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-200"
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label className="text-sm block mb-2 text-gray-300">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Lembrar de mim */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-green-500"
              />
              <label htmlFor="remember" className="text-gray-300">
                Lembrar de mim
              </label>
            </div>
            <Link to="/esqueci-senha" className="text-green-400 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Entrar no sistema
          </button>

          {/* Link de cadastro */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-green-400 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>

      {/* Rodapé */}
      <p className="text-xs text-gray-500 mt-8">
        © 2025 VaxControl — Sistema de Gerenciamento de Vacinas
      </p>
    </div>
  );
}
