import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import bodegaRoutes from './bodegaRoutes.js';
import sectorRoutes from './sectorRoutes.js';
import puestoRoutes from './puestoRoutes.js';
import tipoBodegaRoutes from './tipoBodegaRoutes.js';
import contratoRoutes from './contratoRoutes.js';
import userRoutes from './user.js';
import notificationRoutes from './notificationRoutes.js';
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware para agregar el token a todas las rutas
router.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_temporal');
      req.user = decoded;
    } catch (error) {
      console.error('Error al verificar token:', error);
    }
  }
  next();
});

router.use('/usuarios', usuarioRoutes);
router.use('/bodegas', bodegaRoutes);
router.use('/sectores', sectorRoutes);  
router.use('/puestos', puestoRoutes);
router.use('/tipos-bodega', tipoBodegaRoutes);
router.use('/contratos', contratoRoutes);
router.use('/user', userRoutes);
router.use('/notifications', notificationRoutes);

export default router;
