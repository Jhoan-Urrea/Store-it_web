import contratoRepository from '../repositories/contrato-repository.js';

export const getAllContratos = async () => {
    try {
        const contratos = await contratoRepository.findAll();
        return contratos.map(contrato => {
            const contratoJSON = contrato.toJSON();
            return {
                id: contratoJSON.id,
                cliente: contratoJSON.Cliente ? {
                    id: contratoJSON.Cliente.id,
                    nombre: contratoJSON.Cliente.Persona ? 
                        `${contratoJSON.Cliente.Persona.primerNombre || ''} ${contratoJSON.Cliente.Persona.segundoNombre || ''} ${contratoJSON.Cliente.Persona.primerApellido || ''} ${contratoJSON.Cliente.Persona.segundoApellido || ''}`.trim() : '',
                    correo: contratoJSON.Cliente.Persona?.correo || '',
                    telefono: contratoJSON.Cliente.Persona?.telefono || '',
                    identificacion: contratoJSON.Cliente.Persona?.identificacion || ''
                } : null,
                bodega: contratoJSON.Bodega ? {
                    descripcion: contratoJSON.Bodega.descripcion || '',
                    direccion: contratoJSON.Bodega.direccion || '',
                    codigoPostal: contratoJSON.Bodega.codigoPostal || '',
                    ciudad: contratoJSON.Bodega.ciudad?.nombre || 'No especificada'
                } : null,
                fechaInicio: contratoJSON.fechaInicio,
                fechaFin: contratoJSON.fechaFin,
                status: contratoJSON.status || 'Pendiente',
                precioTotal: contratoJSON.precioTotal || 0
            };
        });
    } catch (error) {
        console.error('Error en getAllContratos:', error);
        throw new Error('Error al obtener los contratos: ' + error.message);
    }
};

export const getContratosByClienteId = async (clienteId) => {
    return await contratoRepository.findByClienteId(clienteId);
};

export const getContratoById = async (id) => {
    return await contratoRepository.findById(id);
};

export const createContrato = async (contratoData) => {
    return await contratoRepository.create(contratoData);
};

export const updateContrato = async (id, contratoData) => {
    return await contratoRepository.update(id, contratoData);
};

export const deleteContrato = async (id) => {
    return await contratoRepository.delete(id);
};
