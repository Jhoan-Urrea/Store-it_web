// sector-repository.js
import Sector from '../models/negocio/Sector.js';

export const crear = (data) => {
  return Sector.create(data);
};

export const obtenerTodos = () => {
  return Sector.findAll();
};
