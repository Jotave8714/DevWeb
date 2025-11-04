// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { Users, Syringe, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 space-y-6">
          {/* Banner */}
          <div className="bg-green-600 text-white rounded-lg p-5 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Bem-vindo de volta!</h3>
              <p className="text-sm text-green-100">
                Gerencie vacinas e pacientes de forma eficiente.
              </p>
            </div>
            <span className="text-3xl">🛡️</span>
          </div>

          {/* Estatísticas + Ações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Total de Pacientes"
              value="1,247"
              trend="+12% este mês"
              icon={<Users size={18} />}
              color="bg-green-500/20 text-green-400"
            />
            <StatCard
              title="Vacinas Aplicadas"
              value="3,892"
              trend="+8% esta semana"
              icon={<Syringe size={18} />}
              color="bg-green-500/20 text-green-400"
            />
            <StatCard
              title="Estoque Baixo"
              value="3"
              trend="Requer atenção"
              icon={<AlertTriangle size={18} />}
              color="bg-red-500/20 text-red-400"
            />

            {/* Gerenciar Pacientes */}
            <div className="bg-[#1e293b] p-5 rounded-lg text-center">
              <div className="text-green-400 text-3xl mb-2">👥</div>
              <h4 className="font-semibold mb-1">Gerenciar Pacientes</h4>
              <p className="text-sm text-gray-400 mb-3">
                Visualize e gerencie informações dos pacientes
              </p>
              <button
                onClick={() => navigate("/pacientes")}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 px-4 rounded-md"
              >
                Acessar Lista
              </button>
            </div>

            {/* Registrar Vacina */}
            <div className="bg-[#1e293b] p-5 rounded-lg text-center">
              <div className="text-green-400 text-3xl mb-2">💉</div>
              <h4 className="font-semibold mb-1">Registrar Vacina</h4>
              <p className="text-sm text-gray-400 mb-3">
                Registre uma nova aplicação de vacina
              </p>
              <button
                onClick={() => navigate("/vacinas", { state: { openModal: true } })}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 px-4 rounded-md"
              >
                Novo Registro
              </button>
            </div>

            {/* Perfil */}
            <div className="bg-[#1e293b] p-5 rounded-lg text-center">
              <div className="text-green-400 text-3xl mb-2">👤</div>
              <h4 className="font-semibold mb-1">Meu Perfil</h4>
              <p className="text-sm text-gray-400 mb-3">
                Gerencie suas informações pessoais
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 px-4 rounded-md">
                Ver Perfil
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
