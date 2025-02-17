const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente! 🚀');
});

// Exportar app
module.exports = app;
