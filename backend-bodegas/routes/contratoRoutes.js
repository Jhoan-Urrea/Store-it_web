import { Router } from 'express';
import * as contratoController from '../controllers/contrato-controller.js';

const router = Router();

router.get('/', contratoController.getAll);
router.get('/:id', contratoController.getById);
router.post('/', contratoController.create);
router.put('/:id', contratoController.update);
router.delete('/:id', contratoController.remove);

export default router;