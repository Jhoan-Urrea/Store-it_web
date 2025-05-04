import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Bodega from './Bodega.js';


const Sector = sequelize.define('Sector', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    espacioOcupado: { type: DataTypes.DECIMAL, allowNull: false },
    largo: { type: DataTypes.DECIMAL, allowNull: false },
    ancho: { type: DataTypes.DECIMAL, allowNull: false },
    alto: { type: DataTypes.DECIMAL, allowNull: false },
    estadoLleno: {type: DataTypes.BOOLEAN, allowNull: false},
    idBodega: { type: DataTypes.INTEGER, allowNull: false, references: { model: Bodega, key: 'id',}, onDelete: 'CASCADE',}
  });

  export default Sector;