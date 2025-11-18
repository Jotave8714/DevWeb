// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const cargo = user.tipo === "admin" ? "Administrador" : "Funcionário";

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard": return "Dashboard";
      case "/pacientes": return "Lista de Pacientes";
      case "/vacinas": return "Gestão de Vacinas";
      case "/funcionarios": return "Gestão de Funcionários";
      case "/doses": return "Esquemas de Doses"; 
      default: return "VaxControl";
    }
  };

  return (
    <header className="bg-[#0f172a] border-b border-gray-800 p-6">
      <h2 className="text-2xl font-semibold text-white">{getTitle()}</h2>

      {/* 🔥 Ajuste do cargo */}
      <p className="text-sm text-gray-400 mt-1">
        {user.nome || "Usuário"} — {cargo}
      </p>
    </header>
  );
}
