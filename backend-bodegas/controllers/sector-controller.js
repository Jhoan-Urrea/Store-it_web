// sector-controller.js
export const sectorController = {
  getAll: async (req, res) => {
    try {
      const sectores = await Sector.findAll();
      res.status(200).json(sectores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const sector = await Sector.findByPk(req.params.id);
      if (sector) {
        res.status(200).json(sector);
      } else {
        res.status(404).json({ message: 'Sector no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const sector = await Sector.create(req.body);
      res.status(201).json(sector);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const sector = await Sector.findByPk(req.params.id);
      if (sector) {
        await sector.update(req.body);
        res.status(200).json(sector);
      } else {
        res.status(404).json({ message: 'Sector no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const sector = await Sector.findByPk(req.params.id);
      if (sector) {
        await sector.destroy();
        res.status(200).json({ message: 'Sector eliminado' });
      } else {
        res.status(404).json({ message: 'Sector no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
