const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/newfile(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'newfile.html'));
});

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'newfile.html');
});

module.exports = router;