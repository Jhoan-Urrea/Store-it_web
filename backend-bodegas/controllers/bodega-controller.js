// bodega-controller.js
import * as bodegaService from '../services/bodega-services.js';

export const getAll = async (req, res) => {
  try {
    const result = await bodegaService.getAllBodegas();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bodegaService.getBodegaById(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Bodega no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const result = await bodegaService.createBodega(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    await bodegaService.updateBodega(id, req.body);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await bodegaService.deleteBodega(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
