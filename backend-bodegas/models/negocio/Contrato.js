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

const inicializarContratos = async () => {
  try {
    const contratosIniciales = [
      {
        clienteId: 1,
        bodegaId: 1,
        fechaInicio: new Date(),
        fechaFin: new Date(2024, 11, 31),
        status: 'Pendiente',
        precioTotal: 1500.00
      },
      {
        clienteId: 2,
        bodegaId: 2,
        fechaInicio: new Date(),
        fechaFin: new Date(2024, 11, 31),
        status: 'Aprobado',
        precioTotal: 2500.00
      }
    ];

    for (const contrato of contratosIniciales) {
      await Contrato.findOrCreate({
        where: {
          clienteId: contrato.clienteId,
          bodegaId: contrato.bodegaId
        },
        defaults: contrato
      });
    }
    console.log('Contratos iniciales creados correctamente');
  } catch (error) {
    console.error('Error al crear contratos iniciales:', error);
  }
};

export { Contrato as default, inicializarContratos };
