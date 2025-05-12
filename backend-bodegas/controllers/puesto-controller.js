// puesto-controller.js
import Puesto from '../models/negocio/Puesto.js';

export const puestoController = {
  getAll: async (req, res) => {
    try {
      const puestos = await Puesto.findAll();
      res.status(200).json(puestos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const puesto = await Puesto.findByPk(req.params.id);
      if (puesto) {
        res.status(200).json(puesto);
      } else {
        res.status(404).json({ message: 'Puesto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getBySectorId: async (req, res) => {
  try {
    const puestos = await Puesto.findAll({
      where: { idSector: req.params.idSector }
    });
    res.json(puestos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener puestos del sector.' });
  }
},

  create: async (req, res) => {
    try {
      const puesto = await Puesto.create(req.body);
      res.status(201).json(puesto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const puesto = await Puesto.findByPk(req.params.id);
      if (puesto) {
        await puesto.update(req.body);
        res.status(200).json(puesto);
      } else {
        res.status(404).json({ message: 'Puesto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const puesto = await Puesto.findByPk(req.params.id);
      if (puesto) {
        await puesto.destroy();
        res.status(200).json({ message: 'Puesto eliminado' });
      } else {
        res.status(404).json({ message: 'Puesto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
