const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExpSession = require('express-session');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
config();
const app = express();
/// middleware
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4000'],
    methods: ['POST', 'PUT', 'GET', 'HEAD', 'OPTIONS', 'DELETE'],
    credentials: true,
  })
);
app.use(
  ExpSession({
    resave: false,
    secret: 'SESS_SECRET',
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      //dev
      secure: false,
      // prod
      // secure: true,
      // httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
mongoose.set('strictQuery', false);
app.use(express.json());

// route

const userRoute = require('./routers/userRoute');
const gardenRoute = require('./routers/gardenRoute');
const treeRoute = require('./routers/treesRoute');
const actionRoute = require('./routers/actionRouter');

app.use(gardenRoute);
app.use(treeRoute);
app.use(userRoute);

mongoose
  .connect(`${process.env.DATABASE_URI}`)
  .then((res) =>
    app.listen((port = 5000), () => {
      console.log('Start at port', port);
    })
  )
  .catch((err) => {
    console.log(err);
  });
