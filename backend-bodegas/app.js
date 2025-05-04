import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectSequelize, sequelize } from './config/database.js';
import userRoutes from './routes/usuarioRoutes.js';
import user from './routes/user.js';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';

// 🆕 Importar rutas generales (bodega, sector, puesto, tipoBodega)
import mainRoutes from './routes/index.js';

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

// Middleware de autenticación simulado
app.use((req, res, next) => {
  req.user = { id: 1 }; // Esto debería ser reemplazado por la lógica real de autenticación
  console.log('Authenticated User:', req.user); // Agregar log para verificar el userId
  next();
});

// Rutas existentes
app.use('/usuarioRoutes', userRoutes);
app.use('/user', user);

// 🆕 Rutas nuevas montadas en /api
app.use('/api', mainRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente');
});

async function startServer() {
  try {
    //sequelize.sync({ alter: true });
    sequelize.sync();
    //sequelize.sync({ force: true });
    await connectSequelize(); // Conectar a la base de datos

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando la aplicación:', error);
  }
}

const endpoints = listEndpoints(app);
console.log(endpoints);

// Exportar app
startServer();
