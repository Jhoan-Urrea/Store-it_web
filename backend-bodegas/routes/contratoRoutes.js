import express from 'express';
const router = express.Router();

// Array temporal para almacenar contratos (reemplazar con base de datos real)
let contratos = [];

// GET - Obtener todos los contratos
router.get('/', (req, res) => {
  try {
    res.json(contratos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Crear nuevo contrato
router.post('/', (req, res) => {
  try {
    const newContrato = {
      id: Date.now().toString(),
      ...req.body,
      fechaCreacion: new Date()
    };
    contratos.push(newContrato);
    res.status(201).json(newContrato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Eliminar un contrato
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    contratos = contratos.filter(contrato => contrato.id !== id);
    res.json({ message: 'Contrato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
