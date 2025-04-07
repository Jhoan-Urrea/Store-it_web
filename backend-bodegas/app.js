import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectSequelize, sequelize } from './config/database.js';
import userRoutes from './routes/usuarioRoutes.js';
import user from './routes/user.js';

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(process.env.COOKIE_SECRET));

// Middleware de autenticación simulado
app.use((req, res, next) => {
    req.user = { id: 1 }; // Esto debería ser reemplazado por la lógica real de autenticación
    console.log('Authenticated User:', req.user); // Agregar log para verificar el userId
    next();
  });

// Rutas
app.use('/usuarioRoutes', userRoutes); // Ruta de usuarios (cambia según tus rutas)
app.use('/user', user);

// Ruta base
app.get('/', (req, res) => {
    res.send('✅ API funcionando correctamente');
});

async function startServer() {
    try {
      await sequelize.sync({ force: true }); // Esto eliminará y recreará las tablas
      sequelize.sync({ alter: true });
      await connectSequelize(); // Conectar a la base de datos
      

      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Error iniciando la aplicación:', error);
    }
}

// Exportar app
startServer();