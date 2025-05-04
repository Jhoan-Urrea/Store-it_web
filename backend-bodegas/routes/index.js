import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import bodegaRoutes from './bodegaRoutes.js';
import sectorRoutes from './sectorRoutes.js';
import puestoRoutes from './puestoRoutes.js';
import tipoBodegaRoutes from './tipoBodegaRoutes.js';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/bodegas', bodegaRoutes);
router.use('/sectores', sectorRoutes);
router.use('/puestos', puestoRoutes);
router.use('/tipos-bodega', tipoBodegaRoutes);

export default router;
