// Controller: untuk update status server
exports.getStatus = (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server Sepatuin berjalan',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
};
