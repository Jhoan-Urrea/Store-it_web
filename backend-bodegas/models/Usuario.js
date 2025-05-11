import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import TipoUsuario from './TipoUsuario.js';
import Persona from './Persona.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoUsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoUsuario,
      key: 'id'
    }
  },
  personaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Persona,
      key: 'id'
    }
  }
}, {
  tableName: 'Usuarios'
});

Usuario.belongsTo(TipoUsuario, {
  foreignKey: 'tipoUsuarioId',
  as: 'TipoUsuario'
});

export default Usuario;
