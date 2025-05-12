import Contrato from "../models/negocio/Contrato.js";  
import Cliente from "../models/Cliente.js";
import Bodega from "../models/negocio/Bodega.js";
import Persona from "../models/Persona.js";
import Ciudad from "../models/ubicacion/Ciudad.js"; // Corregir la ruta de importación

class ContratoRepository {
  async findAll() {
    return await Contrato.findAll({
      include: [
        {
          model: Cliente,
          include: [{
            model: Persona,
            attributes: ['primerNombre', 'primerApellido', 'correo', 'telefono']
          }]
        },
        {
          model: Bodega,
          attributes: ['descripcion', 'direccion', 'codigoPostal'],
          include: [{
            model: Ciudad,
            as: 'ciudad',
            attributes: ['nombre']
          }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async findByClienteId(clienteId) {
    return await Contrato.findAll({
      where: { clienteId },
      include: [
        {
          model: Bodega,
          attributes: ['descripcion', 'direccion', 'codigoPostal']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async findById(id) {
    return await Contrato.findByPk(id, {
      include: ["cliente", "bodega"],
    });
  }

  async create(contratoData) {
    return await Contrato.create(contratoData);
  }

  async update(id, contratoData) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) throw new Error("Contrato no encontrado");
    return await contrato.update(contratoData);
  }     
  
  async delete(id) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) throw new Error("Contrato no encontrado");
    await contrato.destroy();
  }   
}

export default new ContratoRepository();