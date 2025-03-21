import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './config/database.js';
import userRoutes from './routes/usuarioRoutes.js'; // Asegúrate de que esta ruta es correcta

// Crear la instancia de Express
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(morgan('dev')); // Logger de peticiones HTTP
app.use(express.json()); // Soporte para JSON en requests

// Rutas
app.use('/api/users', userRoutes); // Ruta de usuarios (cambia según tus rutas)

// Ruta base
app.get('/', (req, res) => {
    res.send('✅ API funcionando correctamente');
});

// Sincronizar base de datos (opcional, usar con precaución en producción)
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Crea o actualiza las tablas
        console.log('✅ Base de datos sincronizada.');
    } catch (error) {
        console.error('❌ Error al sincronizar la base de datos:', error);
    }
};

syncDatabase();

export default app;
