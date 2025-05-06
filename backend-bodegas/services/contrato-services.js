import Contrato from '../models/negocio/Contrato.js';
import Cliente from '../models/Cliente.js';
import Bodega from '../models/negocio/Bodega.js';

export const getAllContratos = async () => {
  return await Contrato.findAll({
    include: [
      { model: Cliente },
      { model: Bodega }
    ]
  });
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
