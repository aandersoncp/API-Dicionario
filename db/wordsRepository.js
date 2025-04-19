const db = require('./db');

// 🧱 Cria a tabela se ainda não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT,
    meaning TEXT
  )
`).run();

const createWord = (word, meaning) => {
    const stmt = db.prepare(`INSERT INTO words (word, meaning) VALUES (?, ?)`);
    const info = stmt.run(word, meaning);
    return info.lastInsertRowid;
};

const listAllWords = () => {
    return db.prepare(`SELECT * FROM words`).all();
};

const searchByWord = (word) => {
    return db.prepare(`SELECT * FROM words WHERE word = ?`).get(word);
  };

const UpdateMeaning = (word, newMeaning) => {
    const info = db.prepare(`UPDATE words SET meaning = ? WHERE word = ?`).run(newMeaning, word);
    return info.changes;
};

const deleteByWord = (word) => {
    const info = db.prepare(`DELETE FROM words WHERE word = ?`).run(word);
    return info.changes;
};

module.exports = {
    createWord,
    listAllWords,
    searchByWord,
    UpdateMeaning,
    deleteByWord
};