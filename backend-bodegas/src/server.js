const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
