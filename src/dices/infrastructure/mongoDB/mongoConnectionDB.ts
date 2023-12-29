import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const nameDB = process.env.DATABASE ?? 'error';
const urlDB = process.env.MONGO_URI ?? 'error';
export const mongoConnection = mongoose
  .connect(urlDB)
  .then(() => console.log(`${nameDB} database connected!`));
