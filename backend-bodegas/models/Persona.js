import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

const Persona = sequelize.define('Persona', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  primerNombre: { type: DataTypes.STRING(45), allowNull: false },
  segundoNombre: { type: DataTypes.STRING(45), allowNull: true },
  primerApellido: { type: DataTypes.STRING(45), allowNull: false },
  segundoApellido: { type: DataTypes.STRING(45), allowNull: true },
  fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
  telefono: { type: DataTypes.STRING(20), allowNull: false },
  correo: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  direccion: { type: DataTypes.TEXT, allowNull: false },
});

export default Persona;
