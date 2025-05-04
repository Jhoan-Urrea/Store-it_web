// tipoBodega-routes.js
import { Router } from 'express';
import * as tipoBodegaController from '../controllers/tipoBodega-controller.js';

const router = Router();

router.get('/', tipoBodegaController.getAll);
router.get('/:id', tipoBodegaController.getById);
router.post('/', tipoBodegaController.create);
router.put('/:id', tipoBodegaController.update);
router.delete('/:id', tipoBodegaController.remove);

export default router;
