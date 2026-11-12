// Entry point: inisialisasi Express, pasang middleware, routes, dan jalankan server
const express = require('express');
const path = require('path');
const config = require('./config/config');
const logger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

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

// Halaman web
app.use('/', webRoutes);

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