import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Crear la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',  // Cambia a 'mysql', 'sqlite', etc., si usas otro motor
    port: process.env.DB_PORT || 5432,
    logging: false, // Para evitar logs en la consola
});

// Probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
    }
};

testConnection();

export default sequelize;
