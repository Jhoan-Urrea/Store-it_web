import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import * as notificationController from '../controllers/notification-controller.js';

const router = Router();

router.use(verifyToken);

router.get('/', notificationController.getNotifications);
router.put('/:id/read', notificationController.markAsRead);
router.get('/unread', notificationController.getUnreadCount);

export default router;
