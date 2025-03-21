import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {connectSequelize} from './config/database.js';

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

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente! 🚀');
});

async function startServer() {
    try {
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