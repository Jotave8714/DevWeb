import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Syringe,
  ArrowLeft,
} from "lucide-react";
import API from "../api";

export default function PacienteDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);
  const [vacinasSistema, setVacinasSistema] = useState([]);
  const [modalVacina, setModalVacina] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar paciente + vacinas do sistema
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const res = await API.get(`/pacientes/${id}`);
        setPaciente(res.data);
      } catch (err) {
        console.error("Erro ao buscar paciente:", err);
      }
    };

    const fetchVacinas = async () => {
      try {
        const res = await API.get("/vacinas");
        setVacinasSistema(res.data);
      } catch (err) {
        console.error("Erro ao buscar vacinas:", err);
      }
    };

    Promise.all([fetchPaciente(), fetchVacinas()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  const verificarRegrasVacina = (vacina) => {
    const dosesTomadas = paciente.historicoVacinas.filter(
      (h) => h.vacina && h.vacina._id === vacina._id
    ).length;

    // 1. NÃO PODE TOMAR MAIS DO QUE O TOTAL DE DOSES
    if (dosesTomadas >= vacina.numDoses) {
      return {
        erro: true,
        mensagem:
          "Esta vacina já teve todas as doses aplicadas neste paciente.",
      };
    }

    // 2. SE JÁ TOMOU ALGUMA DOSE, VERIFICAR INTERVALO
    if (dosesTomadas > 0 && vacina.intervalosDias.length >= dosesTomadas) {
      const ultima = paciente.historicoVacinas
        .filter((h) => h.vacina && h.vacina._id === vacina._id)
        .sort(
          (a, b) => new Date(b.dataAplicacao) - new Date(a.dataAplicacao)
        )[0];

      const intervalo = vacina.intervalosDias[dosesTomadas - 1];
      const dataProxima = new Date(ultima.dataAplicacao);
      dataProxima.setDate(dataProxima.getDate() + intervalo);

      const hoje = new Date();

      if (hoje < dataProxima) {
        const diff = Math.ceil((dataProxima - hoje) / (1000 * 60 * 60 * 24));

        return {
          erro: true,
          mensagem: `A próxima dose só pode ser aplicada em ${dataProxima.toLocaleDateString(
            "pt-BR"
          )} (faltam ${diff} dia(s)).`,
        };
      }
    }

    return { erro: false };
  };

  // Aplicar dose ao paciente
  const aplicarDose = async (vacina) => {
    const verif = verificarRegrasVacina(vacina);

    if (verif.erro) {
      alert(verif.mensagem);
      return;
    }

    const dosesTomadas = paciente.historicoVacinas.filter(
      (h) => h.vacina && h.vacina._id === vacina._id
    ).length;

    const novaDose = dosesTomadas + 1;

    const novoHistorico = [
      ...paciente.historicoVacinas,
      {
        vacina: vacina._id,
        dataAplicacao: new Date(),
        dose: `${novaDose}ª dose`,
      },
    ];

    await API.put(`/pacientes/${id}`, {
      historicoVacinas: novoHistorico,
    });

    setModalVacina(null);
    window.location.reload();
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b1120]">
        Carregando informações do paciente...
      </div>
    );
  }

  // Paciente inexistente
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
          {/* Botão voltar */}
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
                <h2 className="text-xl font-semibold text-white">
                  {paciente.nome}
                </h2>
                <p className="text-gray-400 text-sm">CPF: {paciente.cpf}</p>
              </div>
            </div>

            <div className="flex flex-col items-end mt-4 md:mt-0">
              <span className="text-green-400 font-medium">Ativo</span>
              <span className="text-gray-400 text-sm">
                Última atualização:{" "}
                {new Date(paciente.updatedAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Blocos */}
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

            {/* Histórico de vacinas */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Syringe className="text-green-400" size={18} />
                Histórico de Vacinas Aplicadas
              </h3>

              {paciente.historicoVacinas.length === 0 && (
                <p className="text-gray-400 text-sm">
                  Nenhuma vacina registrada.
                </p>
              )}

              <div className="space-y-3">
                {paciente.historicoVacinas.map((v, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-[#1e293b] rounded-lg p-3"
                  >
                    <div>
                      <p className="text-white">{v.vacina?.nome}</p>
                      <p className="text-gray-400 text-xs">{v.dose}</p>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {new Date(v.dataAplicacao).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* APLICAÇÃO DE VACINA — TODAS AS VACINAS DO SISTEMA */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 space-y-5 mt-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Syringe className="text-green-400" size={18} />
              Aplicação de Vacina
            </h3>

            <p className="text-gray-400 text-sm">
              Selecione uma vacina para aplicar ao paciente.
            </p>

            <div className="space-y-3">
              {vacinasSistema.map((v) => (
                <button
                  key={v._id}
                  onClick={() => setModalVacina(v)}
                  className="w-full text-left bg-[#1e293b] hover:bg-[#243044] transition rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">{v.nome}</p>
                    <p className="text-gray-400 text-xs">
                      {v.numDoses} doses • intervalo:{" "}
                      {Array.isArray(v.intervalosDias)
                        ? v.intervalosDias.join(" / ")
                        : v.intervalosDias}
                      {"  "}dias
                    </p>
                  </div>

                  <span className="text-green-400 font-semibold">Aplicar</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL FINAL */}
      {modalVacina && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-[#1f2937] w-[450px] p-6 rounded-xl space-y-5">
            <h2 className="text-xl font-semibold text-white">
              Registrar Aplicação — {modalVacina.nome}
            </h2>

            {(() => {
              const dosesTomadas = paciente.historicoVacinas.filter(
                (h) => h.vacina && h.vacina._id === modalVacina._id
              ).length;

              const proximaDose = dosesTomadas + 1;

              // Cálculo da próxima data (se existir)
              let dataProxima = null;

              if (
                modalVacina.intervalosDias &&
                modalVacina.intervalosDias.length >= dosesTomadas
              ) {
                const ultima = paciente.historicoVacinas
                  .filter((h) => h.vacina && h.vacina._id === modalVacina._id)
                  .sort(
                    (a, b) =>
                      new Date(b.dataAplicacao) - new Date(a.dataAplicacao)
                  )[0];

                if (ultima) {
                  const intervalo =
                    modalVacina.intervalosDias[dosesTomadas - 1];
                  dataProxima = new Date(ultima.dataAplicacao);
                  dataProxima.setDate(dataProxima.getDate() + intervalo);
                }
              }

              return (
                <>
                  <p className="text-gray-300">
                    Este paciente já tomou{" "}
                    <strong className="text-green-400">{dosesTomadas}</strong>{" "}
                    dose(s) desta vacina.
                  </p>

                  <p className="text-gray-300">
                    Próxima dose a ser aplicada:{" "}
                    <strong className="text-green-400">
                      {proximaDose}ª dose
                    </strong>
                  </p>

                  {dataProxima && (
                    <p className="text-gray-400 text-sm">
                      A próxima dose só pode ser aplicada a partir de{" "}
                      <strong>{dataProxima.toLocaleDateString("pt-BR")}</strong>
                      .
                    </p>
                  )}

                  <button
                    onClick={() => aplicarDose(modalVacina)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-4 rounded-md"
                  >
                    Confirmar Aplicação
                  </button>
                </>
              );
            })()}

            <button
              onClick={() => setModalVacina(null)}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
