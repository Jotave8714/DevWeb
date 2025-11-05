import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { User, Phone, Mail, MapPin, ShieldCheck, AlertCircle, Syringe, ArrowLeft } from "lucide-react";
import API from "../api";

export default function PacienteDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const res = await API.get(`/pacientes/${id}`);
        setPaciente(res.data);
      } catch (err) {
        console.error("Erro ao buscar paciente:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaciente();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b1120]">
        Carregando informações do paciente...
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#0b1120]">
        Paciente não encontrado.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />
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

          <div className="mt-10"></div>

          {/* Card principal */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <User className="text-green-400" size={28} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{paciente.nome}</h2>
                <p className="text-gray-400 text-sm">
                  {paciente.idade ? `${paciente.idade} anos • ` : ""}
                  {paciente.sexo ? `${paciente.sexo} • ` : ""}
                  CPF: {paciente.cpf}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end mt-4 md:mt-0">
              <span className="text-green-400 font-medium">Ativo</span>
              <span className="text-gray-400 text-sm">
                Última atualização: {new Date(paciente.updatedAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Informações */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contato */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="text-green-400" size={18} />
                Informações de Contato
              </h3>

              <div className="space-y-3 text-sm">
                <div className="bg-[#1e293b] rounded-lg p-3 flex items-center gap-3">
                  <Phone className="text-green-400" size={18} />
                  <span>{paciente.telefone || "Sem telefone cadastrado"}</span>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-3 flex items-center gap-3">
                  <Mail className="text-green-400" size={18} />
                  <span>{paciente.email || "Sem e-mail informado"}</span>
                </div>

                <div className="bg-[#1e293b] rounded-lg p-3 flex items-start gap-3">
                  <MapPin className="text-green-400 mt-1" size={18} />
                  <span>{paciente.endereco || "Sem endereço cadastrado"}</span>
                </div>
              </div>
            </div>

            {/* Vacinas */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Syringe className="text-green-400" size={18} />
                Controle de Vacinas
              </h3>

              <div className="flex flex-wrap gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
                  <ShieldCheck size={16} /> Vacinas Tomadas
                </button>
                <button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> Vacinas Pendentes
                </button>
              </div>

              <div className="space-y-3 text-sm">
                {(paciente.vacinas || []).map((v, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-[#1e293b] rounded-lg p-3"
                  >
                    <div>
                      <p className="text-white">{v.nome}</p>
                      <p className="text-gray-400 text-xs">{v.dose}</p>
                    </div>
                    <span className="text-gray-400">{v.data}</span>
                  </div>
                ))}

                {(!paciente.vacinas || paciente.vacinas.length === 0) && (
                  <p className="text-gray-400 text-sm">Nenhuma vacina registrada.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}