// Fungsi bantu: ubah angka menjadi format Rupiah, contoh 550000 -> "Rp 550.000"
module.exports = function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
};
