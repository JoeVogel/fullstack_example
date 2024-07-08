const express = require('express');
const path = require('path')
const router = express.Router(); // Utilizamos isso para criar o objeto de rotas que será exportado ao final

// Rota para a página principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = router;