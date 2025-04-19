const Database = require('better-sqlite3');

// 🔌 Conexão com o banco SQLite (ele cria o arquivo se não existir)
const db = new Database('usuarios.db');

module.exports = db;