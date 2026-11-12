// Model: data produk berupa array (tanpa database, sementara)
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

// Ubah ukuran jadi array angka. Terima array atau string "39,40,41"
function parseUkuran(ukuran) {
  if (Array.isArray(ukuran)) return ukuran.map(Number);
  if (typeof ukuran === 'string' && ukuran.trim() !== '') {
    return ukuran.split(',').map((u) => Number(u.trim()));
  }
  return [];
}

// Ambil semua produk
function getAll() {
  return produk;
}

// Ambil satu produk berdasarkan id. Return undefined kalau tidak ketemu
function getById(id) {
  return produk.find((p) => p.id === Number(id));
}

// Ambil daftar kategori unik
function getKategori() {
  return [...new Set(produk.map((p) => p.kategori))];
}

// Tambah produk baru
function create(data) {
  const newId = produk.length ? Math.max(...produk.map((p) => p.id)) + 1 : 1;
  const item = {
    id: newId,
    nama: data.nama,
    kategori: data.kategori,
    harga: Number(data.harga) || 0,
    ukuran: parseUkuran(data.ukuran),
    stok: Number(data.stok) || 0,
    label: data.label || null,
    gambar: data.gambar || '',
  };
  produk.push(item);
  return item;
}

// Update produk berdasarkan id. Return null kalau tidak ketemu
function update(id, data) {
  const index = produk.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;

  const updated = { ...produk[index], ...data, id: produk[index].id };
  if (data.harga !== undefined) updated.harga = Number(data.harga);
  if (data.stok !== undefined) updated.stok = Number(data.stok);
  if (data.ukuran !== undefined) updated.ukuran = parseUkuran(data.ukuran);

  produk[index] = updated;
  return updated;
}

// Hapus produk berdasarkan id. Return false kalau tidak ketemu
function remove(id) {
  const index = produk.findIndex((p) => p.id === Number(id));
  if (index === -1) return false;
  produk.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, getKategori, create, update, remove };