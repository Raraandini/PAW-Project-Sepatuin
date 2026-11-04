// Routes: halaman frontend
const express = require('express');
const router = express.Router();
const halamanController = require('../controllers/halamanController');

router.get('/', halamanController.beranda);
router.get('/info-jurnal', halamanController.infoJurnal);

module.exports = router;
