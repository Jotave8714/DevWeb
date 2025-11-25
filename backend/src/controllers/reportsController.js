import Paciente from "../models/Paciente.js";
import Vacina from "../models/Vacina.js";

// Calcular idade a partir da data de nascimento
function calcularIdade(dataNasc) {
  const diff = Date.now() - new Date(dataNasc).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

// Faixas etárias
function faixa(idade) {
  if (idade <= 11) return "0-11";
  if (idade <= 17) return "12-17";
  if (idade <= 29) return "18-29";
  if (idade <= 49) return "30-49";
  if (idade <= 64) return "50-64";
  return "65+";
}

// Cores para gráficos
function randomColor(alpha = 0.6) {
  const colors = [
    "33,150,243",
    "76,175,80",
    "255,193,7",
    "244,67,54",
    "156,39,176",
    "0,188,212"
  ];
  const c = colors[Math.floor(Math.random() * colors.length)];
  return `rgba(${c}, ${alpha})`;
}

/* ============================================================
   RELATÓRIO 1 — VACINA x IDADE
   ============================================================ */
export async function getVacinasPorIdade(req, res) {
  try {
    const pacientes = await Paciente.find().populate("historicoVacinas.vacina");

    const faixas = ["0-11", "12-17", "18-29", "30-49", "50-64", "65+"];

    // Identifica todas as vacinas existentes
    const vacinasSet = new Set();

    const matriz = {}; // vacina → [faixa1, faixa2, ...]

    pacientes.forEach((p) => {
      const idade = calcularIdade(p.dataNascimento);

      p.historicoVacinas.forEach((h) => {
        if (!h.vacina) return;

        const vacina = h.vacina.nome;
        const f = faixa(idade);

        vacinasSet.add(vacina);

        if (!matriz[vacina]) matriz[vacina] = faixas.map(() => 0);
        matriz[vacina][faixas.indexOf(f)]++;
      });
    });

    const vacinas = [...vacinasSet];

    const datasets = vacinas.map((v) => ({
      label: v,
      data: matriz[v],
      backgroundColor: randomColor(0.6)
    }));

    return res.json({
      labels: faixas,
      datasets
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao gerar relatório de idade" });
  }
}

/* ============================================================
   RELATÓRIO 2 — VACINAS VENCIDAS
   ============================================================ */
export async function getVacinasVencidas(req, res) {
  try {
    const hoje = new Date();

    const vacinas = await Vacina.find();

    const vencidas = vacinas.filter((v) => v.validade && v.validade < hoje);
    const validas = vacinas.filter((v) => v.validade && v.validade >= hoje);

    return res.json({
      labels: ["Vencidas", "Válidas"],
      datasets: [
        {
          label: "Quantidade",
          backgroundColor: [randomColor(), randomColor(0.3)],
          data: [vencidas.length, validas.length]
        }
      ]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao gerar relatório de vencimento" });
  }
}
