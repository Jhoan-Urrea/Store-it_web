import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const TipoBodega = sequelize.define('TipoBodega', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150), allowNull: true },
  TipoBodega: {
    type: DataTypes.ENUM('estanteria estandar', 'estanteria dinamica', 'volumen', 'mixta'), // Definir el tipo de usuario como ENUM
    allowNull: false,
    validate: {
      isIn: [['estanteria estandar', 'estanteria dinamica', 'volumen', 'mixta']], // Validar que el tipo de bodega
    },
  },
},
{
  timestamps: true, // Habilitar createdAt y updatedAt
});

const inicializarTiposBodega = async () => {
  try {
    const tiposBodegaIniciales = [
      {
        id: 1,
        nombre: 'Estantería Estándar',
        descripcion: 'Bodega con estanterías tradicionales',
        TipoBodega: 'estanteria estandar'
      },
      {
        id: 2,
        nombre: 'Estantería Dinámica',
        descripcion: 'Bodega con sistema de estanterías móviles',
        TipoBodega: 'estanteria dinamica'
      },
      {
        id: 3,
        nombre: 'Almacenamiento Volumen',
        descripcion: 'Bodega para almacenamiento masivo',
        TipoBodega: 'volumen'
      },
      {
        id: 4,
        nombre: 'Almacenamiento Mixto',
        descripcion: 'Bodega con múltiples tipos de almacenamiento',
        TipoBodega: 'mixta'
      }
    ];

    for (const tipo of tiposBodegaIniciales) {
      await TipoBodega.findOrCreate({
        where: { id: tipo.id },
        defaults: tipo
      });
    }
    console.log('Tipos de bodega iniciales creados correctamente');
  } catch (error) {
    console.error('Error al crear tipos de bodega iniciales:', error);
  }
};

export { TipoBodega as default, inicializarTiposBodega };
