const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/ping', (req, res) => res.send('pong'));

app.get('/data', async (req, res) => {
  const result = await fetch(process.env.API_URL);
  const data = await result.json();

  return res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});
