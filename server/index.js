import express from 'express';
import path from 'path';
import url from "url";
import { dataController } from './controllers.js';

const app = express();

const PORT = process.env.PORT || 9000;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/ping', (req, res) => res.send('pong'));

app.get('/data', dataController);

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});
