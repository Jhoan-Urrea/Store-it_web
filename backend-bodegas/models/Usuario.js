import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  personaId: { type: DataTypes.INTEGER, allowNull: false },
  username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

export default Usuario;
