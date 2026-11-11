// config/db.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mysql = require('mysql2/promise');

// Buat koneksi pool ke database MySQL/MariaDB
const pool = mysql.createPool({                                       
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sepatuin_db',
    waitForConnections: true,
    connectionLimit: 10,                                                
    queueLimit: 0,
});

module.exports = pool;

