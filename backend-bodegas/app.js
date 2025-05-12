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
import { seedInitialData } from './seeders/initialData.js';
import './models/associations.js';


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
    await sequelize.sync({ force: false }); // Mantener false para no recrear las tablas

    await connectSequelize();
  
    console.log('Iniciando carga de datos iniciales...');
    await seedInitialData();
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
