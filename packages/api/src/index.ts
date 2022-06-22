import express from 'express';

const app = express();

/* eslint-disable */

// app.use(express.json()) // for parsing body of type application/json

app.get('/', async (req, res) => {
  res.status(200).json('hello, world!');
});

app.get('/lorem', async (req, res) => {
  res.status(200).json('xlorem...');
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}.`)
);
