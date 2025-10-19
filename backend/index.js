import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongooseConnect from './config/mongoose.js';
import Authroute from './route/Auth.Route.js';
import courseRoute from './route/Course.Route.js';
import categoryRoute from './route/Category.Route.js';

dotenv.config();
console.log(process.env.PORT)
const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.use('/api/auth',Authroute)
app.use('/api/courses',courseRoute)
app.use('/api/category',categoryRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongooseConnect();
});
