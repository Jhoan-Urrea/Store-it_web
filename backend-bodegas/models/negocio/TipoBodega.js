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
      isIn: [ ['estanteria estandar', 'estanteria dinamica', 'volumen', 'mixta']], // Validar que el tipo de bodega
    },
  },
},
{
timestamps: true, // Habilitar createdAt y updatedAt
});


export default TipoBodega;
