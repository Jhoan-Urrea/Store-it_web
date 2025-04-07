import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Persona from './Persona.js';

const TipoUsuario = sequelize.define('TipoUsuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150), allowNull: true },
  tipoUsuario: {
    type: DataTypes.ENUM('empleado', 'cliente'), // Definir el tipo de usuario como ENUM
    allowNull: false,
    validate: {
      isIn: [ ['empleado', 'cliente']], // Validar que el tipo de usuario sea 'empleado' o 'cliente'
    },
  },
},
{
timestamps: true, // Habilitar createdAt y updatedAt
});

//TipoUsuario.belongsTo(Persona, { foreignKey: 'persona_id' });

export default TipoUsuario;
