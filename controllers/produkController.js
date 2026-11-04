// Controller: alur request produk -> ambil data dari Model -> kirim response
const Produk = require('../models/produkModel');

// GET /api/produk
exports.getAllProduk = (req, res) => {
  res.json(Produk.getAll());
};

// GET /api/produk/:id (tambahan opsional)
exports.getProdukById = (req, res) => {
  const item = Produk.getById(req.params.id);
  if (!item) {
    return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
  }
  res.json(item);
};
