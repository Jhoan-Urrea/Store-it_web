// tipoBodega-controller.js
import * as tipoBodegaService from '../services/tipoBodega-services.js';

export const getAll = async (req, res) => {
  try {
    const tipos = await tipoBodegaService.obtenerTiposBodega();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await tipoBodegaService.obtenerTipoBodegaPorId(id);
    if (tipo) {
      res.status(200).json(tipo);
    } else {
      res.status(404).json({ message: 'Tipo de Bodega no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const tipo = await tipoBodegaService.crearTipoBodega(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    await tipoBodegaService.actualizarTipoBodega(id, req.body);
    res.status(200).json({ message: 'Tipo de Bodega actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await tipoBodegaService.eliminarTipoBodega(id);
    res.status(200).json({ message: 'Tipo de Bodega eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
