import Notification from '../models/Notification.js';
import Usuario from '../models/Usuario.js';

class NotificationService {
  async createNotification(data) {
    return await Notification.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async getNotificationsByUser(userId) {
    console.log('Buscando notificaciones para usuario:', userId);
    try {
      const notifications = await Notification.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
      });
      console.log('Notificaciones encontradas:', notifications.length);
      return notifications;
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      throw new Error('Error al obtener notificaciones: ' + error.message);
    }
  }

  async markAsRead(notificationId) {
    const notification = await Notification.findByPk(notificationId);
    if (notification) {
      notification.read = true;
      await notification.save();
    }
  }

  async markAllAsRead(userId) {
    await Notification.update(
      { read: true },
      { where: { userId, read: false } }
    );
  }

  async createWelcomeNotification(userId) {
    return await Notification.create({
      userId,
      title: '¡Bienvenido a Store-it!',
      message: 'Bienvenido a nuestra plataforma. Aquí podrás gestionar tus bodegas de manera fácil y segura. Comienza explorando las bodegas disponibles en la sección de Contratos.',
      type: 'welcome',
      read: false
    });
  }

  async createRequestNotification(userId, bodegaId) {
    return await this.createNotification({
      userId,
      title: 'Solicitud en Proceso',
      message: 'Tu solicitud está siendo revisada por nuestro equipo. Te daremos respuesta en los próximos 3 días hábiles.',
      type: 'request',
      relatedId: bodegaId
    });
  }

  async createRequestProcessingNotification(userId, bodegaDescripcion) {
    try {
      return await Notification.create({
        userId,
        title: 'Solicitud en Proceso',
        message: `Tu solicitud para la bodega "${bodegaDescripcion}" está siendo procesada. Te notificaremos cuando sea revisada.`,
        type: 'request',
        read: false
      });
    } catch (error) {
      throw new Error('Error al crear notificación: ' + error.message);
    }
  }

  async createApprovalNotification(userId, bodegaId, direccionOficina) {
    return await this.createNotification({
      userId,
      title: 'Solicitud Aprobada',
      message: `Tu solicitud ha sido aprobada. Por favor acércate a nuestra oficina en ${direccionOficina} para finalizar el proceso y realizar el pago correspondiente.`,
      type: 'approval',
      relatedId: bodegaId
    });
  }

  async createVendedorNotification(bodegaId, clienteNombre, tipoSolicitud) {
    const vendedores = await Usuario.findAll({
      where: { tipoUsuarioId: 2 } // Asumiendo que 2 es el ID para vendedores
    });

    for (const vendedor of vendedores) {
      await this.createNotification({
        userId: vendedor.id,
        title: 'Nueva Solicitud de Bodega',
        message: `${clienteNombre} ha solicitado la bodega #${bodegaId} para ${tipoSolicitud}`,
        type: 'request',
        relatedId: bodegaId
      });
    }
  }
}

export default new NotificationService();
