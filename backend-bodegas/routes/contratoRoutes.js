import { Router } from 'express';
import * as contratoController from '../controllers/contrato-controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.use(verifyToken);

// Rutas existentes
router.get('/', contratoController.getAll);
router.get('/:id', contratoController.getById);
router.post('/', contratoController.create);
router.put('/:id', contratoController.update);
router.delete('/:id', contratoController.remove);

// Ruta específica para eliminar solicitudes
router.delete('/request/:id', contratoController.deleteRequest); // Nueva ruta

export default router;