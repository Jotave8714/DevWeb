import React from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Define o título dinamicamente com base na rota atual
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Início";
      case "/pacientes":
        return "Lista de Pacientes";
      case "/pacientes/detalhes":
        return "Dados do Paciente";
      case "/pacientes/editar":
        return "Editar Paciente";
      case "/vacinas":
        return "Gestão de Vacinas";
      case "/relatorios":
        return "Relatórios";
      default:
        return "VaxControl";
    }
  };

  return (
    <header className="bg-[#0f172a] border-b border-gray-800 p-6 flex justify-between items-center">
      <div>
        {/* Título da página atual */}
        <h2 className="text-2xl font-semibold text-white">{getTitle()}</h2>

        {/* Subtítulo com nome e cargo */}
        <p className="text-sm text-gray-400 mt-1">Dr. João Silva — Administrador</p>
      </div>
    </header>
  );
}
