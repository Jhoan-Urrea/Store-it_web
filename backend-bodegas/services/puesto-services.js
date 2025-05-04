// puesto-services.js
import * as puestoRepo from '../repositories/puesto-repository.js';

export const crearPuesto = async (data) => {
  return await puestoRepo.crear(data);
};

export const obtenerPuestos = async () => {
  return await puestoRepo.obtenerTodos();
};
