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

const inicializarBodegas = async () => {
  try {
    const bodegasIniciales = [
      {
        descripcion: "Bodega Principal Armenia",
        espacioOcupado: 150.5,
        largo: 200,
        ancho: 150,
        alto: 100,
        telefono: "3123456789",
        codigoPostal: "630001",
        direccion: "Calle 1 #23-45",
        estadoLleno: false,
        idCiudad: 1,
        idTipoBodega: 1
      },
      {
        descripcion: "Bodega Centro Calarcá",
        espacioOcupado: 80.2,
        largo: 150,
        ancho: 100,
        alto: 80,
        telefono: "3187654321",
        codigoPostal: "632001",
        direccion: "Carrera 5 #12-34",
        estadoLleno: false,
        idCiudad: 2,
        idTipoBodega: 2
      }
    ];

    for (const bodega of bodegasIniciales) {
      await Bodega.findOrCreate({
        where: { codigoPostal: bodega.codigoPostal },
        defaults: bodega
      });
    }
    console.log('Bodegas iniciales creadas correctamente');
  } catch (error) {
    console.error('Error al crear bodegas iniciales:', error);
  }
};

export { Bodega as default, inicializarBodegas };