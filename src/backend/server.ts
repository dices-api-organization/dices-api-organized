import dotenv from 'dotenv';
import createServerFunction from './createServerFunction';
import express from 'express';

import path = require('path');
import '../dices/infrastructure/mongoDB/mongoConnectionDB';
import '../dices/infrastructure/sql/mySqlConnectionDB';
dotenv.config();

export const port = process.env.PORT ?? 3001;

const app = createServerFunction();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
