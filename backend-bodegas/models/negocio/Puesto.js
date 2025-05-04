import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Sector from './Sector.js';


const Puesto = sequelize.define('Puesto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    columna: { type: DataTypes.INTEGER, allowNull: false},
    fila: {type: DataTypes.INTEGER, allowNull: false},
    largo: { type: DataTypes.DECIMAL, allowNull: false },
    ancho: { type: DataTypes.DECIMAL, allowNull: false },
    alto: { type: DataTypes.DECIMAL, allowNull: false },
    estadoLleno: {type: DataTypes.BOOLEAN, allowNull: false},
    idSector: { type: DataTypes.INTEGER, allowNull: false, references: { model: Sector, key: 'id',}, onDelete: 'CASCADE',}
  });

  export default Puesto;