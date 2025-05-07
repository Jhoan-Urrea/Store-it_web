// bodega-repository.js
import Bodega from '../models/negocio/Bodega.js';
import Ciudad from '../models/ubicacion/Ciudad.js';
import TipoBodega from '../models/negocio/TipoBodega.js';

export const obtenerTodos = async () => {
  return await Bodega.findAll({
    include: [
      {
        model: Ciudad,
        as: 'ciudad',
        attributes: ['nombre']
      },
      {
        model: TipoBodega,
        as: 'tipoBodega',
        attributes: ['nombre']
      }
    ]
  });
};

export const obtenerPorId = async (id) => {
  return await Bodega.findByPk(id, {
    include: ['ciudad', 'tipoBodega']
  });
};

export const crear = async (data) => {
  return await Bodega.create(data);
};

export const actualizar = async (id, data) => {
  const bodega = await Bodega.findByPk(id);
  if (!bodega) return null;
  return await bodega.update(data);
};

export const eliminar = async (id) => {
  const bodega = await Bodega.findByPk(id);
  if (!bodega) return false;
  await bodega.destroy();
  return true;
};
