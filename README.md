# Sepatuin

Sepatuin adalah aplikasi manajemen produk sepatu berbasis web. Aplikasi ini dibangun dengan Express, Sequelize, dan PostgreSQL, menggunakan autentikasi berbasis session, serta menampilkan halaman dengan EJS.

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
- [PostgreSQL](https://www.postgresql.org/)
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

1. Buat database PostgreSQL:

   ```sql
   CREATE DATABASE products_db;
   ```

2. Salin `.env.example` menjadi `.env`, lalu sesuaikan konfigurasi database dan `SESSION_SECRET`.

3. Install dependency dan jalankan server:

   ```bash
   npm install
   npm run dev
   ```

4. Buka aplikasi di browser:

   ```
   http://localhost:4000
   ```

Tabel `users` dan `products` dibuat otomatis saat server pertama kali berjalan.

### Seeder (Opsional)

Seeder membuat akun dan produk contoh:

```bash
npm run seed
```

**Akun contoh:**

| Username | Password      |
| -------- | ------------- |
| `rizki`  | `password123` |
| `budi`   | `password123` |

## Route Halaman

| Method | Route                  | Halaman/Aksi                                             |
| ------ | ---------------------- | -------------------------------------------------------- |
| GET    | `/`                    | Arahkan ke daftar produk jika sudah login, atau ke login |
| GET    | `/auth/login`          | Form login                                               |
| POST   | `/auth/login`          | Proses login                                             |
| GET    | `/auth/register`       | Form registrasi                                          |
| POST   | `/auth/register`       | Proses registrasi                                        |
| POST   | `/auth/logout`         | Logout                                                   |
| GET    | `/products`            | Daftar produk pengguna                                   |
| GET    | `/products/create`     | Form tambah produk                                       |
| POST   | `/products`            | Simpan produk                                            |
| GET    | `/products/:id/edit`   | Form edit produk                                         |
| POST   | `/products/:id/update` | Perbarui produk                                          |
| POST   | `/products/:id/delete` | Hapus produk                                             |

Semua route produk memerlukan session login yang valid.

## Catatan

- Session ID disimpan di cookie `connect.sid`. Aktifkan penyimpanan cookie saat menguji lewat Postman atau Insomnia.
- Untuk production, gunakan session store yang persisten (misalnya `connect-pg-simple` atau `connect-redis`) agar session tidak hilang saat server restart.
- Jangan commit file `.env` ke repository. Pastikan file tersebut sudah tercantum di `.gitignore`.
- Ganti `SESSION_SECRET` dengan nilai acak yang kuat sebelum digunakan di production.

## Sumber

Struktur dan tampilan proyek ini mengacu pada project Hackathon/PAW yang dikembangkan selama praktikum. Sumber gambar atau aset lain yang digunakan di folder `public/` perlu dicantumkan sesuai lisensinya masing-masing.

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran (Project Akhir Web / PAW).