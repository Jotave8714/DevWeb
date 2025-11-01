import express from 'express';
import * as pacienteCtrl from '../controllers/PacienteController.js';

const router = express.Router();

router.post('/', pacienteCtrl.createPaciente);
router.get('/', pacienteCtrl.getPacientes);
router.get('/:id', pacienteCtrl.getPacienteById);
router.put('/:id', pacienteCtrl.updatePaciente);
router.delete('/:id', pacienteCtrl.deletePaciente);

export default router;
