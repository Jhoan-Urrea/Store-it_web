import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import bodegaRoutes from './bodegaRoutes.js';
import sectorRoutes from './sectorRoutes.js';
import puestoRoutes from './puestoRoutes.js';
import tipoBodegaRoutes from './tipoBodegaRoutes.js';
import contratoRoutes from './contratoRoutes.js';
import userRoutes from './user.js';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/bodegas', bodegaRoutes);
router.use('/sectores', sectorRoutes);  
router.use('/puestos', puestoRoutes);
router.use('/tipos-bodega', tipoBodegaRoutes);
router.use('/contratos', contratoRoutes);
router.use('/user', userRoutes);

export default router;
