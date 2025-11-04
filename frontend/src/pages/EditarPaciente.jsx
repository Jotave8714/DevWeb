import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ArrowLeft, User, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditarPaciente() {
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

          {/* Conteúdo dividido */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card principal de informações pessoais */}
            <div className="md:col-span-2 bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <User className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold text-white">
                  Informações Pessoais
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-gray-400 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    defaultValue="Maria Silva Santos"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">CPF</label>
                  <input
                    type="text"
                    defaultValue="123.456.789-00"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    defaultValue="1985-03-15"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Sexo</label>
                  <select className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500">
                    <option>Feminino</option>
                    <option>Masculino</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Telefone</label>
                  <input
                    type="text"
                    defaultValue="(11) 99999-9999"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">E-mail</label>
                  <input
                    type="email"
                    defaultValue="maria.santos@email.com"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1">Endereço</label>
                  <input
                    type="text"
                    defaultValue="Rua das Flores, 123, Jardim Primavera"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Cidade</label>
                  <input
                    type="text"
                    defaultValue="São Paulo"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Estado</label>
                  <input
                    type="text"
                    defaultValue="São Paulo"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">CEP</label>
                  <input
                    type="text"
                    defaultValue="01234-567"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Card lateral - status das vacinas */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                Status das Vacinas
              </h3>

              <div className="space-y-3">
                {["COVID-19", "Influenza", "Hepatite B", "Tétano", "Febre Amarela"].map((vacina, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-[#1e293b] border border-[#334155] rounded-md px-3 py-2"
                  >
                    <span>{vacina}</span>
                    <select className="bg-[#0f172a] border border-[#334155] rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-green-500">
                      <option>Completa</option>
                      <option>Parcial</option>
                      <option>Pendente</option>
                    </select>
                  </div>
                ))}
              </div>

              {/* Resumo */}
              <div className="mt-4 border-t border-[#1f2937] pt-3">
                <h4 className="text-sm text-gray-400 mb-2">Resumo</h4>
                <ul className="text-sm space-y-1">
                  <li className="text-green-400">Completas: 3</li>
                  <li className="text-yellow-400">Parciais: 1</li>
                  <li className="text-red-400">Pendentes: 1</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => navigate("/pacientes")}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
            >
              Cancelar
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
              Salvar Alterações
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
