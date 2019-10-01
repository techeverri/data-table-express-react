import express from 'express';
import path from 'path';
import { dataController } from './controllers';

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/ping', (req, res) => res.send('pong'));

app.get('/data', dataController);

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});
