// Controller: halaman frontend (render EJS)
const Produk = require('../models/produkModel');
const formatRupiah = require('../utils/formatRupiah');

exports.beranda = (req, res) => {
  res.render('homepage', {
    title: 'Sepatuin - Toko Sepatu dengan AI Chatbot',
    produk: Produk.getAll(), // data berasal dari Model (backend)
    formatRupiah,
  });
};

exports.infoJurnal = (req, res) => {
  res.render('info-jurnal', {
    title: 'Info Jurnal - Sepatuin',
    anggota: [
      { nama: 'Rara Andini Batrisyia', nim: '20240140152' },
      { nama: 'Miftahul Jannah', nim: '20240140191' },
      { nama: 'Beby Ayu Verananda', nim: '20240140246' },
      { nama: 'Yusar Muhammad Fakhri', nim: '20250140127' },
      { nama: 'Ahmad Fitri Riadi Rizki', nim: '20250140130' },
      { nama: 'Muhammad Zidan Fathun Najja', nim: '20250140142' },
      { nama: 'Ally Cahhyo Virmansyah', nim: '20250140147' },
    ],
  });
};
