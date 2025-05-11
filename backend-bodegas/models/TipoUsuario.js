import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TipoUsuario = sequelize.define('TipoUsuario', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.STRING(150), 
        allowNull: true 
    },
    tipoUsuario: {
        type: DataTypes.ENUM('cliente', 'vendedor', 'admin'),
        allowNull: false,
        validate: {
            isIn: [['cliente', 'vendedor', 'admin']]
        }
    }
}, {
    tableName: 'TipoUsuarios'
});

export default TipoUsuario;
