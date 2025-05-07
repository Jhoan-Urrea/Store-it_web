import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectSequelize, sequelize } from './config/database.js';
import userRoutes from './routes/usuarioRoutes.js';
import user from './routes/user.js';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';
import mainRoutes from './routes/index.js';
import { inicializarBodegas } from './models/negocio/Bodega.js';
import { inicializarCiudades } from './models/ubicacion/Ciudad.js';
import { inicializarTiposBodega } from './models/negocio/TipoBodega.js';
import { inicializarContratos } from './models/negocio/Contrato.js';
import { inicializarClientes } from './models/Cliente.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(process.env.COOKIE_SECRET))
  .use(cors({
    origin: '*',
    credentials: true,
    methods: '*',
    allowedHeaders: '*',
  }));

// Middleware de autenticación simulado con datos de usuario
app.use((req, res, next) => {
  req.user = {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    rol: "admin",
    permisos: ["read", "write", "delete"]
  };
  console.log('Usuario autenticado:', req.user);
  next();
});

// Rutas existentes
app.use('/usuarioRoutes', userRoutes);
app.use('/user', user);
app.use('/api', mainRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente');
});

async function startServer() {
  try {
    await sequelize.sync({ force: false }); // Cambia a true solo si necesitas recrear las tablas
    await connectSequelize();
  
    console.log('Iniciando carga de datos iniciales...');
    await inicializarCiudades();
    await inicializarTiposBodega();
    await inicializarBodegas();
    await inicializarClientes();
    await inicializarContratos();
    console.log('Datos iniciales cargados correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando la aplicación:', error);
  }
}

const endpoints = listEndpoints(app);
console.log('Endpoints disponibles:', endpoints);

startServer();
