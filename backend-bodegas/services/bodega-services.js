// bodega-services.js
import * as bodegaRepo from '../repositories/bodega-repository.js';
import Ciudad from '../models/ubicacion/Ciudad.js';
import TipoBodega from '../models/negocio/TipoBodega.js';

export const getAllBodegas = async () => {
  try {
    const bodegas = await bodegaRepo.obtenerTodos();
    console.log('Bodegas encontradas:', bodegas);
    return bodegas;
  } catch (error) {
    console.error('Error en getAllBodegas:', error);
    throw error;
  }
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
