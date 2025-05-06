import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  personaId: { type: DataTypes.INTEGER, allowNull: false },
});

const inicializarClientes = async () => {
  try {
    const clientesIniciales = [
      { id: 1, personaId: 1 },
      { id: 2, personaId: 2 }
    ];

    for (const cliente of clientesIniciales) {
      await Cliente.findOrCreate({
        where: { id: cliente.id },
        defaults: cliente
      });
    }
    console.log('Clientes iniciales creados correctamente');
  } catch (error) {
    console.error('Error al crear clientes iniciales:', error);
  }
};

export { Cliente as default, inicializarClientes };
