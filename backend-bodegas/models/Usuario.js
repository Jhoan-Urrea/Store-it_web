import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import TipoUsuario from './TipoUsuario.js';
import Persona from './Persona.js';

const Usuario = sequelize.define('Usuario', {
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoUsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoUsuario,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  personaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Persona,
      key: 'id',
    },
    onDelete: 'CASCADE',
  }
});

export default Usuario;
