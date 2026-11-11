const db = require('../config/db')

// starter, bagian awal buat tabel
async function createTables(){
    await db.query(`
            -- tabel kategori
            CREATE TABLE IF NOT EXISTS kategori(
                id INT AUTO_INCREMENT PRIMARY KEY,
                namaKategori VARCHAR(50) NOT NULL UNIQUE    
            );
        `)
    await db.query(`
            -- tabel Produk sepatu
            CREATE TABLE IF NOT EXISTS produk(
                id INT AUTO_INCREMENT PRIMARY KEY,
                kategori_id INT NOT NULL,
                nama VARCHAR(150) NOT NULL,
                harga DECIMAL(12, 2) NOT NULL,
                ukuran VARCHAR(100) NOT NULL, -- Disimpan sebagai string terpisah koma "39,40,41,42"
                stok INT NOT NULL DEFAULT 0,
                label VARCHAR(50) NULL,
                gambar TEXT NULL,
                FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE RESTRICT
            );
        `)
}

// starter tambah isian data kedalam tabel
async function insertData(){
    await db.query(`
            INSERT INTO kategori(id, namaKategori)
            VALUES
            (1, 'Lari'),
            (2, 'Kasual'),
            (3, 'Formal')
            `)
    await db.query(`
            INSERT INTO produk(id, kategori_id, nama, harga, ukuran, stok, label, gambar)
            VALUES
            (1, 1, 'Urban Runner X1', 550000.00, '39,40,41,42,43', 12, 'Terlaris',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format
            &fit=crop&q=80&w=400'),
            (2, 2, 'Classic White Sneaker', 420000.00, '38,39,40,41,42', 8,       
            'Baru',
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=for
            mat&fit=crop&q=80&w=400'),
            (3, 3, 'Vintage Leather Boots', 890000.00, '40,41,42,43,44', 5, NULL, 
            'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=for
            mat&fit=crop&q=80&w=400'),
            (4, 1, 'Aero Sprint Black', 600000.00, '39,40,41,42,43', 10, 'Diskon 
            20%',
            'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=for
            mat&fit=crop&q=80&w=400'),
            (5, 1, 'Cloud Cushion Pro', 750000.00, '39,40,41,42,43,44', 7,
            'Bantalan empuk', ''),
            (6, 1, 'Starter Run Lite', 380000.00, '38,39,40,41,42', 15, 'Cocok
            pemula', '') 
        `)
}

// Jalankan secara berurutan
async function run() {
    try {
        await createTables();
        await insertData();
        console.log('Setup database beres');                        
        process.exit(0);
    } catch (err) {
        console.error('❌ Gagal:', err.message);                          
        process.exit(1);
    }
}


