const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let words = require('./words.json');
let scores = require('./scores.json');

app.get('/words', (req, res) => {
  res.json(words);
});

app.get('/scores', (req, res) => {
  const top = scores.sort((a, b) => b.score - a.score).slice(0, 5);
  res.json(top);
});

app.post('/scores', (req, res) => {
  const { name, score } = req.body;
  if (!name || score === undefined) return res.status(400).send('Bad Request');
  scores.push({ name, score });
  fs.writeFileSync('./scores.json', JSON.stringify(scores, null, 2));
  res.status(201).json({ message: 'Score saved' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
