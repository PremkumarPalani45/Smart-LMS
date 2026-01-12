
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongooseConnect from './config/mongoose.js';
import Authroute from './route/Auth.Route.js';
import courseRoute from './route/Course.Route.js';
import categoryRoute from './route/Category.Route.js';
import paymentRoute from './route/payment.Route.js';
import UserRoute from './route/User.Route.js';
import CartRouter from './route/Cart.Route.js';
import Orderrouter from './route/Order.Route.js';


console.log(process.env.PORT)
const app = express();
const port = process.env.PORT || 3003;
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const allowedOrigins = [
  "https://thriving-truffle-c6c269.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / server calls
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());


if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}



app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use('/api/auth',Authroute)
app.use('/api/courses',courseRoute)
app.use('/api/category',categoryRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/user',UserRoute)
app.use('/api/cart',CartRouter)
app.use("/api/order", Orderrouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongooseConnect();
});
