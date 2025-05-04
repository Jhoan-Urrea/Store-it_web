import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import Ciudad from '../ubicacion/Ciudad.js'
import TipoBodega from './TipoBodega.js'

const Bodega = sequelize.define('Bodega', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    espacioOcupado: { type: DataTypes.DECIMAL, allowNull: true },
    largo: { type: DataTypes.DECIMAL, allowNull: false },
    ancho: { type: DataTypes.DECIMAL, allowNull: false },
    alto: { type: DataTypes.DECIMAL, allowNull: false },
    telefono: { type: DataTypes.STRING(20), allowNull: true },
    codigoPostal: { type: DataTypes.STRING(6), unique: true, allowNull: false },
    direccion: { type: DataTypes.TEXT, allowNull: true },
    estadoLleno: {type: DataTypes.BOOLEAN, allowNull: false},
    idCiudad: { type : DataTypes.INTEGER, allowNull: false, references: {model: Ciudad ,key: 'id',}, onDelete: 'CASCADE',},    
    idTipoBodega : {type: DataTypes.INTEGER, allowNull: false, references : { model: TipoBodega, key: 'id',}, onDelete: 'CASCADE',},
  });

  export default Bodega;