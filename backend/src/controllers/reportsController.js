// src/controllers/reportsController.js
import Paciente from "../models/Paciente.js";
import Vacina from "../models/Vacina.js";
import mongoose from "mongoose";

// ------------------------------------------------------------
// 1. Aplicações por mês (line)
// ------------------------------------------------------------
export const getAplicacoesPorMes = async (req, res) => {
  try {
    const data = await Paciente.aggregate([
      { $unwind: "$historicoVacinas" },
      {
        $group: {
          _id: { $month: "$historicoVacinas.dataAplicacao" },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } }
    ]);

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    return res.json({
      labels: meses,
      datasets: [
        {
          label: "Aplicações",
          data: meses.map((_, i) => data.find(x => x._id === i + 1)?.total || 0),
          borderColor: "rgba(33,150,243,1)",
          tension: 0.3
        }
      ]
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 2. Vacinas por tipo (bar) 🔥
// ------------------------------------------------------------
export const getVacinasPorTipo = async (req, res) => {
  try {
    const tipos = await Vacina.aggregate([
      { $group: { _id: "$pubaAlvo", total: { $sum: 1 } } }
    ]);

    return res.json({
      labels: tipos.map(t => t._id || "Não definido"),
      datasets: [
        {
          label: "Quantidade",
          backgroundColor: "rgba(76,175,80,0.6)",
          data: tipos.map(t => t.total),
        }
      ],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 3. Vacinas por fabricante (doughnut)
// ------------------------------------------------------------
export const getVacinasPorFabricante = async (req, res) => {
  try {
    const dados = await Vacina.aggregate([
      { $group: { _id: "$fabricante", total: { $sum: 1 } } }
    ]);

    return res.json({
      labels: dados.map(d => d._id || "Desconhecido"),
      datasets: [
        {
          data: dados.map(d => d.total),
          backgroundColor: [
            "rgba(33,150,243,0.7)",
            "rgba(76,175,80,0.7)",
            "rgba(255,193,7,0.7)",
            "rgba(244,67,54,0.7)",
            "rgba(156,39,176,0.7)",
          ],
        }
      ]
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 4. Pacientes por faixa etária (bar)
// ------------------------------------------------------------
export const getPacientesPorFaixaEtaria = async (req, res) => {
  try {
    const faixas = ["0-11", "12-17", "18-29", "30-49", "50-64", "65+"];
    const cont = [0, 0, 0, 0, 0, 0];

    const pacientes = await Paciente.find();

    for (const p of pacientes) {
      const idade = Math.floor((Date.now() - new Date(p.dataNascimento)) / (365.25 * 24 * 60 * 60 * 1000));

      let idx =
        idade <= 11 ? 0 :
        idade <= 17 ? 1 :
        idade <= 29 ? 2 :
        idade <= 49 ? 3 :
        idade <= 64 ? 4 : 5;

      cont[idx]++;
    }

    return res.json({
      labels: faixas,
      datasets: [
        {
          label: "Pacientes",
          backgroundColor: "rgba(33,150,243,0.7)",
          data: cont
        }
      ]
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 5. Vacinas por Dose (bar)
// ------------------------------------------------------------
export const getVacinasPorDose = async (req, res) => {
  try {
    const dados = await Paciente.aggregate([
      { $unwind: "$historicoVacinas" },
      { $group: { _id: "$historicoVacinas.dose", total: { $sum: 1 } } }
    ]);

    return res.json({
      labels: dados.map(d => d._id),
      datasets: [{ label: "Aplicações", data: dados.map(d => d.total) }]
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 6. Próximos vencimentos (bar)
// ------------------------------------------------------------
export const getProximosVencimentos = async (req, res) => {
  try {
    const agora = new Date();
    const limite = new Date();
    limite.setDate(limite.getDate() + 30);

    const vacinas = await Vacina.find({
      validade: { $gte: agora, $lte: limite }
    });

    return res.json({
      labels: vacinas.map(v => v.nome),
      datasets: [{
        label: "Vence em até 30 dias",
        backgroundColor: "rgba(255,193,7,0.7)",
        data: vacinas.map(() => 1)
      }]
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 7. Ativas vs Vencidas (pie)
// ------------------------------------------------------------
export const getAtivasVsVencidas = async (req, res) => {
  try {
    const hoje = new Date();
    const vacinas = await Vacina.find();

    const vencidas = vacinas.filter(v => v.validade && v.validade < hoje).length;
    const validas = vacinas.length - vencidas;

    res.json({
      labels: ["Válidas", "Vencidas"],
      datasets: [{
        data: [validas, vencidas],
        backgroundColor: ["rgba(76,175,80,0.7)", "rgba(244,67,54,0.7)"]
      }]
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 8. Vacinas por paciente (scatter)
// ------------------------------------------------------------
export const getVacinasPorPaciente = async (req, res) => {
  try {
    const pacs = await Paciente.find();

    return res.json({
      datasets: [
        {
          label: "Vacinas por paciente",
          data: pacs.map(p => ({
            x: p.historicoVacinas.length,
            y: p.dataNascimento ? new Date(p.dataNascimento).getFullYear() : 0,
          })),
          backgroundColor: "rgba(33,150,243,0.7)"
        }
      ]
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 9. Pacientes com atraso (info)
// ------------------------------------------------------------
export const getPacientesComAtraso = async (req, res) => {
  try {
    const pacs = await Paciente.find();

    const atrasados = pacs.filter(p => {
      return p.historicoVacinas.some(h => h.dose === "Reforço");
    });

    return res.json(atrasados);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 10. Aplicações por funcionário (bar)
// ------------------------------------------------------------
export const getAplicacoesPorFuncionario = async (req, res) => {
  try {
    return res.json({
      labels: ["Sistema não possui funcionários vinculados"],
      datasets: [{ data: [0] }]
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 11. Tempo médio entre doses (bar)
// ------------------------------------------------------------
export const getTempoEntreDoses = async (req, res) => {
  try {
    const dados = await Vacina.aggregate([
      {
        $project: {
          nome: 1,
          tempo: { $avg: "$intervalosDias" }
        }
      }
    ]);

    return res.json({
      labels: dados.map(d => d.nome),
      datasets: [{
        label: "Intervalo médio (dias)",
        backgroundColor: "rgba(156,39,176,0.7)",
        data: dados.map(d => d.tempo || 0)
      }]
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ------------------------------------------------------------
// 12. Heatmap Dia × Hora (table)
// ------------------------------------------------------------
export const getHeatmapDiaHora = async (req, res) => {
  try {
    const dados = await Paciente.aggregate([
      { $unwind: "$historicoVacinas" },
      {
        $group: {
          _id: {
            dia: { $dayOfWeek: "$historicoVacinas.dataAplicacao" },
            hora: { $hour: "$historicoVacinas.dataAplicacao" },
          },
          total: { $sum: 1 }
        }
      }
    ]);

    return res.json(dados);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
