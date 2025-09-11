import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongooseConnect from './config/mongoose.js';

dotenv.config();
console.log(process.env.PORT)
const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongooseConnect();
});
