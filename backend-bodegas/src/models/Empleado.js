import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Empleado = sequelize.define('Empleado', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  personaId: { type: DataTypes.INTEGER, allowNull: false },
  salario: { type: DataTypes.INTEGER, allowNull: false },
});

export default Empleado;
