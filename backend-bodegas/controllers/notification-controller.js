import notificationService from '../services/notification-services.js';

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Obteniendo notificaciones para usuario:', userId);
        
        const notifications = await notificationService.getNotificationsByUser(userId);
        console.log('Notificaciones encontradas:', notifications);
        
        res.json(notifications);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        await notificationService.markAsRead(id);
        res.json({ message: 'Notificación marcada como leída' });
    } catch (error) {
        console.error('Error al marcar notificación como leída:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await notificationService.getNotificationsByUser(userId);
        const unreadCount = notifications.filter(n => !n.read).length;
        
        res.json({ count: unreadCount });
    } catch (error) {
        console.error('Error al obtener conteo de notificaciones:', error);
        res.status(500).json({ message: error.message });
    }
};
