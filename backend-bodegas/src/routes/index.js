const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Rutas funcionando correctamente');
});

module.exports = router;
