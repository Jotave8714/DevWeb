import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../api";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EsquemasDoses() {
  const [vacinas, setVacinas] = useState([]);
  const [vacinaSelecionada, setVacinaSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacinas = async () => {
      try {
        const res = await API.get("/vacinas");
        setVacinas(res.data);
      } catch (err) {
        console.error("Erro ao buscar vacinas:", err);
      }
    };

    fetchVacinas();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 flex gap-8">

          {/* 🟩 LISTA DE VACINAS */}
          <div className="w-80 bg-[#111827] border border-[#1f2937] rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Vacinas</h2>

              <button
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm"
                onClick={() =>
                  navigate("/vacinas", { state: { novaVacina: true } })
                }
              >
                + Adicionar
              </button>
            </div>

            {/* LISTANDO SOMENTE ATIVAS E VENCENDO */}
            {vacinas
              .filter((v) => v.status === "Ativa" || v.status === "Vencendo")
              .map((v) => (
                <div
                  key={v._id}
                  onClick={() => setVacinaSelecionada(v)}
                  className={`
                    p-4 rounded-lg cursor-pointer border
                    ${
                      vacinaSelecionada?._id === v._id
                        ? "bg-[#1e293b] border-green-500"
                        : "bg-[#1e293b]/50 border-[#1f2937] hover:bg-[#1e293b]"
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{v.nome}</h3>
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 rounded-md">
                      {v.status}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs mt-1">
                    {v.numDoses} dose(s) • Intervalos:{" "}
                    {Array.isArray(v.intervalosDias)
                      ? v.intervalosDias.join(" / ")
                      : ""}
                  </p>
                </div>
              ))}
          </div>

          {/* 🟦 DETALHES DA VACINA */}
          <div className="flex-1 bg-[#111827] border border-[#1f2937] rounded-xl p-8 space-y-8">

            {!vacinaSelecionada ? (
              <div className="text-gray-400 text-center mt-20">
                Selecione uma vacina na lista ao lado →
              </div>
            ) : (
              <>
                {/* Título */}
                <div>
                  <h1 className="text-2xl font-semibold">{vacinaSelecionada.nome}</h1>
                  <p className="text-gray-400 text-sm">
                    Esquema de vacinação completo
                  </p>
                </div>

                {/* TIMELINE */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  {[...Array(vacinaSelecionada.numDoses)].map((_, i) => (
                    <React.Fragment key={i}>
                      
                      {/* Dose */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
                          {i + 1}
                        </div>
                        <span className="text-sm mt-1">{i + 1}ª Dose</span>
                      </div>

                      {/* Intervalo */}
                      {i < vacinaSelecionada.numDoses - 1 && (
                        <div className="flex flex-col items-center">
                          <ChevronRight className="text-gray-400" />

                          {vacinaSelecionada.intervalosDias[i] !== undefined && (
                            <span className="text-xs text-gray-400 mt-1">
                              {vacinaSelecionada.intervalosDias[i]} dias
                            </span>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-8">

                  {/* Detalhes das Doses */}
                  <div className="bg-[#1e293b] p-5 rounded-lg border border-[#1f2937]">
                    <h3 className="font-semibold mb-3">Detalhes das Doses</h3>

                    {[...Array(vacinaSelecionada.numDoses)].map((_, i) => (
                      <p key={i} className="text-gray-300 text-sm mb-1">
                        <strong>{i + 1}ª Dose:</strong> Intramuscular
                      </p>
                    ))}
                  </div>

                  {/* Simulação de Datas */}
                  <div className="bg-[#1e293b] p-5 rounded-lg border border-[#1f2937]">
                    <h3 className="font-semibold mb-3">Simulação de Datas</h3>

                    <p className="text-gray-300 text-sm">
                      <strong>1ª Dose:</strong> {new Date().toLocaleDateString()}
                    </p>

                    {vacinaSelecionada.intervalosDias.map((dias, i) => {
                      const data = new Date();
                      data.setDate(data.getDate() + dias);

                      return (
                        <p key={i} className="text-gray-300 text-sm">
                          <strong>{i + 2}ª Dose:</strong> {data.toLocaleDateString()}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
