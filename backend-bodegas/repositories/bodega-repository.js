import Bodega from '../models/negocio/Bodega.js';
import TipoBodega from '../models/negocio/TipoBodega.js';
import Ciudad from '../models/ubicacion/Ciudad.js';

class BodegaRepository {
    async findAll() {
        return await Bodega.findAll({
            include: [
                {
                    model: TipoBodega,
                    as: 'tipoBodega',
                    attributes: ['nombre', 'descripcion']
                },
                {
                    model: Ciudad,
                    as: 'ciudad',
                    attributes: ['nombre']
                }
            ]
        });
    }

    async findById(id) {
        return await Bodega.findByPk(id, {
            include: ['tipoBodega', 'ciudad']
        });
    }

    async findDisponibles() {
        return await Bodega.findAll({
            where: { estadoLleno: false },
            include: [
                {
                    model: TipoBodega,
                    as: 'tipoBodega',
                    attributes: ['nombre', 'descripcion']
                },
                {
                    model: Ciudad,
                    as: 'ciudad',
                    attributes: ['nombre']
                }
            ]
        });
    }

    async create(bodegaData) {
        return await Bodega.create(bodegaData);
    }

    async update(id, bodegaData) {
        const bodega = await Bodega.findByPk(id);
        if (!bodega) throw new Error('Bodega no encontrada');
        return await bodega.update(bodegaData);
    }

    async delete(id) {
        const bodega = await Bodega.findByPk(id);
        if (!bodega) throw new Error('Bodega no encontrada');
        await bodega.destroy();
        return true;
    }
}

export default new BodegaRepository();
