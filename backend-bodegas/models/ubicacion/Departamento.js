import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Pais from './Pais.js';

const Departamento = sequelize.define('Departamento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150), allowNull: true },
  idPais: {type: DataTypes.INTEGER, allowNull: false, references: {model: Pais, key: 'id',}, onDelete: 'CASCADE',},
});

export default Departamento;
