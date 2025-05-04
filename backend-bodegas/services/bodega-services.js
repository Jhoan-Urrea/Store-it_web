// bodega-services.js
import * as bodegaRepo from '../repositories/bodega-repository.js';

export const getAllBodegas = async () => {
  return await bodegaRepo.obtenerTodos();
};

export const getBodegaById = async (id) => {
  return await bodegaRepo.obtenerPorId(id);
};

export const createBodega = async (data) => {
  return await bodegaRepo.crear(data);
};

export const updateBodega = async (id, data) => {
  return await bodegaRepo.actualizar(id, data);
};

export const deleteBodega = async (id) => {
  return await bodegaRepo.eliminar(id);
};
