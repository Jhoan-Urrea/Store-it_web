import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';

const UsuarioRol = sequelize.define('UsuarioRol', {}, { timestamps: false });

Usuario.belongsToMany(Rol, { through: UsuarioRol });
Rol.belongsToMany(Usuario, { through: UsuarioRol });

export default UsuarioRol;
