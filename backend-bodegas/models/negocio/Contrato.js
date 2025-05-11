import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Cliente from '../Cliente.js';
import Bodega from './Bodega.js';

const Contrato = sequelize.define('Contrato', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'id'
    }
  },
  bodegaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Bodega,
      key: 'id'
    }
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado'),
    defaultValue: 'Pendiente'
  },
  precioTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

Contrato.belongsTo(Cliente, {
  foreignKey: 'clienteId',
  targetKey: 'id'
});

Contrato.belongsTo(Bodega, {
  foreignKey: 'bodegaId',
  targetKey: 'id'
});

export { Contrato as default };
