import express from 'express';
import * as vacinaCtrl from '../controllers/VacinaController.js';

const router = express.Router();

router.post('/bulk', vacinaCtrl.createManyVacinas); // <--- novo endpoint

router.post('/', vacinaCtrl.createVacina);
router.get('/', vacinaCtrl.getVacinas);
router.get('/:id', vacinaCtrl.getVacinaById);
router.put('/:id', vacinaCtrl.updateVacina);
router.delete('/:id', vacinaCtrl.deleteVacina);

export default router;
