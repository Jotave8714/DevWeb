import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Relatorios() {
  const [loading, setLoading] = useState(true);
  const [ageVaccineData, setAgeVaccineData] = useState(null);
  const [vaccineExpiryData, setVaccineExpiryData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedChart, setSelectedChart] = useState("ageVaccine");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    setLoading(true);
    setError(null);

    try {
      const ageRes = await fetch("/api/reports/vacinas-por-idade");
      const vencRes = await fetch("/api/reports/vencidas");

      if (!ageRes.ok || !vencRes.ok) {
        throw new Error("Falha ao buscar relatórios.");
      }

      const ageData = await ageRes.json();
      const vencData = await vencRes.json();

      setAgeVaccineData(ageData);
      setVaccineExpiryData(vencData);
    } catch (err) {
      setError("Erro ao carregar dados reais, exibindo dados de exemplo.");
      loadExample();
    }

    setLoading(false);
  }

  function loadExample() {
    setAgeVaccineData({
      labels: ["0-11", "12-17", "18-29", "30-49", "50-64", "65+"],
      datasets: [
        {
          label: "Vacina A",
          backgroundColor: "rgba(33,150,243,0.6)",
          data: [30, 20, 50, 40, 15, 5],
          stack: "stack1",
        },
        {
          label: "Vacina B",
          backgroundColor: "rgba(76,175,80,0.6)",
          data: [10, 15, 30, 35, 20, 10],
          stack: "stack1",
        },
      ],
    });

    setVaccineExpiryData({
      labels: ["Vacina A", "Vacina B"],
      datasets: [
        {
          label: "Vencidas",
          backgroundColor: ["rgba(244,67,54,0.6)", "rgba(255,193,7,0.6)"],
          data: [5, 12],
        },
        {
          label: "Válidas",
          backgroundColor: ["rgba(244,67,54,0.3)", "rgba(255,193,7,0.3)"],
          data: [110, 80],
        },
      ],
    });
  }

  const optionsStacked = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 space-y-6">
          <div className="bg-[#0f1724] rounded-lg p-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Relatórios</h2>
              <p className="text-sm text-gray-400">
                Visualize dados de vacinação e vencimentos.
              </p>
            </div>
            <div className="text-2xl">📊</div>
          </div>

          <div className="bg-[#1e293b] p-4 rounded-lg">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedChart("ageVaccine")}
                className={`text-sm py-1 px-3 rounded-md ${
                  selectedChart === "ageVaccine"
                    ? "bg-green-600 text-white"
                    : "bg-[#0b1220] text-gray-300 hover:bg-[#16202b]"
                }`}
              >
                Idade x Vacina
              </button>

              <button
                onClick={() => setSelectedChart("vaccineExpiry")}
                className={`text-sm py-1 px-3 rounded-md ${
                  selectedChart === "vaccineExpiry"
                    ? "bg-green-600 text-white"
                    : "bg-[#0b1220] text-gray-300 hover:bg-[#16202b]"
                }`}
              >
                Vacinas x Vencimento
              </button>

              <button
                onClick={loadReports}
                className="ml-auto text-sm py-1 px-3 rounded-md bg-[#0b1220] text-gray-300 hover:bg-[#16202b]"
              >
                Atualizar Dados
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-yellow-700/10 border border-yellow-600 text-yellow-300 p-3 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="bg-[#1e293b] p-6 rounded-lg text-center text-gray-400">
              Carregando...
            </div>
          ) : (
            <>
              {selectedChart === "ageVaccine" && ageVaccineData && (
                <div className="bg-[#1e293b] p-5 rounded-lg">
                  <h3 className="text-md font-semibold mb-3">Idade x Vacina</h3>
                  <div className="w-full" style={{ height: 420 }}>
                    <Chart
                      type="bar"
                      data={ageVaccineData}
                      options={optionsStacked}
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>
              )}

              {selectedChart === "vaccineExpiry" && vaccineExpiryData && (
                <div className="bg-[#1e293b] p-5 rounded-lg">
                  <h3 className="text-md font-semibold mb-3">Vacinas x Vencimento</h3>
                  <div className="w-full" style={{ height: 420 }}>
                    <Chart
                      type="bar"
                      data={vaccineExpiryData}
                      options={optionsBar}
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
