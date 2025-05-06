import * as contratoService from '../services/contrato-services.js';

export const contratoController = {
  getAllContratos: async (req, res) => {
    try {
      const contratos = await contratoService.getAllContratos();
      res.json(contratos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getContratoById: async (req, res) => {
    try {
      const contrato = await contratoService.getContratoById(req.params.id);
      if (!contrato) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
      }
      res.json(contrato);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createContrato: async (req, res) => {
    try {
      const contrato = await contratoService.createContrato(req.body);
      res.status(201).json(contrato);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateContrato: async (req, res) => {
    try {
      const contrato = await contratoService.updateContrato(req.params.id, req.body);
      if (!contrato) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
      }
      res.json(contrato);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteContrato: async (req, res) => {
    try {
      const result = await contratoService.deleteContrato(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
      }
      res.json({ message: 'Contrato eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
