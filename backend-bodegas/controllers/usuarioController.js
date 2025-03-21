import { Usuario } from '../models/index.js';

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
