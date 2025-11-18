import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { Users, Syringe, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    loadPacientes();
    loadVacinas();
  }, []);

  const loadPacientes = async () => {
    try {
      const res = await API.get("/pacientes");
      setPacientes(res.data);
    } catch (err) {
      console.error("Erro ao buscar pacientes:", err);
    }
  };

  const loadVacinas = async () => {
    try {
      const res = await API.get("/vacinas");
      setVacinas(res.data);
    } catch (err) {
      console.error("Erro ao buscar vacinas:", err);
    }
  };

  // Contadores
  const totalPacientes = pacientes.length;
  const totalVacinas = vacinas.length;
  const estoqueBaixo = vacinas.filter(v => v.doses < 10).length;

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 space-y-6">
          {/* Banner */}
          <div className="bg-green-600 text-white rounded-lg p-5 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Bem-vindo!</h3>
              <p className="text-sm text-green-100">
                Gerencie vacinas, pacientes e funcionários.
              </p>
            </div>
            <span className="text-3xl">🛡️</span>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <StatCard
              title="Total de Pacientes"
              value={totalPacientes}
              icon={<Users size={18} />}
              color="bg-green-500/20 text-green-400"
            />

            <StatCard
              title="Vacinas Cadastradas"
              value={totalVacinas}
              icon={<Syringe size={18} />}
              color="bg-green-500/20 text-green-400"
            />

            <StatCard
              title="Estoque Baixo"
              value={estoqueBaixo}
              trend="Requer atenção"
              icon={<AlertTriangle size={18} />}
              color="bg-red-500/20 text-red-400"
            />
          </div>

          {/* Ações */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

            {/* Gerenciar Pacientes */}
            <div className="bg-[#1e293b] p-5 rounded-lg text-center">
              <div className="text-green-400 text-3xl mb-2">👥</div>
              <h4 className="font-semibold mb-1">Gerenciar Pacientes</h4>
              <p className="text-sm text-gray-400 mb-3">
                Controle completo de pacientes.
              </p>
              <button
                onClick={() => navigate("/pacientes")}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 px-4 rounded-md"
              >
                Acessar Lista
              </button>
            </div>

            {/* Vacinas */}
            <div className="bg-[#1e293b] p-5 rounded-lg text-center">
              <div className="text-green-400 text-3xl mb-2">💉</div>
              <h4 className="font-semibold mb-1">Gerenciar Vacinas</h4>
              <p className="text-sm text-gray-400 mb-3">
                Controle de estoque e registros.
              </p>
              <button
                onClick={() => navigate("/vacinas")}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 px-4 rounded-md"
              >
                Acessar Vacinas
              </button>
            </div>

            {/* Funcionários */}
            <div className="bg-[#1e293b] p-5 rounded-lg text-center">
              <div className="text-green-400 text-3xl mb-2">🧑‍⚕️</div>
              <h4 className="font-semibold mb-1">Funcionários</h4>
              <p className="text-sm text-gray-400 mb-3">
                Cadastre, edite e remova funcionários.
              </p>
              <button
                onClick={() => navigate("/funcionarios")}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 px-4 rounded-md"
              >
                Acessar Funcionários
              </button>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
