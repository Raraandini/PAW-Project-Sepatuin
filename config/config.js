// Konfigurasi aplikasi (environment)
module.exports = {
  port: process.env.PORT || 3000,
  appName: 'Sepatuin',
  // Ganti dengan ID chatbot dari dashboard Chatbase kalian.
  // Selama masih 'GANTI_DENGAN_CHATBOT_ID', widget chatbot tidak dimuat.
  chatbaseId: process.env.CHATBASE_ID || 'GANTI_DENGAN_CHATBOT_ID',
};
