// puesto-repository.js
import Puesto from '../models/negocio/Puesto.js';

export const crear = (data) => {
  return Puesto.create(data);
};

export const obtenerTodos = () => {
  return Puesto.findAll();
};
