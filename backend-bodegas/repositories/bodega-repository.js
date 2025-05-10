// bodega-repository.js
import Bodega from '../models/negocio/Bodega.js';
import Ciudad from '../models/ubicacion/Ciudad.js';
import TipoBodega from '../models/negocio/TipoBodega.js';

export const obtenerTodos = async () => {
  try {
    // Primero, vamos a verificar las ciudades disponibles
    const ciudades = await Ciudad.findAll();
    console.log('Ciudades disponibles:', ciudades.map(c => ({
      id: c.id,
      nombre: c.nombre,
      descripcion: c.descripcion
    })));

    const bodegas = await Bodega.findAll({
      include: [
        {
          model: Ciudad,
          as: 'ciudad',
          required: false
        },
        {
          model: TipoBodega,
          as: 'tipoBodega',
          attributes: ['id', 'nombre', 'descripcion']
        }
      ],
      attributes: [
        'id',
        'descripcion',
        'idCiudad',
        'idTipoBodega',
        'largo',
        'ancho',
        'alto',
        'espacioOcupado',
        'estadoLleno'
      ]
    });

    // Agregar logging para diagnóstico
    console.log('Bodegas antes de transformar:', bodegas.map(b => ({
      id: b.id,
      idCiudad: b.idCiudad,
      ciudadRelacionada: b.ciudad ? {
        id: b.ciudad.id,
        nombre: b.ciudad.nombre
      } : null
    })));

    const bodegasTransformadas = await Promise.all(bodegas.map(async (bodega) => {
      const bodegaJSON = bodega.toJSON();
      
      // Si tenemos idCiudad pero no tenemos la relación, buscamos la ciudad directamente
      if (bodegaJSON.idCiudad && (!bodegaJSON.ciudad || !bodegaJSON.ciudad.nombre)) {
        const ciudadEncontrada = await Ciudad.findByPk(bodegaJSON.idCiudad);
        if (ciudadEncontrada) {
          console.log('Ciudad encontrada para bodega:', {
            bodegaId: bodega.id,
            ciudadId: ciudadEncontrada.id,
            ciudadNombre: ciudadEncontrada.nombre
          });
          bodegaJSON.ciudad = ciudadEncontrada.toJSON();
        }
      }

      return {
        ...bodegaJSON,
        ciudad: bodegaJSON.ciudad || {
          id: bodegaJSON.idCiudad,
          nombre: bodegaJSON.ciudad?.nombre || 'No especificada'
        }
      };
    }));

    return bodegasTransformadas;
  } catch (error) {
    console.error('Error en obtenerTodos:', error);
    throw error;
  }
};

export const obtenerPorId = async (id) => {
  return await Bodega.findByPk(id, {
    include: ['ciudad', 'tipoBodega']
  });
};

export const crear = async (data) => {
  return await Bodega.create(data);
};

export const actualizar = async (id, data) => {
  const bodega = await Bodega.findByPk(id);
  if (!bodega) return null;
  return await bodega.update(data);
};

export const eliminar = async (id) => {
  const bodega = await Bodega.findByPk(id);
  if (!bodega) return false;
  await bodega.destroy();
  return true;
};
