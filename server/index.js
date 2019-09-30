import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { API_URL } from './config';
import Fuse from 'fuse.js';

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/ping', (req, res) => res.send('pong'));

app.get('/data', async (req, res) => {
  const { page, limit, search, filterBy, sortBy, order } = req.query;

  let data;

  try {
    const result = await fetch(API_URL);
    data = (await result.json()).output;
  } catch (response) {
    return res.sendStatus(500);
  }

  let statuses = data.map(entry => entry.status);
  statuses = [...new Set(statuses)].sort();

  if (filterBy) {
    data = data.filter(entry => entry.status === filterBy);
  }

  if (search) {
    const options = { keys: ['name'], threshold: 0.4 };
    const fuse = new Fuse(data, options);

    data = fuse.search(search);
  }

  if (sortBy) {
    data = data.sort(
      (a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * (order === 'asc' ? 1 : -1)
    );
  }

  const start = (page - 1) * limit;
  const end = page * limit;
  const entries = data.slice(start, end);

  const total = data.length;
  const pages = Math.ceil(total / limit);

  return res.json({
    entries,
    limit,
    page,
    from: start + 1,
    to: end,
    total,
    pages,
    statuses,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});
