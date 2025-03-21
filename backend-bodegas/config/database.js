import dotenv from "dotenv";
dotenv.config(); // Cargar variables de entorno
import { Sequelize } from "sequelize";

// Configuración de Sequelize con PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    }
});
  
  async function connectSequelize() {
    try {
      await sequelize.authenticate();
      console.log('Conectado a Postgres con Sequelize');
      await sequelize.sync();
    } catch (error) {
      console.error('Error conectando a Postgres:', error);
      throw error;
    }
  }

export {sequelize, connectSequelize};
