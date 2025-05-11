// bodega-services.js
import bodegaRepository from '../repositories/bodega-repository.js';

export const getAllBodegas = async () => {
    return await bodegaRepository.findAll();
};

export const getBodegaById = async (id) => {
    return await bodegaRepository.findById(id);
};

export const getBodegasDisponibles = async () => {
    return await bodegaRepository.findDisponibles();
};

export const createBodega = async (bodegaData) => {
    return await bodegaRepository.create(bodegaData);
};

export const updateBodega = async (id, bodegaData) => {
    return await bodegaRepository.update(id, bodegaData);
};

export const deleteBodega = async (id) => {
    return await bodegaRepository.delete(id);
};
