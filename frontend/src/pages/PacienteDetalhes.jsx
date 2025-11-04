import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, MapPin, ShieldCheck, AlertCircle, Syringe } from "lucide-react";

export default function PacienteDetalhes() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      {/* Barra lateral */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-8 relative">
          {/* 🔙 Botão de Voltar */}
          <button
            onClick={() => navigate("/pacientes")}
            className="absolute top-6 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar</span>
          </button>

          {/* Espaço extra abaixo do botão */}
          <div className="mt-10"></div>

          {/* Informações principais do paciente */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <User className="text-green-400" size={28} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Maria Silva Santos</h2>
                <p className="text-gray-400 text-sm">
                  45 anos • Feminino • CPF: 123.456.789-00
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end mt-4 md:mt-0">
              <span className="text-green-400 font-medium">Ativo</span>
              <span className="text-gray-400 text-sm">Última consulta: 15/10/2024</span>
            </div>
          </div>

          {/* Seções principais */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Informações de Contato */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="text-green-400" size={18} />
                Informações de Contato
              </h3>

              <div className="space-y-3 text-sm">
                <div className="bg-[#1e293b] rounded-lg p-3 flex items-center gap-3">
                  <Phone className="text-green-400" size={18} />
                  <span>(11) 99999-8888</span>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-3 flex items-center gap-3">
                  <Mail className="text-green-400" size={18} />
                  <span>maria.silva@email.com</span>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-3 flex items-start gap-3">
                  <MapPin className="text-green-400 mt-1" size={18} />
                  <span>Rua das Flores, 123 - São Paulo, SP - 01234-567</span>
                </div>
              </div>
            </div>

            {/* Controle de Vacinas */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Syringe className="text-green-400" size={18} />
                Controle de Vacinas
              </h3>

              {/* Botões de status */}
              <div className="flex flex-wrap gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
                  <ShieldCheck size={16} /> Vacinas Tomadas
                </button>
                <button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> Vacinas Pendentes
                </button>
              </div>

              {/* Lista de vacinas */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center bg-[#1e293b] rounded-lg p-3">
                  <div>
                    <p className="text-white">COVID-19 (Pfizer)</p>
                    <p className="text-gray-400 text-xs">3ª dose</p>
                  </div>
                  <span className="text-gray-400">15/03/2024</span>
                </div>

                <div className="flex justify-between items-center bg-[#1e293b] rounded-lg p-3">
                  <div>
                    <p className="text-white">Influenza</p>
                    <p className="text-gray-400 text-xs">Anual 2024</p>
                  </div>
                  <span className="text-gray-400">10/04/2024</span>
                </div>

                <div className="flex justify-between items-center bg-[#1e293b] rounded-lg p-3">
                  <div>
                    <p className="text-white">Tétano/Difteria</p>
                    <p className="text-gray-400 text-xs">Reforço</p>
                  </div>
                  <span className="text-gray-400">22/01/2024</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
