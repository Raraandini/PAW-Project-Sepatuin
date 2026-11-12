// Entry point: inisialisasi Express, pasang middleware, routes, dan jalankan server
const express = require('express');
const path = require('path');
const config = require('./config/config');
const logger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const produkDB = require('./models/CRUD_db')

const fs = require('fs');


const app = express();

// View engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Variabel yang tersedia di semua view
app.locals.appName = config.appName;
app.locals.chatbaseId = config.chatbaseId;

// Middleware (logger paling awal agar semua request tercatat)
app.use(logger);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Semua endpoint API ada di routes/apiRoutes.js
app.use('/api', apiRoutes);

// Update endpoint pake database
app.get('/api/produk', async (req, res) => {
  const data = await produkDB.getAll() // ambil dari db
  res.json(data) //kirim

  // masukin log
  fs.writeFileSync('./middlewares/logProduk.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Produk response: ${res.statusCode}"\n`, { flag: 'a' });
})

app.get('/api/produk/:id', async (req, res) => {
  const data = await produkDB.getById(req.params.id) // ambil dari db
  res.json(data) // kiirm

  // masukin log
  fs.writeFileSync('./middlewares/logProdukId.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Produk response: ${res.statusCode}"\n`, { flag: 'a' });
})

// POST -> Menambahkan data baru ke dalam database.
app.post('/api/produk', async (req, res) => {
  const result = await produkDB.create(req.body);
  res.json({ message: 'Berhasil dibuat', id: result.insertId });
  
  // masukin log
  fs.writeFileSync('./middlewares/logProdukPost.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Produk response: ${res.statusCode}"\n`, { flag: 'a' });
});
  
// PUT -> Memperbarui data berdasarkan ID.
app.put('/api/produk/:id', async (req, res) => {
  await produkDB.update(req.params.id, req.body);
  res.json({ message: 'Berhasil diupdate' });

  // masukin log
  fs.writeFileSync('./middlewares/logProdukPut.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Produk response: ${res.statusCode}"\n`, { flag: 'a' });
}); 

// DELETE -> Menghapus data berdasarkan ID.
app.delete('/api/produk/:id', async (req, res) => {
  await produkDB.deleteProduk(req.params.id); 
  res.json({ message: 'Berhasil dihapus' });

  // masukin log
  fs.writeFileSync('./middlewares/logProdukDeleteID.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Produk response: ${res.statusCode}"\n`, { flag: 'a' });
});

// 404 handler
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ status: 'error', message: 'Endpoint tidak ditemukan' });
  }
  res.status(404).render('404', { title: 'Halaman tidak ditemukan' });
});

// Error handler (harus paling bawah). Menangkap error dari route supaya server tidak mati
app.use((err, req, res, next) => {
  console.error(err);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(500).json({ status: 'error', message: 'Server error' });
  }
  res.status(500).send('Terjadi kesalahan di server');
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});