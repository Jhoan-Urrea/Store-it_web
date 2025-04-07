import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoUsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  personaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Usuario;
