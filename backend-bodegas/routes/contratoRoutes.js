import { Router } from 'express';
import { contratoController } from '../controllers/contrato-controller.js';

const router = Router();

router.get('/', contratoController.getAllContratos);
router.get('/:id', contratoController.getContratoById);
router.post('/', contratoController.createContrato);
router.put('/:id', contratoController.updateContrato);
router.delete('/:id', contratoController.deleteContrato);

export default router;
