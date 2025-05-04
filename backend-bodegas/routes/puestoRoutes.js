// puestoRoutes.js
import { Router } from 'express';
import { puestoController } from '../controllers/puesto-controller.js';

const router = Router();

router.get('/', puestoController.getAll);
router.get('/:id', puestoController.getById);
router.post('/', puestoController.create);
router.put('/:id', puestoController.update);
router.delete('/:id', puestoController.delete);

export default router;
