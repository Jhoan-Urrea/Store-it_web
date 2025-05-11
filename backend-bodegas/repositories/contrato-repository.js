import Contrato from '../models/negocio/Contrato.js';
import Bodega from '../models/negocio/Bodega.js';
import Cliente from '../models/Cliente.js';

class ContratoRepository {
  async findAll() {
    return await Contrato.findAll({
      include: [
        { model: Bodega },
        { model: Cliente }
      ]
    });
  }

  async findById(id) {
    return await Contrato.findByPk(id, {
      include: [
        { model: Bodega },
        { model: Cliente }
      ]
    });
  }

  async findByClienteId(clienteId) {
    return await Contrato.findAll({
      where: { clienteId },
      include: [{ model: Bodega }]
    });
  }

  async create(data) {
    return await Contrato.create(data);
  }

  async update(id, data) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) throw new Error('Contrato no encontrado');
    return await contrato.update(data);
  }

  async delete(id) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) throw new Error('Contrato no encontrado');
    await contrato.destroy();
    return true;
  }

  async deleteRequest(id, userId, userRole) {
    console.log('Eliminando solicitud:', { id, userId, userRole });
    
    const contrato = await Contrato.findOne({
      where: { 
        id,
        status: 'Pendiente'
      },
      include: [
        { model: Cliente },
        { model: Bodega }
      ]
    });

    if (!contrato) {
      throw new Error('Solicitud no encontrada');
    }

    if (contrato.clienteId !== userId && userRole !== 'vendedor') {
      throw new Error('No autorizado para eliminar esta solicitud');
    }

    await contrato.destroy();
    return true;
  }
}

export default new ContratoRepository();