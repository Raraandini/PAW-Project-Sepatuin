// Controller: alur request produk -> ambil/ubah data di Model -> kirim response
const Produk = require('../models/produkModel');

function handleError(res, err) {
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Server error' });
}

// Ubah id dari URL (string) jadi angka. Return null kalau bukan angka
function parseId(raw) {
  const id = parseInt(raw, 10);
  return Number.isNaN(id) ? null : id;
}

// GET /api/produk
exports.getAllProduk = (req, res) => {
  try {
    res.json(Produk.getAll());
  } catch (err) {
    handleError(res, err);
  }
};

// GET /api/produk/:id
exports.getProdukById = (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({ status: 'error', message: 'ID harus berupa angka' });
    }

    const item = Produk.getById(id);
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
    }
    res.json(item);
  } catch (err) {
    handleError(res, err);
  }
};

// POST /api/produk
exports.createProduk = (req, res) => {
  try {
    const { nama, kategori, harga } = req.body;
    if (!nama || !kategori || harga === undefined) {
      return res.status(400).json({ status: 'error', message: 'nama, kategori, dan harga wajib diisi' });
    }

    const item = Produk.create(req.body);
    res.status(201).json({ status: 'ok', message: 'Berhasil dibuat', data: item });
  } catch (err) {
    handleError(res, err);
  }
};

// PUT /api/produk/:id
exports.updateProduk = (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({ status: 'error', message: 'ID harus berupa angka' });
    }

    const item = Produk.update(id, req.body);
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
    }
    res.json({ status: 'ok', message: 'Berhasil diupdate', data: item });
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/produk/:id
exports.deleteProduk = (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({ status: 'error', message: 'ID harus berupa angka' });
    }

    const ok = Produk.remove(id);
    if (!ok) {
      return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
    }
    res.json({ status: 'ok', message: 'Berhasil dihapus' });
  } catch (err) {
    handleError(res, err);
  }
};