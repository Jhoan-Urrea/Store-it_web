// bodega-repository.js
import Bodega from '../models/negocio/Bodega.js';

export const crear = (data) => {
  return Bodega.create(data);
};

export const obtenerTodos = () => {
  return Bodega.findAll();
};

export const obtenerPorId = (id) => {
  return Bodega.findByPk(id);
};

export const actualizar = (id, data) => {
  return Bodega.update(data, { where: { id } });
};

export const eliminar = (id) => {
  return Bodega.destroy({ where: { id } });
};
