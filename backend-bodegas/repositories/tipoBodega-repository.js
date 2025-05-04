// tipoBodega-repository.js
import TipoBodega from '../models/negocio/TipoBodega.js';

export const crear = (data) => {
  return TipoBodega.create(data);
};

export const obtenerTodos = () => {
  return TipoBodega.findAll();
};

export const obtenerPorId = (id) => {
  return TipoBodega.findByPk(id);
};

export const actualizar = (id, data) => {
  return TipoBodega.update(data, { where: { id } });
};

export const eliminar = (id) => {
  return TipoBodega.destroy({ where: { id } });
};
