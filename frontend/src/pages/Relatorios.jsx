// frontend/src/pages/Relatorios.jsx
import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// Apenas relatórios que funcionam
const reportDefinitions = [
  { key: "por-mes", title: "Aplicações por Mês", type: "line" },
  { key: "por-tipo", title: "Vacinas por Tipo", type: "bar" },
  { key: "por-fabricante", title: "Vacinas por Fabricante", type: "doughnut" },
  { key: "por-dose", title: "Vacinas por Dose", type: "bar" },
  { key: "tempo-entre-doses", title: "Tempo Médio Entre Doses", type: "bar" }
];

export default function Relatorios() {
  const [loading, setLoading] = useState(false);
  const [activeReport, setActiveReport] = useState("por-mes");
  const [reportData, setReportData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport(activeReport);
  }, [activeReport]);

  async function fetchReport(key) {
    setLoading(true);
    setError(null);
    setReportData({});
    try {
      const res = await fetch(`/api/reports/${key}`);
      if (!res.ok) throw new Error("Erro ao buscar relatório");
      const json = await res.json();
      setReportData(json || {});
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar relatório. Verifique o servidor.");
    } finally {
      setLoading(false);
    }
  }

  // estilos comuns
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "#ddd" } } },
    scales: {
      x: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.07)" } },
      y: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.07)" } }
    }
  };

  function renderChart(def, data) {
    if (!data || Object.keys(data).length === 0) {
      return <div className="text-gray-400">Nenhum dado disponível.</div>;
    }

    return (
      <Chart
        type={def.type}
        data={data}
        options={chartOptions}
        style={{ height: 420 }}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 space-y-6">

          {/* Título */}
          <div className="bg-[#0f1724] rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Relatórios Avançados</h2>
              <p className="text-sm text-gray-400">
                Clique para visualizar cada relatório
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
            {reportDefinitions.map(r => (
              <button
                key={r.key}
                onClick={() => setActiveReport(r.key)}
                className={`p-3 text-sm rounded-lg transition ${
                  activeReport === r.key
                    ? "bg-green-600 text-white"
                    : "bg-[#12202b] hover:bg-[#162a36]"
                }`}
              >
                <div className="font-semibold">{r.title}</div>
              </button>
            ))}
          </div>

          {/* Conteúdo */}
          <div className="bg-[#1e293b] rounded-lg p-5">
            {error && (
              <div className="bg-yellow-700/10 border border-yellow-600 text-yellow-300 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="p-10 text-center text-gray-400">
                Carregando relatório...
              </div>
            ) : (
              <>
                <h3 className="text-md font-semibold mb-3">
                  {reportDefinitions.find(r => r.key === activeReport)?.title}
                </h3>

                {renderChart(
                  reportDefinitions.find(d => d.key === activeReport),
                  reportData
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
