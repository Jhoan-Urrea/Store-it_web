import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Departamento from './Departamento.js';

const Ciudad = sequelize.define('Ciudad', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150), allowNull: true },
  idDepartamento: {type: DataTypes.INTEGER, allowNull: false, references: {model: Departamento, key: 'id',}, onDelete: 'CASCADE',},
}, {
  tableName: 'Ciudad', // Especifica el nombre exacto de la tabla
});

export default Ciudad;
