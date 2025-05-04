// sectorRoutes.js
import { Router } from 'express';
import { sectorController } from '../controllers/sector-controller.js';

const router = Router();

router.get('/', sectorController.getAll);
router.get('/:id', sectorController.getById);
router.post('/', sectorController.create);
router.put('/:id', sectorController.update);
router.delete('/:id', sectorController.delete);

export default router;
