// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoCard from "../components/LogoCard";
import { Eye, EyeOff, Lock } from "lucide-react";
import API from "../api"; // ✅ conexão com backend

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" , tipo: ""});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - VaxControl";
  }, []);

  // 🧠 Atualiza os campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧠 Faz o login com backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // salva login local
      console.log("Usuário retornado:", res.data.user); // <-- debug
      alert("✅ Login realizado com sucesso!");
      res.data.user.tipo === "admin" ? navigate("/admin") : navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao logar:", err);
      alert("❌ E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center px-4">
      <div className="bg-[#111827] w-full max-w-md rounded-2xl shadow-lg p-8 border border-[#1f2937]">
        <div className="flex flex-col items-center mb-8">
          <LogoCard />
          <h2 className="text-2xl font-bold text-white mt-4">Bem-vindo de volta 👋</h2>
          <p className="text-gray-400 text-sm text-center mt-1">
            Acesse sua conta para gerenciar vacinas e pacientes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm block mb-2 text-gray-300">E-mail profissional</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu.email@hospital.com"
              required
              className="w-full px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-200"
            />
          </div>

          <div>
            <label className="text-sm block mb-2 text-gray-300">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="accent-green-500" />
              <label htmlFor="remember" className="text-gray-300">
                Lembrar de mim
              </label>
            </div>
            <Link to="/esqueci-senha" className="text-green-400 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Entrar no sistema
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-green-400 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>

      <p className="text-xs text-gray-500 mt-8">
        © 2025 VaxControl — Sistema de Gerenciamento de Vacinas
      </p>
    </div>
  );
}
