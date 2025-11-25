import express from "express";
import * as reportsCtrl from "../controllers/reportsController.js";

const router = express.Router();

// 12 relatórios avançados
router.get("/por-mes", reportsCtrl.getAplicacoesPorMes);
router.get("/por-tipo", reportsCtrl.getVacinasPorTipo);
router.get("/por-fabricante", reportsCtrl.getVacinasPorFabricante);
router.get("/por-faixa-etaria", reportsCtrl.getPacientesPorFaixaEtaria);
router.get("/por-dose", reportsCtrl.getVacinasPorDose);
router.get("/proximos-vencimentos", reportsCtrl.getProximosVencimentos);
router.get("/ativas-vencidas", reportsCtrl.getAtivasVsVencidas);
router.get("/por-paciente", reportsCtrl.getVacinasPorPaciente);
router.get("/pacientes-atrasos", reportsCtrl.getPacientesComAtraso);
router.get("/por-funcionario", reportsCtrl.getAplicacoesPorFuncionario);
router.get("/tempo-entre-doses", reportsCtrl.getTempoEntreDoses);
router.get("/heatmap", reportsCtrl.getHeatmapDiaHora);

export default router;
