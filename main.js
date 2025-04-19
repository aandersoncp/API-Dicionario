require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const wordsRepo = require('./db/wordsRepository')
const wordSchema = require('./validators/words')
const meaningSchema = require('./validators/meaning')

// Cria uma aplicação Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Define a porta que o servidor irá escutar (padrão 3000)
const PORT = 3000;

app.post('/api/words', (req, res) => {
    const parse = wordSchema.safeParse(req.body);
    if (!parse.success) {
        const erros = parse.error.errors.map(e => e.message)
        return res.status(400).json({ erro: erros.json(',') })
    }

    const { word, meaning } = parse.data

    const id = wordsRepo.createWord(word, meaning)

    res.status(201).json({
        message: "Word created!", id
    })
})

app.get('/api/words', (req, res) => {
    const words = wordsRepo.listAllWords();
    res.status(200).json(words);
});

app.delete('/api/words', (req, res) => {
    const { word } = req.body;
    const words = wordsRepo.deleteByWord(word);
    res.status(200).json(words);
});


app.get('/api/words/:word', (req, res) => {
    const {word} = req.params;
    const word_registry = wordsRepo.searchByWord(word)

    if (!word_registry) {
        return res.status(404).json({ erro: "Word not found" })
    }

    res.status(200).json(word_registry)
})

app.put('/api/words/:word/meaning', (req, res) => {
    const { word } = req.params
    const { meaning } = req.body

    const parse = meaningSchema.safeParse({ meaning })
    if (!parse.success) {
        const erros = parse.error.errors.map(e => e.message);
        return res.status(400).json({ erro: erros.join(', ') });
    }

    const result = wordsRepo.UpdateMeaning(word, meaning);
    if (result.changes === 0) {
        return res.status(404).json({ erro: 'Word not found to update' });
    }

    res.status(200).json({ message: 'Meaning updated successfully!' });
})

app.listen(PORT, () => {
    console.log(`🚀 API running in http://localhost:${PORT}`);
  });
