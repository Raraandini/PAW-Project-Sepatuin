# Sepatuin

Sepatuin adalah aplikasi manajemen produk sepatu berbasis web. Aplikasi ini dibangun dengan Express, Sequelize, dan MySql2, menggunakan autentikasi berbasis session, serta menampilkan halaman dengan EJS.

## Fitur

- Registrasi dan login pengguna dengan autentikasi berbasis session
- CRUD (tambah, lihat, ubah, hapus) data produk sepatu
- Setiap pengguna hanya dapat mengelola produk miliknya sendiri
- Halaman dirender menggunakan EJS
- Seeder opsional untuk membuat akun dan produk contoh
- Endpoint API tambahan dengan prefix `/api`

## Teknologi

- [Node.js](https://nodejs.org/) dan [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) ORM
- [MySql2](https://www.mysql2.org/)
- [EJS](https://ejs.co/) sebagai view engine
- [express-session](https://www.npmjs.com/package/express-session) untuk manajemen session

## Struktur Proyek

```
PAW-Project-Sepatuin/
├── config/          # Konfigurasi aplikasi dan database
├── controllers/     # Logika untuk setiap fitur
├── middlewares/     # Middleware, termasuk logger.js
├── models/          # Model Sequelize (users, products)
├── node_modules/    # Dependency (dibuat oleh npm install)
├── public/          # Asset statis (CSS, JS, gambar)
├── routes/
│   ├── apiRoutes.js # Endpoint API (prefix /api)
│   └── webRoutes.js # Route halaman web
├── utils/           # Fungsi bantu
├── views/           # Template EJS
├── .gitignore
├── app.js           # Entry point aplikasi
├── package.json
├── package-lock.json
└── test_db.js       # Skrip pengujian koneksi database
```

`app.js` menginisialisasi Express, mengatur view engine EJS, menyediakan variabel global untuk semua view (`appName` dan `chatbaseId`), memasang middleware (logger, `express.json()`, dan `express.static` untuk folder `public`), lalu mendaftarkan route API di `/api` dan route web.

## Persiapan

Pastikan sudah terpasang:

- Node.js (disarankan versi LTS)
- PostgreSQL
- npm

## Menjalankan Aplikasi

1. Buat database:

   ```sql
   CREATE DATABASE sepatuin_db;
   ```

2. Buat `.env`, kredensial bisa disesuaikan

3. Install dependency dan jalankan server:

   ```bash
   npm install
   npm run dev
   ```
   atau `npm start` bila `npm run dev` tidak berhasil

5. Buka aplikasi di browser:

   ```
   http://localhost:3000
   ```

Tabel `produk` dan `kategori` dibuat otomatis saat server pertama kali berjalan.

## Route Halaman

| Method | Route                  | Halaman/Aksi                                             |
| ------ | ---------------------- | -------------------------------------------------------- |
| GET    | `/`                    | Laman utama                                              |
| GET    | `/api/produk`          | menampilkan seluruh data produk dari database.           |
| POST   | `/api/produk/:id`      | Mengambil detail satu data berdasarkan ID.               |
| POST   | `/api/produk`          | Menambahkan data baru ke dalam database.                 |
| PUT    | `/api/produk/:id`      | Memperbarui data berdasarkan ID.                         |
| DELETE | `/api/produk/:id`      | Menghapus data berdasarkan ID.                           |

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran (Project Akhir Web / PAW).
