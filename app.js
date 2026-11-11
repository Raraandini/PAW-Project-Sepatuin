// Model: data produk berupa array statis (tanpa database)
//js product data
//const product
const produk = [
  {
    id: 1,
    nama: 'Urban Runner X1',
    kategori: 'Lari',
    harga: 550000,
    ukuran: [39, 40, 41, 42, 43],
    stok: 12,
    label: 'Terlaris',
    gambar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    nama: 'Classic White Sneaker',
    kategori: 'Kasual',
    harga: 420000,
    ukuran: [38, 39, 40, 41, 42],
    stok: 8,
    label: 'Baru',
    gambar: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    nama: 'Vintage Leather Boots',
    kategori: 'Formal',
    harga: 890000,
    ukuran: [40, 41, 42, 43, 44],
    stok: 5,
    label: null,
    gambar: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    nama: 'Aero Sprint Black',
    kategori: 'Lari',
    harga: 600000,
    ukuran: [39, 40, 41, 42, 43],
    stok: 10,
    label: 'Diskon 20%',
    gambar: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=400',
  },
  // Contoh produk tambahan untuk persona pelari pemula (sesuaikan dengan PRD)
  {
    id: 5,
    nama: 'Cloud Cushion Pro',
    kategori: 'Lari',
    harga: 750000,
    ukuran: [39, 40, 41, 42, 43, 44],
    stok: 7,
    label: 'Bantalan empuk',
    gambar: '',
  },
  {
    id: 6,
    nama: 'Starter Run Lite',
    kategori: 'Lari',
    harga: 380000,
    ukuran: [38, 39, 40, 41, 42],
    stok: 15,
    label: 'Cocok pemula',
    gambar: '',
  },
];


// Entry point: inisialisasi Express, pasang middleware, routes, dan jalankan server
const express = require('express');
const path = require('path');
const config = require('./config/config');
const logger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const CRUD = require('./models/CRUD_db')

const fs = require('fs');


const app = express();

// View engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Variabel yang tersedia di semua view
app.locals.appName = config.appName;
app.locals.chatbaseId = config.chatbaseId;

// Middleware (logger dipasang paling awal agar semua request tercatat)
app.use(logger);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

//Buat status konfirmasi aktif
app.get('/api/status', (req, res) => {
  console.log('Status endpoint diakses');
  res.json({ status: 'ok', message: 'Server Sepatuin berjalan' }); // buat didalam console

  //log masuk
  fs.writeFileSync('./middlewares/logStatus.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Status response: ${res.statusCode}"\n`, { flag: 'a' });
});

// Endpoint untuk menampilkan data produk
app.get('/api/produk', (req, res) => {
  res.json(produk);
  console.log(produk); // buat didalam console

  //log masuk
  fs.writeFileSync('./middlewares/logProduk.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Produk response: ${res.statusCode}"\n`, { flag: 'a' });
});

// Update endpoint pake database
app.get('/api/produk', async (req, res) => {
  const data = await produkDB.getAll() // ambil dari db
  res.json(data) //kirim

  // masukin log
  fs.writeFileSync('./middlewares/logProduk.txt', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} "Produk response: ${res.statusCode}"\n`, { flag: 'a' });
})

app.get('/api/produk:id', async (req, res) => {
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

//bagian listen, yg mana nanti bisa di akses web di local host:3000
app.listen(3000, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});