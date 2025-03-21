import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';

const router = Router();

router.use('/usuarios', usuarioRoutes);

export default router;
