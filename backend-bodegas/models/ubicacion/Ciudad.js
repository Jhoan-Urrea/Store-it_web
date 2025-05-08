import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Departamento from './Departamento.js';

const Ciudad = sequelize.define('Ciudad', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150), allowNull: true },
  idDepartamento: {type: DataTypes.INTEGER, allowNull: false, references: {model: Departamento, key: 'id',}, onDelete: 'CASCADE',},
});

const inicializarCiudades = async () => {
  try {
    const ciudadesIniciales = [
      { id: 1, nombre: 'Armenia', descripcion: 'Ciudad principal', idDepartamento: 1 },
      { id: 2, nombre: 'Calarcá', descripcion: 'Ciudad secundaria', idDepartamento: 1 }
    ];

    for (const ciudad of ciudadesIniciales) {
      await Ciudad.findOrCreate({
        where: { id: ciudad.id },
        defaults: ciudad
      });
    }
    console.log('Ciudades iniciales creadas correctamente');
  } catch (error) {
    console.error('Error al crear ciudades iniciales:', error);
  }
};

export { Ciudad as default, inicializarCiudades };
