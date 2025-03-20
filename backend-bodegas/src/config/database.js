require("dotenv").config(); // Cargar variables de entorno

const { Sequelize } = require("sequelize");

// Configuración de Sequelize con PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false, // Desactiva logs de SQL en consola
    }
);

module.exports = sequelize;
