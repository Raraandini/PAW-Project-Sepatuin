const db = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Berhasil terhubung ke MySQL database!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal terhubung ke MySQL:', error.message);
    process.exit(1);
  }
}

testConnection();
