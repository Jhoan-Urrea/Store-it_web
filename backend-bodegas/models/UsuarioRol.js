import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';

// 🔹 Creamos el modelo instanciado
const UsuarioRol = sequelize.define('UsuarioRol', {}, { timestamps: false });

// 🔹 Asociaciones (después de tener el modelo creado)
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: 'usuarioId',
  otherKey: 'rolId'
});

Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: 'rolId',
  otherKey: 'usuarioId'
});

export default UsuarioRol;
