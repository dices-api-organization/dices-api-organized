import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import { dicesRouter } from '../dices/infrastructure/routes/Routes';
import path = require('path');
import '../dices/infrastructure/mongoDB/mongoConnectionDB';
dotenv.config();

export const port = process.env.PORT ?? 3001;
const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/', dicesRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.use(
  express.static(
    path.join(__dirname, '..', 'dices', 'infrastructure', 'frontend')
  )
);
