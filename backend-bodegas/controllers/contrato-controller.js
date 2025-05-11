import * as contratoService from '../services/contrato-services.js';

export const getAll = async (req, res) => {
    try {
        const contratos = await contratoService.getAllContratos();
        console.log('Contratos recuperados:', contratos);
        res.json(contratos);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const getByClienteId = async (req, res) => {
    try {
        const contratos = await contratoService.getContratosByClienteId(req.params.clienteId);
        res.json(contratos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const contrato = await contratoService.getContratoById(req.params.id);
        if (!contrato) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }
        res.json(contrato);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const contrato = await contratoService.createContrato(req.body);
        res.status(201).json(contrato);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const contrato = await contratoService.updateContrato(req.params.id, req.body);
        res.json(contrato);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        await contratoService.deleteContrato(req.params.id);
        res.json({ message: 'Contrato eliminado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.tipoUsuario;

        await contratoService.deleteRequest(id, userId, userRole);
        res.json({ message: 'Solicitud eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        res.status(error.message.includes('No autorizado') ? 403 : 500)
           .json({ message: error.message });
    }
};
