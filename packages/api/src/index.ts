import express from 'express';
import {
  unitType,
  formatType,
  requirementsType,
} from 'xlorem-common/src/types';
import xlorem from 'xlorem/src';

import 'cross-fetch/dist/node-polyfill';

const app = express();

type optionsType = {
  query: string;
  unit: unitType;
  quantity: number;
  format: formatType;
  requirements: Partial<requirementsType>;
};

// middleware
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static('../site/dist/'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/api/', async (req, res) => {
  // endpoint will receive requests of 2 types:
  // - requests with query parameters, e.g. `?query=harry potter&format=html`
  // - requests with bodies containing json or urlencoded data

  const { query, ...options } =
    Object.keys(req.query).length !== 0
      ? (req.query as unknown as optionsType)
      : (req.body as unknown as optionsType);

  if (options.quantity)
    options.quantity = parseInt(options.quantity as unknown as string, 10);

  const article = await xlorem(query, options);

  res.status(200).json(article);
});

app.get(
  '/api/:query/:unit?/:quantity?/:format?',
  async (req: { params: optionsType }, res) => {
    if (req.params.quantity)
      req.params.quantity = parseInt(
        req.params.quantity as unknown as string,
        10
      );

    const { query, ...options } = req.params as unknown as Partial<optionsType>;

    const article = await xlorem(query!, options); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    res.status(200).json(article);
  }
);

const PORT = process.env.PORT || 8888;

app.listen(
  PORT,
  () => console.log(`Server is running at http://localhost:${PORT}.`) // eslint-disable-line no-console
);
