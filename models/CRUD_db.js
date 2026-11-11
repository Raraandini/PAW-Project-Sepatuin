// models/CRUD_db.js
const db = require('../config/db');

// 1. GET ALL: Ambil semua data produk
async function getAll() {
  const [rows] = await db.query('SELECT * FROM produk');
  return rows;
}

// 2. GET BY ID: Ambil satu produk berdasarkan id
async function getById(id) {
  const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
  return rows[0];
}

// 3. POST (CREATE): Tambah produk baru
async function create(data) {
  const { kategori_id, nama, harga, ukuran, stok, label, gambar } = data;
  const [result] = await db.query(
    'INSERT INTO produk (kategori_id, nama, harga, ukuran, stok, label, gambar) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [kategori_id, nama, harga, ukuran, stok, label, gambar]
  );
  return result;
}

// 4. PUT (UPDATE): Ubah data produk berdasarkan id
async function update(id, data) {
  const { kategori_id, nama, harga, ukuran, stok, label, gambar } = data;
  const [result] = await db.query(
    'UPDATE produk SET kategori_id = ?, nama = ?, harga = ?, ukuran = ?, stok = ?, label = ?, gambar = ? WHERE id = ?',
    [kategori_id, nama, harga, ukuran, stok, label, gambar, id]
  );
  return result;
}

// 5. DELETE: Hapus produk berdasarkan id
async function deleteProduk(id) {
  const [result] = await db.query('DELETE FROM produk WHERE id = ?', [id]);
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduk,
};
