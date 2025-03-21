import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Rol = sequelize.define('Rol', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(45), allowNull: false },
});

export default Rol;
