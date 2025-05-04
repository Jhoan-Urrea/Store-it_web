// tipoBodega-services.js
import * as tipoBodegaRepo from '../repositories/tipoBodega-repository.js';

export const crearTipoBodega = async (data) => {
  return await tipoBodegaRepo.crear(data);
};

export const obtenerTiposBodega = async () => {
  return await tipoBodegaRepo.obtenerTodos();
};

export const obtenerTipoBodegaPorId = async (id) => {
  return await tipoBodegaRepo.obtenerPorId(id);
};

export const actualizarTipoBodega = async (id, data) => {
  return await tipoBodegaRepo.actualizar(id, data);
};

export const eliminarTipoBodega = async (id) => {
  return await tipoBodegaRepo.eliminar(id);
};
