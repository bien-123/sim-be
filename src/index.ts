import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const db = require('./db/config');

const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

db.connect();
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});