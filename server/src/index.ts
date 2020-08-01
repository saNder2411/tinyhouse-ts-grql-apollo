import express from 'express';
import bodyParser from 'body-parser';
import { listings } from './listings';

const app = express();
const port = 9000;

app.use(bodyParser.json());

// app.get('/', (_req, res) => res.send('Hello!'));

app.get('/listings', (_req, res) => {
  return res.send(listings);
});

interface Req {
  body: {
    id: string;
  };
}

app.post('/delete-listing', (req: Req, res) => {
  const id = req.body.id;
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1));
    }
  }

  return res.send('failed to delete listing');
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
