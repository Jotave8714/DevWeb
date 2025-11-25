import express from 'express';
import {
  getVacinasPorIdade,
  getVacinasVencidas
} from "../controllers/reportsController.js";

const router = express.Router();

router.get("/vacinas-por-idade", getVacinasPorIdade);
router.get("/vencidas", getVacinasVencidas);

export default router;
