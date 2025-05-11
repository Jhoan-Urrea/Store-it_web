import { Router } from 'express';
import { checkRole } from '../middleware/auth-roles.js';

const router = Router();

router.get('/unread', checkRole(['cliente', 'vendedor']), async (req, res) => {
  try {
    // Implementación temporal
    res.json({ count: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
