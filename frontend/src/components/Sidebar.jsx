// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Syringe,
  ClipboardList,
  Database,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const cargo = user.tipo === "admin" ? "Administrador" : "Funcionário";

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔥 Aqui você define o link correto para o dashboard certo:
  const dashboardPath = user.tipo === "admin" ? "/admin" : "/dashboard";

  // 🔥 Menu dinâmico
  const menuItems = [
    { name: "Início", icon: <LayoutDashboard size={18} />, path: dashboardPath },
    { name: "Pacientes", icon: <Users size={18} />, path: "/pacientes" },
    { name: "Registro de Vacinas", icon: <Syringe size={18} />, path: "/vacinas" },
    { name: "Esquemas de doses", icon: <ClipboardList size={18} />, path: "/doses" },
    { name: "Relatórios", icon: <Database size={18} />, path: "/relatorios" },
  ];

  // 🔥 Somente ADMIN pode ver /funcionarios
  if (user.tipo === "admin") {
    menuItems.push({
      name: "Funcionários",
      icon: <Users size={18} />,
      path: "/funcionarios"
    });
  }

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

      {/* Rodapé usuário */}
      <div className="border-t border-gray-800 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{user.nome || "Usuário"}</p>
          <p className="text-xs text-gray-400">{cargo}</p>
        </div>
        <button onClick={logout} className="text-gray-400 hover:text-red-400">
          <LogOut size={18} />
        </button>
      </div>

    </aside>
  );
}
