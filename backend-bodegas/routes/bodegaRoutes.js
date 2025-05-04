// bodega-routes.js
import { Router } from 'express';
import * as bodegaController from '../controllers/bodega-controller.js';

const router = Router();

router.get('/', bodegaController.getAll);
router.get('/:id', bodegaController.getById);
router.post('/', bodegaController.create);
router.put('/:id', bodegaController.update);
router.delete('/:id', bodegaController.remove);

export default router;
