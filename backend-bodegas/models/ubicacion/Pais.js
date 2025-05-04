import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const Pais = sequelize.define('Pais', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150), allowNull: true },
});

export default Pais;
