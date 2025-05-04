// sector-services.js
import * as sectorRepo from '../repositories/sector-repository.js';

export const crearSector = async (data) => {
  return await sectorRepo.crear(data);
};

export const obtenerSectores = async () => {
  return await sectorRepo.obtenerTodos();
};
