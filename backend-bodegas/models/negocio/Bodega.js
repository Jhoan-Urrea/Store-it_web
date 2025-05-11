import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Ciudad from '../ubicacion/Ciudad.js'; // Corregir la ruta de importación
import TipoBodega from './TipoBodega.js';

const Bodega = sequelize.define('Bodega', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  espacioOcupado: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  largo: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  ancho: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  alto: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  codigoPostal: {
    type: DataTypes.STRING(6),
    unique: true,
    allowNull: false
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estadoLleno: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  idCiudad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ciudad,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  idTipoBodega: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoBodega,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
});

// Definir las relaciones
Bodega.belongsTo(Ciudad, {
  foreignKey: 'idCiudad',
  as: 'ciudad'
});

Ciudad.hasMany(Bodega, {
  foreignKey: 'idCiudad',
  as: 'bodegas'
});

Bodega.belongsTo(TipoBodega, {
  foreignKey: 'idTipoBodega',
  as: 'tipoBodega'
});

export default Bodega;