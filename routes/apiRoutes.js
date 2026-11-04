// Routes: endpoint API (mengarahkan URL ke controller)
const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const produkController = require('../controllers/produkController');



// router.get('/status', statusController.getStatus);
// router.get('/produk', produkController.getAllProduk);
// router.get('/produk/:id', produkController.getProdukById);

module.exports = router;
