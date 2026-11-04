// Middleware logger: mencatat method, path, status response, dan timestamp
module.exports = function logger(req, res, next) {
  // Status baru diketahui setelah response selesai dikirim
  res.on('finish', () => {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
};
