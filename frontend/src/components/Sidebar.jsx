// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Syringe,
  ClipboardList,
  Database,
  Activity,
  BarChart3,
  Calendar,
  AlertCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Início", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
  { name: "Pacientes", icon: <Users size={18} />, path: "/pacientes" },
  { name: "Registro de Vacinas", icon: <Syringe size={18} />, path: "/vacinas" },
  { name: "Esquemas de doses", icon: <ClipboardList size={18} />, path: "/doses" },
  { name: "Estoques e lotes", icon: <Database size={18} />, path: "/estoques" },
  { name: "Rastreabilidade", icon: <Activity size={18} />, path: "/rastreabilidade" },
  { name: "Relatórios", icon: <BarChart3 size={18} />, path: "/relatorios" },
  { name: "Central de Ajuda", icon: <HelpCircle size={18} />, path: "/ajuda" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#0f172a] text-gray-200 flex flex-col min-h-screen border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-green-500 w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold">
          💉
        </div>
        <div>
          <h1 className="font-bold text-lg">VaxControl</h1>
          <p className="text-xs text-gray-400">Sistema de Vacinas</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
              location.pathname === item.path
                ? "bg-green-500 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Usuário (rodapé) */}
      <div className="border-t border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Dr. João Silva</p>
            <p className="text-xs text-gray-400">Administrador</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-400">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
