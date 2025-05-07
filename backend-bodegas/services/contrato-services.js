import Contrato from '../models/negocio/Contrato.js';
import Cliente from '../models/Cliente.js';
import Bodega from '../models/negocio/Bodega.js';

export const getAllContratos = async () => {
  try {
    const contratos = await Contrato.findAll({
      include: [
        {
          model: Cliente,
          required: true
        },
        {
          model: Bodega,
          required: true
        }
      ]
    });

    // Transformar los datos para el frontend
    return contratos.map(contrato => ({
      id: contrato.id,
      warehouse: contrato.Bodega.descripcion,
      productType: "Tipo predeterminado", // Puedes ajustar esto según tus necesidades
      rentalPeriod: `${contrato.fechaInicio.toLocaleDateString()} - ${contrato.fechaFin.toLocaleDateString()}`,
      requestDate: contrato.createdAt.toLocaleDateString(),
      requester: `Cliente ${contrato.clienteId}`,
      status: contrato.status
    }));
  } catch (error) {
    console.error('Error en getAllContratos:', error);
    throw error;
  }
};

export const getContratoById = async (id) => {
  return await Contrato.findByPk(id, {
    include: ['Cliente', 'Bodega']
  });
};

export const createContrato = async (contratoData) => {
  return await Contrato.create(contratoData);
};

export const updateContrato = async (id, contratoData) => {
  const contrato = await Contrato.findByPk(id);
  if (!contrato) return null;
  return await contrato.update(contratoData);
};

export const deleteContrato = async (id) => {
  const contrato = await Contrato.findByPk(id);
  if (!contrato) return false;
  await contrato.destroy();
  return true;
};
